import fs from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const SITE = 'http://localhost:5175';
const Browser = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const browser = await chromium.launch({ executablePath: Browser });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });

for (const path of ['/menu', '/menu/cappuccino', '/branches', '/contact', '/', '/rewards', '/story', '/cart']) {
  const page = await ctx.newPage();
  await page.goto(SITE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.addScriptTag({ content: AXE });
  const out = await page.evaluate(async () => {
    const r = await window.axe.run(document, { resultTypes: ['violations'] });
    return r.violations.flatMap((v) =>
      v.nodes.slice(0, 3).map((n) => ({
        id: v.id,
        impact: v.impact,
        html: String(n.html).slice(0, 150),
        why: String(n.any?.[0]?.message ?? n.failureSummary ?? '').slice(0, 220),
      })),
    );
  });
  console.log('###', path, JSON.stringify(out, null, 1));
  await page.close();
}
await browser.close();
