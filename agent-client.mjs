/*
 * Reads the live Salool agent from ElevenLabs with the official SDK.
 * The key comes from the environment: run with `node --env-file=.env.local`.
 */
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export const AGENT_ID = 'agent_3301m6kk65hjedetk374nhg88rjn';

export async function agentSummary() {
  const client = new ElevenLabsClient();
  const agent = await client.conversationalAi.agents.get(AGENT_ID);
  const config = agent.conversationConfig || {};
  const prompt = (config.agent && config.agent.prompt) || {};
  return {
    agentId: AGENT_ID,
    name: agent.name,
    language: config.agent && config.agent.language,
    llm: prompt.llm,
    voiceId: config.tts && config.tts.voiceId,
    ttsModel: config.tts && config.tts.modelId,
    ragEnabled: Boolean(prompt.rag && prompt.rag.enabled),
    documents: (prompt.knowledgeBase || []).map((doc) => doc.name),
    stale: false
  };
}
