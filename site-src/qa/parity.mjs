#!/usr/bin/env node
// Pixel parity with the approved design. Renders the original design bundle and the converted page side by side
// at several widths (reduced motion, so both are in the same still state) and saves full-page PNGs.
// Compare them with diff.py.
//
//   node site-src/build.mjs --design-parity /tmp/parity-site        # home page with the design's own wording and links
//   cp -r site/assets site/images /tmp/parity-site/
//   node site-src/qa/serve.mjs /tmp/parity-site 8801 ''             # serve it at http://localhost:8801/
//   node site-src/qa/parity.mjs design/annies-villa-landing-page.html http://localhost:8801/ /tmp/parity-out layout
//   python3 -I site-src/qa/diff.py /tmp/parity-out
//
// mode "layout" hides the images, so only layout, type and colour are compared (expect 0.000 %);
// mode "real" keeps the photographs (expect only re-encoding noise).
import fs from 'node:fs';
import path from 'node:path';
import { chromium, loadAllImages } from './lib.mjs';

const [, , refArg, newUrl, outDir, mode = 'layout'] = process.argv;
if (!refArg || !newUrl || !outDir) { console.error('usage: parity.mjs <design html> <new page url> <out dir> [layout|real]'); process.exit(2); }
fs.mkdirSync(outDir, { recursive: true });
const refUrl = refArg.startsWith('http') ? refArg : 'file://' + path.resolve(refArg);
const widths = (process.env.WIDTHS || '320,375,390,414,768,1024,1280,1440,1920').split(',').map(Number);
const browser = await chromium.launch();

async function shoot(url, file, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  if (mode === 'layout') await page.addStyleTag({ content: 'img{visibility:hidden!important}' });
  await loadAllImages(page);
  await page.screenshot({ path: file, fullPage: true });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await ctx.close();
  return height;
}
for (const w of widths) {
  const a = await shoot(refUrl, `${outDir}/ref-${w}.png`, w);
  const b = await shoot(newUrl, `${outDir}/new-${w}.png`, w);
  console.log(String(w).padStart(5), 'page height  design', a, ' converted', b, a === b ? '(same)' : '(DIFFERENT)');
}
await browser.close();
