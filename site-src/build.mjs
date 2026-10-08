#!/usr/bin/env node
// Static site generator for Annie's Villa & Laviana Bungalow. Zero dependencies (Node 18+).
//
//   node site-src/build.mjs                    build everything into site/
//   node site-src/build.mjs --check            build in memory, fail if site/ differs or an audit check fails
//   node site-src/build.mjs --design-parity D  write the home page exactly as the approved design had it
//                                              (design wording and links) to D/index.html, for the pixel-parity check
//
// Inputs : site-src/config.json (facts + staging switch), site-src/pages/*.mjs, site-src/css/site.css,
//          site-src/images/manifest.json (written by site-src/images/build_images.py)
// Outputs: site/**/index.html, site/404.html, site/assets/css/site.css, site/robots.txt, site/sitemap.xml,
//          site/.nojekyll, site/CNAME (only when config.customDomain is set)
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Fills, createCtx } from './lib/core.mjs';
import { shell } from './lib/layout.mjs';
import { lint } from './lib/lint.mjs';
import { PAGES } from './pages/index.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const SITE = join(ROOT, 'site');
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const parityIdx = args.indexOf('--design-parity');
const PARITY_DIR = parityIdx >= 0 ? resolve(args[parityIdx + 1]) : null;

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const config = readJson(join(HERE, 'config.json'));
const manifest = readJson(join(HERE, 'images', 'manifest.json'));
config.baseUrl = config.baseUrl.replace(/\/+$/, '');

const css = readFileSync(join(HERE, 'css', 'site.css'), 'utf8');
const cssVersion = createHash('sha1').update(css).digest('hex').slice(0, 8);

const fileFor = (p) => (p.endsWith('.html') ? p.slice(1) : (p === '/' ? 'index.html' : p.slice(1) + 'index.html'));

async function renderPages(design) {
  const fills = new Fills();
  const out = new Map();
  const rendered = [];
  for (const entry of design ? PAGES.filter((p) => p.path === '/') : PAGES) {
    const mod = (await import(entry.module)).default;
    const page = { path: entry.path, absolute: entry.absolute, noindex: entry.noindex };
    const c = createCtx({ config, manifest, page, design, fills });
    const result = mod(c);
    const meta = { ...result, path: entry.path, noindex: entry.noindex, noCanonical: entry.noCanonical };
    out.set(fileFor(entry.path), shell(c, meta, result.main, cssVersion));
    rendered.push({ ...entry, file: fileFor(entry.path), title: result.title, description: result.description });
  }
  return { out, fills, rendered };
}

function robotsTxt() {
  if (config.staging) {
    return [
      '# STAGING: this site is not meant to be found yet. Every page also carries <meta name="robots" content="noindex">.',
      '# Note: crawlers only read robots.txt at the root of a host, so on the github.io project URL the noindex tags are what protect the pages.',
      'User-agent: *',
      'Disallow: /',
      '',
    ].join('\n');
  }
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${config.baseUrl}/sitemap.xml`, ''].join('\n');
}

function sitemapXml(rendered) {
  const urls = rendered
    .filter((p) => !p.noindex)
    .map((p) => `  <url><loc>${config.baseUrl}${p.path}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const { out, fills, rendered } = await renderPages(Boolean(PARITY_DIR));

if (PARITY_DIR) {
  write(join(PARITY_DIR, 'index.html'), out.get('index.html'));
  console.log(`design-parity page written to ${join(PARITY_DIR, 'index.html')}`);
  process.exit(0);
}

out.set('assets/css/site.css', css);
out.set('.nojekyll', ''); // GitHub Pages: serve the files as they are, no Jekyll processing
out.set('robots.txt', robotsTxt());
out.set('sitemap.xml', sitemapXml(rendered));
if (config.customDomain) out.set('CNAME', config.customDomain + '\n');

if (CHECK) {
  const drift = [];
  for (const [file, content] of out) {
    const p = join(SITE, file);
    if (!existsSync(p) || readFileSync(p, 'utf8') !== content) drift.push(file);
  }
  if (!config.customDomain && existsSync(join(SITE, 'CNAME'))) drift.push('CNAME (present, but customDomain is not set)');
  if (drift.length) {
    console.error('site/ is out of date. Run `node site-src/build.mjs` and commit the result. Differs:\n  ' + drift.join('\n  '));
    process.exit(1);
  }
  console.log(`site/ matches the generator (${out.size} files).`);
} else {
  for (const [file, content] of out) write(join(SITE, file), content);
  console.log(`built ${out.size} files into site/`);
}

const problems = lint({ config, out, rendered, fills, site: SITE, manifest });
const grouped = fills.grouped();
const blocking = grouped.filter((f) => f.blocking);
const optional = grouped.filter((f) => !f.blocking);
console.log(`\nMode: ${config.staging ? 'STAGING (noindex, robots blocked)' : 'LIVE'}   Base URL: ${config.baseUrl}`);
if (blocking.length) {
  console.log(`\nVisible placeholders still to fill (${blocking.length}):`);
  for (const f of blocking) console.log(`  - ${f.key}: ${f.note}  [${f.pages.join(', ')}]`);
}
if (optional.length) {
  console.log(`\nTo confirm, or left out of the structured data until known (${optional.length}):`);
  for (const f of optional) console.log(`  - ${f.key}: ${f.note}  [${f.pages.join(', ')}]`);
}
if (!config.staging && blocking.length) problems.push(`go-live blocked: ${blocking.length} visible placeholder(s) are still unfilled`);
if (problems.length) {
  console.error('\nChecks failed:\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log('\nAll audit checks passed.');
