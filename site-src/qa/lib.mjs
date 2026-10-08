// Loads Playwright from wherever it is installed. Set PLAYWRIGHT_PATH if `import 'playwright'` does not resolve
// (in the Claude Code cloud environment: PLAYWRIGHT_PATH=/opt/node-tools/node_modules/playwright).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

export const PAGES = ['/', '/annies-villa/', '/laviana-bungalow/', '/location/', '/long-term/', '/faq/'];

/** Waits for every image, with a timeout so one slow image cannot hang a run. */
export async function loadAllImages(page) {
  await page.evaluate(() => document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; }));
  await page.evaluate(async () => {
    const all = Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    await Promise.race([all, new Promise((r) => setTimeout(r, 8000))]);
  });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 600) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(60); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}
