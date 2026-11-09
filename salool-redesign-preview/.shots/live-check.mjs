import { chromium } from 'playwright-core';

const b = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
p.on('requestfailed', (r) => errs.push('REQFAIL ' + r.url()));

await p.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);

const v = await p.evaluate(() => {
  const el = document.querySelector('video');
  return el
    ? { paused: el.paused, t: +el.currentTime.toFixed(2), ready: el.readyState, cls: el.className }
    : null;
});
const title = await p.textContent('h1');
await p.screenshot({ path: '.shots/live-home.png' });

for (const r of ['/menu', '/cart']) {
  await p.goto('http://localhost:5175' + r, { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `.shots/live${r.replace('/', '-')}.png` });
}

console.log(JSON.stringify({ title, video: v, errors: errs }, null, 2));
await b.close();
