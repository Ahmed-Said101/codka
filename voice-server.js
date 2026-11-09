/*
 * Salool Café — voice proxy.
 * Serves call.html plus a small /api/tts endpoint so the browser never sees
 * the provider API keys. Responses are cached on disk because announcing the
 * same name twice should not spend credits twice.
 *
 * Run:  node voice-server.js
 * Keys: put them in salool.keys.txt next to this file, or set environment vars
 *       ELEVENLABS_API_KEY / OPENAI_API_KEY
 */
'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const CACHE_DIR = path.join(ROOT, 'voice-cache');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';

const ELEVENLABS_VOICE = process.env.ELEVENLABS_VOICE || '';
const ELEVENLABS_MODEL = process.env.ELEVENLABS_MODEL || 'eleven_v4';
// English falls back to ElevenLabs too, because OpenAI needs paid credit that
// many days the counter has no key for.
const ELEVENLABS_EN_VOICE = process.env.ELEVENLABS_EN_VOICE || 'EXAVITQu4vr4xnSDxMaL';
const OPENAI_VOICE = process.env.OPENAI_VOICE || 'nova';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini-tts';

const OPENAI_VOICES = ['alloy', 'ash', 'coral', 'echo', 'fable', 'nova', 'onyx', 'sage', 'shimmer'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg'
};

const BLOCKED = ['salool.keys.txt', 'voice-cache', 'node_modules', '.env', 'voice-server.js'];

// The ElevenLabs CLI writes .env.local; salool.keys.txt is the hand-filled one.
const KEY_FILES = ['.env.local', '.env', 'salool.keys.txt'];
const KEY_NAMES = {
  ELEVENLABS_API_KEY: 'elevenlabs',
  OPENAI_API_KEY: 'openai',
  ELEVENLABS_VOICE: 'elevenlabsVoice',
  ELEVENLABS_EN_VOICE: 'elevenlabsEnVoice',
  ELEVENLABS_MODEL: 'elevenlabsModel',
  OPENAI_VOICE: 'openaiVoice'
};

function readKeys() {
  const keys = {
    elevenlabs: process.env.ELEVENLABS_API_KEY || '',
    openai: process.env.OPENAI_API_KEY || ''
  };
  for (const name of KEY_FILES) {
    let raw;
    try {
      raw = fs.readFileSync(path.join(ROOT, name), 'utf8');
    } catch (err) {
      continue;
    }
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?([A-Z_]+)\s*=\s*(.+?)\s*$/);
      if (!match || match[1].startsWith('#')) continue;
      const slot = KEY_NAMES[match[1]];
      if (!slot) continue;
      keys[slot] = match[2].replace(/^(["'])\s*(.*?)\s*\1$/, '$2');
    }
  }
  return keys;
}

function cachePath(fileKey) {
  return path.join(CACHE_DIR, fileKey + '.mp3');
}

function fileKey(parts) {
  return crypto.createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 32);
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

function sendAudio(res, filePath) {
  res.writeHead(200, {
    'content-type': 'audio/mpeg',
    'content-length': fs.statSync(filePath).size,
    'cache-control': 'public, max-age=86400'
  });
  fs.createReadStream(filePath).pipe(res);
}

async function elevenlabsCall(text, voiceId, key, model, languageCode) {
  const body = {
    text: text,
    model_id: model,
    voice_settings: { stability: 0.35, similarity_boost: 0.8, speed: 1 }
  };
  if (languageCode) body.language_code = languageCode;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'xi-api-key': key, 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000)
    }
  );
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    const error = new Error('ElevenLabs ' + response.status + ' ' + detail.slice(0, 200));
    error.status = response.status;
    throw error;
  }
  return Buffer.from(await response.arrayBuffer());
}

// v4 names the language explicitly; short Somali phrases are otherwise easy
// for auto-detection to mistake for Arabic or English.
async function elevenlabs(text, voiceId, key, model, lang) {
  const code = lang === 'so' ? 'so' : 'en';
  if (!/v4/.test(model)) return elevenlabsCall(text, voiceId, key, model, '');
  try {
    return await elevenlabsCall(text, voiceId, key, model, code);
  } catch (error) {
    if (error.status !== 400 && error.status !== 422) throw error;
    return elevenlabsCall(text, voiceId, key, model, '');
  }
}

async function openai(text, voice, key) {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { authorization: 'Bearer ' + key, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      voice: voice,
      input: text,
      response_format: 'mp3',
      instructions: 'Clear, warm café announcement spoken at a steady pace.'
    }),
    signal: AbortSignal.timeout(9000)
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error('OpenAI ' + response.status + ' ' + detail.slice(0, 160));
  }
  return Buffer.from(await response.arrayBuffer());
}

const VOICE_ID_RE = /^[A-Za-z0-9_-]{6,64}$/;

// A voice id means ElevenLabs, an OpenAI name means OpenAI. English with no
// OpenAI key still gets ElevenLabs v4 instead of dropping to browser TTS.
function resolveTts(lang, requested, keys) {
  if (VOICE_ID_RE.test(requested)) {
    return { provider: 'elevenlabs', voice: requested, key: keys.elevenlabs, model: keys.elevenlabsModel || ELEVENLABS_MODEL };
  }
  if (lang === 'so') {
    return { provider: 'elevenlabs', voice: keys.elevenlabsVoice || ELEVENLABS_VOICE, key: keys.elevenlabs, model: keys.elevenlabsModel || ELEVENLABS_MODEL };
  }
  if (keys.openai) {
    return { provider: 'openai', voice: OPENAI_VOICES.includes(requested) ? requested : (keys.openaiVoice || OPENAI_VOICE), key: keys.openai, model: OPENAI_MODEL };
  }
  return { provider: 'elevenlabs', voice: keys.elevenlabsEnVoice || ELEVENLABS_EN_VOICE, key: keys.elevenlabs, model: keys.elevenlabsModel || ELEVENLABS_MODEL };
}

async function handleTts(res, query) {
  const text = String(query.text || '').trim().slice(0, 300);
  const lang = query.lang === 'en' ? 'en' : 'so';
  if (!text) return sendJson(res, 400, { error: 'text waa inuu jiraa' });

  const keys = readKeys();
  const target = resolveTts(lang, String(query.voice || '').trim(), keys);
  if (!target.key) {
    return sendJson(res, 501, { error: 'key ma jiro', lang: lang, need: target.provider === 'openai' ? 'OPENAI_API_KEY' : 'ELEVENLABS_API_KEY' });
  }
  if (!target.voice) {
    return sendJson(res, 501, { error: 'cod dooro: settings > Codadka internetka (Liiska codka)', lang: lang });
  }

  const id = fileKey([lang, target.provider, target.voice, target.model, text]);
  const cached = cachePath(id);
  if (fs.existsSync(cached)) return sendAudio(res, cached);

  try {
    const audio = target.provider === 'openai'
      ? await openai(text, target.voice, target.key)
      : await elevenlabs(text, target.voice, target.key, target.model, lang);
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cached, audio);
    sendAudio(res, cached);
  } catch (err) {
    sendJson(res, 502, { error: String(err.message || err).slice(0, 300), lang: lang });
  }
}

async function handleVoices(res) {
  const keys = readKeys();
  if (!keys.elevenlabs) {
    return sendJson(res, 501, { error: 'ELEVENLABS_API_KEY ma jiro', elevenlabs: [], openai: OPENAI_VOICES });
  }
  const headers = { 'xi-api-key': keys.elevenlabs };
  const mine = fetch('https://api.elevenlabs.io/v1/voices?page_size=99', {
    headers, signal: AbortSignal.timeout(9000)
  }).then((r) => r.json()).catch(() => ({}));

  const shared = fetch('https://api.elevenlabs.io/v2/shared-voices?language=Somali&page_size=30', {
    headers, signal: AbortSignal.timeout(9000)
  }).then((r) => r.ok ? r.json() : {}).catch(() => ({}));

  const [mineData, sharedData] = await Promise.all([mine, shared]);
  const list = (mineData.voices || []).map((voice) => ({
    id: voice.voice_id,
    name: voice.name,
    accent: (voice.labels && voice.labels.accent) || '',
    languages: (voice.labels && voice.labels.languages) || '',
    shared: false
  }));
  for (const voice of sharedData.voices || []) {
    list.push({
      id: voice.voice_id,
      name: voice.name,
      accent: (voice.labels && voice.labels.accent) || '',
      languages: (voice.labels && voice.labels.language) || (voice.labels && voice.labels.languages) || '',
      shared: true
    });
  }
  sendJson(res, 200, { elevenlabs: list, openai: OPENAI_VOICES });
}

function handleStatus(res) {
  const keys = readKeys();
  let cachedCount = 0;
  try { cachedCount = fs.readdirSync(CACHE_DIR).length; } catch (err) {}
  const english = resolveTts('en', '', keys);
  sendJson(res, 200, {
    elevenlabs: Boolean(keys.elevenlabs),
    openai: Boolean(keys.openai),
    somaliVoice: keys.elevenlabsVoice || ELEVENLABS_VOICE,
    somaliModel: keys.elevenlabsModel || ELEVENLABS_MODEL,
    englishProvider: english.provider,
    englishVoice: english.voice,
    cached: cachedCount,
    openaiVoices: OPENAI_VOICES
  });
}

const AGENT_ID = 'agent_3301m6kk65hjedetk374nhg88rjn';

function savedAgentSummary() {
  const saved = JSON.parse(fs.readFileSync(path.join(ROOT, 'salool-agent.json'), 'utf8'));
  const config = saved.conversation_config || {};
  const prompt = (config.agent && config.agent.prompt) || {};
  return {
    agentId: saved.agent_id,
    name: saved.name,
    language: config.agent && config.agent.language,
    llm: prompt.llm,
    voiceId: config.tts && config.tts.voice_id,
    ttsModel: config.tts && config.tts.model_id,
    ragEnabled: Boolean(prompt.rag && prompt.rag.enabled),
    documents: (prompt.knowledge_base || []).map((doc) => doc.name),
    stale: true
  };
}

async function handleAgent(res) {
  let summary;
  try {
    const mod = await import('./agent-client.mjs');
    summary = await mod.agentSummary();
  } catch (err) {
    // The counter runs offline, so the last published config is still an answer.
    try {
      summary = savedAgentSummary();
    } catch (readError) {
      summary = { agentId: AGENT_ID, stale: true };
    }
  }
  sendJson(res, 200, summary);
}

function serveStatic(req, res, pathname) {
  if (pathname === '/') pathname = '/call.html';
  const relative = path.normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  const top = relative.split(path.sep)[0];
  if (BLOCKED.includes(top) || top.startsWith('.')) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('403');
  }
  const filePath = path.join(ROOT, relative);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('403');
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end('404');
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  const query = Object.fromEntries(url.searchParams);

  if (url.pathname === '/api/tts') return void handleTts(res, query);
  if (url.pathname === '/api/status') return void handleStatus(res);
  if (url.pathname === '/api/voices') return void handleVoices(res);
  if (url.pathname === '/api/agent') return void handleAgent(res);
  if (url.pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'endpoint ma jiro' });

  serveStatic(req, res, url.pathname);
});

function listen(port, attemptsLeft) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log('Port ' + port + ' mashquulsan yahay, ku dayaya ' + (port + 1));
      listen(port + 1, attemptsLeft - 1);
      return;
    }
    console.error('Server-kama socon: ' + err.message);
    process.exit(1);
  });
  server.listen(port, HOST, () => {
    const keys = readKeys();
    console.log('Salool voice server: http://' + HOST + ':' + port + '/call.html');
    console.log('  ElevenLabs (Soomaali): ' + (keys.elevenlabs ? 'key jiraa' : 'key MA jiro'));
    console.log('  OpenAI (English): ' + (keys.openai ? 'key jiraa' : 'key MA jiro'));
    console.log('  Fiiro gaar ah: /api/tts kaliya ayuu bixiyaa; key-ka browser-ka ma galo.');
  });
}

listen(PORT, 5);
