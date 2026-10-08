#!/usr/bin/env node
// Responsive check: every page at 13 widths from small phone to large desktop.
// Fails on horizontal scrolling, broken images or console errors.
//   node site-src/qa/widths.mjs http://localhost:8802/default_designs
import { chromium, PAGES, loadAllImages } from './lib.mjs';

const base = process.argv[2] || 'http://localhost:8802/default_designs';
const widths = [320, 360, 375, 390, 414, 600, 768, 820, 1024, 1280, 1440, 1920, 2560];
const browser = await chromium.launch();
let failures = 0;
for (const p of PAGES) {
  const row = [];
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(base + p, { waitUntil: 'load' });
    await loadAllImages(page);
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
      navH: Math.round(document.querySelector('.nav').getBoundingClientRect().height),
    }));
    const bad = m.overflow > 0 || m.broken > 0 || errors.length > 0;
    if (bad) failures++;
    row.push(`${w}:${bad ? 'FAIL(' + [m.overflow > 0 && 'overflow ' + m.overflow, m.broken && 'broken ' + m.broken, errors.length && errors[0]].filter(Boolean).join(', ') + ')' : 'ok'}`);
    await ctx.close();
  }
  console.log(p.padEnd(20), row.join(' '));
}
await browser.close();
console.log(failures ? `\n${failures} failing combinations` : '\nNo horizontal scroll, broken images or console errors at any width.');
process.exit(failures ? 1 : 0);
