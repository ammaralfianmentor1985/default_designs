#!/usr/bin/env node
// "Disable JavaScript: the full page still renders." Loads every page with JavaScript switched off and checks
// that the headline, the sections and the images are really there.
//   node site-src/qa/nojs.mjs http://localhost:8802/default_designs
import { chromium, PAGES } from './lib.mjs';

const base = process.argv[2] || 'http://localhost:8802/default_designs';
const browser = await chromium.launch();
let failures = 0;
for (const p of PAGES) {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + p, { waitUntil: 'load' });
  const m = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent.trim().replace(/\s+/g, ' '),
    words: document.body.innerText.split(/\s+/).filter(Boolean).length,
    sections: document.querySelectorAll('main section').length,
    imgs: document.images.length,
    scripts: [...document.scripts].filter((s) => s.type !== 'application/ld+json').length,
  }));
  const ok = m.h1 && m.words > 150 && m.sections >= 3 && m.scripts === 0;
  if (!ok) failures++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${p.padEnd(20)} h1="${m.h1}" words=${m.words} sections=${m.sections} images=${m.imgs} scripts=${m.scripts}`);
  await ctx.close();
}
await browser.close();
process.exit(failures ? 1 : 0);
