import fs from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const require = createRequire(import.meta.url);
const axe = require('axe-core');
const SITE = 'http://localhost:5175';
const Browser = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/menu', name: 'menu' },
  { path: '/menu/cappuccino', name: 'item' },
  { path: '/story', name: 'story' },
  { path: '/rewards', name: 'rewards' },
  { path: '/branches', name: 'branches' },
  { path: '/contact', name: 'contact' },
  { path: '/cart', name: 'cart' },
  { path: '/nope-404', name: 'notfound' },
];

const errors = [];
const results = [];

const browser = await chromium.launch({ executablePath: Browser });

async function audit(context, label) {
  const page = await context.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(`${label}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${label}: PAGEERROR ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`${label}: FAILED ${r.url()}`));
  return page;
}

// desktop pass
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const route of ROUTES) {
  const page = await audit(desktop, `desktop ${route.path}`);
  await page.goto(SITE + route.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.addScriptTag({ content: fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8') });
  const axeOut = await page.evaluate(async () => await window.axe.run(document, { resultTypes: ['violations'] }));
  const shots = route.path === '/' ? 3 : 2;
  for (let i = 0; i < shots; i++) {
    await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), (i + 1) / shots);
    await page.waitForTimeout(500);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `.shots/shots-${route.name}.png` });
  results.push({ route: route.path, axe: axeOut.violations.length, overflow, detail: axeOut.violations.map((v) => `${v.id}(${v.impact}) ${v.nodes.length}`) });
  await page.close();
}

// cart flow
const flow = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await audit(flow, 'flow');
await p.goto(SITE + '/menu', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
await p.fill('#menu-search', 'latte');
await p.waitForTimeout(400);
const found = await p.locator('.grid-card').count();
await p.locator('.grid-card').first().locator('.add-mini').click();
await p.waitForTimeout(300);
await p.locator('.grid-card').nth(1).locator('.add-mini').click();
await p.waitForTimeout(900);
await p.screenshot({ path: '.shots/shots-toast.png' });
const badge = await p.locator('.cart-badge').textContent();
await p.click('.cart-link');
await p.waitForURL('**/cart');
await p.waitForTimeout(700);
const linesOnCart = await p.locator('.cart-line').count();
await p.screenshot({ path: '.shots/shots-cart.png' });
await p.locator('.summary .btn--gold').first().click();
await p.waitForURL('**/checkout');
await p.waitForTimeout(600);
await p.fill('#cup-name', 'Amina');
await p.locator('.choice').nth(1).click();
await p.selectOption('#when', { index: 1 });
await p.screenshot({ path: '.shots/shots-checkout.png' });
await p.click('button[type=submit]');
await p.waitForURL('**/order-confirmed');
await p.waitForTimeout(800);
const code = await p.locator('.order-code').textContent();
const confirmText = await p.locator('.confirm-card h1').textContent();
await p.screenshot({ path: '.shots/shots-confirmed.png' });

// badge gone after order + cart empty
await p.goto(SITE + '/cart', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
const emptyState = await p.locator('.empty-state').count();

// persistence check: add from item page, reload, still there
await p.goto(SITE + '/menu/cappuccino', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
await p.locator('input[name=size][value=Medium]').check();
await p.waitForTimeout(300);
const priceAfterSize = await p.locator('.buy-total strong').textContent();
await p.click('.buy-row .btn--gold');
await p.waitForURL('**/cart');
await p.waitForTimeout(700);
const badgeAfter = await p.locator('.cart-badge').textContent();
await p.reload({ waitUntil: 'networkidle' });
await p.waitForTimeout(700);
const afterReload = await p.locator('.cart-line').count();
const reloadedBadge = await p.locator('.cart-badge').textContent();
await p.evaluate(() => window.localStorage.removeItem('salool-demo-cart-v1'));

// item detail on a single-size item and a no-photo item
await p.goto(SITE + '/menu/popcorn-latte', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
const popcorn = await p.locator('.item-title').textContent();
await p.screenshot({ path: '.shots/shots-item-nophoto.png' });
await p.goto(SITE + '/menu', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
await p.click('.grid-card >> nth=0');
await p.waitForTimeout(600);

// mobile pass
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
for (const route of ROUTES) {
  const mp = await audit(mobile, `mobile ${route.path}`);
  await mp.goto(SITE + route.path, { waitUntil: 'networkidle' });
  await mp.waitForTimeout(600);
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await mp.addScriptTag({ content: fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8') });
  const axeOut = await mp.evaluate(async () => await window.axe.run(document, { resultTypes: ['violations'] }));
  await mp.screenshot({ path: `.shots/mob-${route.name}.png` });
  results.push({ route: `MOBILE ${route.path}`, axe: axeOut.violations.length, overflow, detail: axeOut.violations.map((v) => `${v.id}(${v.impact}) ${v.nodes.length}`) });
  await mp.close();
}

// mobile menu dialog
const mp2 = await audit(mobile, 'mobile-menu');
await mp2.goto(SITE + '/', { waitUntil: 'networkidle' });
await mp2.waitForTimeout(600);
await mp2.click('.menu-toggle');
await mp2.waitForTimeout(700);
await mp2.screenshot({ path: '.shots/mob-dialog.png' });
await mp2.keyboard.press('Escape');
await mp2.waitForTimeout(400);
const dialogClosed = await mp2.evaluate(() => document.getElementById('mobile-site-menu')?.open === false);

// reduced motion + autoplay check
const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const rp = await rm.newPage();
await rp.goto(SITE + '/', { waitUntil: 'networkidle' });
await rp.waitForTimeout(1200);
const reduced = await rp.evaluate(() => {
  const v = document.querySelector('.hero-media video');
  return { paused: v?.paused, opacity: v ? getComputedStyle(v).opacity : null };
});

const auto = await desktop.newPage();
await auto.goto(SITE + '/', { waitUntil: 'networkidle' });
await auto.waitForTimeout(2500);
const autoplay = await auto.evaluate(() => {
  const v = document.querySelector('.hero-media video');
  return { paused: v?.paused, t: Number(v?.currentTime?.toFixed(2)), ready: v?.readyState, cls: v?.className };
});

await browser.close();

console.log(JSON.stringify({
  routes: results,
  flow: { searchResults: found, badge, linesOnCart, code, confirmText, emptyState, priceAfterSize, badgeAfter, afterReload, reloadedBadge, popcorn, dialogClosed },
  video: { autoplay, reduced },
  errors: [...new Set(errors)],
}, null, 1));
