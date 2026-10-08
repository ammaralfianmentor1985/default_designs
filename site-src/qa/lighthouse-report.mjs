#!/usr/bin/env node
// Summarises the Lighthouse runs written by lighthouse.sh: median and range per page.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2] || 'lh-runs';
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
const byPage = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
  const name = f.replace(/-\d+\.json$/, '');
  (byPage[name] ||= []).push(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}
const sc = (r, k) => Math.round(r.categories[k].score * 100);
const au = (r, id) => r.audits[id].numericValue;
console.log('page'.padEnd(18), 'runs  perf med (min-max)  a11y  best  seo   FCP s  LCP s  TBT ms  CLS   SI s   KiB');
for (const [name, runs] of Object.entries(byPage)) {
  const perf = runs.map((r) => sc(r, 'performance'));
  const row = [
    name.padEnd(18), String(runs.length).padEnd(5),
    `${med(perf)} (${Math.min(...perf)}-${Math.max(...perf)})`.padEnd(19),
    String(med(runs.map((r) => sc(r, 'accessibility')))).padEnd(5),
    String(med(runs.map((r) => sc(r, 'best-practices')))).padEnd(5),
    String(med(runs.map((r) => sc(r, 'seo')))).padEnd(5),
    (med(runs.map((r) => au(r, 'first-contentful-paint'))) / 1000).toFixed(1).padEnd(6),
    (med(runs.map((r) => au(r, 'largest-contentful-paint'))) / 1000).toFixed(1).padEnd(6),
    String(Math.round(med(runs.map((r) => au(r, 'total-blocking-time'))))).padEnd(7),
    med(runs.map((r) => au(r, 'cumulative-layout-shift'))).toFixed(3).padEnd(5),
    (med(runs.map((r) => au(r, 'speed-index'))) / 1000).toFixed(1).padEnd(6),
    String(Math.round(med(runs.map((r) => au(r, 'total-byte-weight'))) / 1024)),
  ];
  console.log(row.join(' '));
}
console.log('\nSEO below 100 on a staging build is expected: "is-crawlable" fails because every page says noindex.');
