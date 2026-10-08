// Audit checks (seo/landing-page-audit.md "Definition of done") that can run without a browser.
// Returns a list of problems; the build exits non-zero when the list is not empty.
import { existsSync } from 'node:fs';
import { join, posix } from 'node:path';

const first = (re, s) => (re.exec(s) || [])[1];

export function lint({ config, out, rendered, site, manifest }) {
  const problems = [];
  const add = (page, msg) => problems.push(`${page}: ${msg}`);
  const exists = (rel) => out.has(rel) || existsSync(join(site, rel));
  const basePath = new URL(config.baseUrl).pathname.replace(/\/$/, '');

  for (const p of rendered) {
    const html = out.get(p.file);
    const where = p.path;

    // ---- head ----
    const title = first(/<title>([^<]*)<\/title>/, html);
    if (!title) add(where, 'missing <title>');
    else if (title.length > 70) add(where, `<title> is ${title.length} characters (keep it near 60)`);
    const desc = first(/<meta name="description" content="([^"]*)"/, html);
    if (!desc) add(where, 'missing meta description');
    else if (desc.length < 50 || desc.length > 170) add(where, `meta description is ${desc.length} characters (aim for about 150)`);
    if (!/<html lang="en">/.test(html)) add(where, 'missing <html lang>');

    const canonical = first(/<link rel="canonical" href="([^"]*)"/, html);
    if (!p.noCanonical) {
      if (!canonical) add(where, 'missing canonical');
      else if (canonical !== config.baseUrl + p.path) add(where, `canonical is ${canonical}, expected ${config.baseUrl + p.path}`);
    }
    const noindex = /<meta name="robots" content="noindex">/.test(html);
    const shouldNoindex = config.staging || Boolean(p.noindex);
    if (noindex !== shouldNoindex) add(where, shouldNoindex ? 'noindex is missing' : 'noindex is present but the site is live');
    for (const tag of ['og:title', 'og:description', 'og:url', 'og:image']) {
      if (!new RegExp(`<meta property="${tag}" content="[^"]+"`).test(html)) add(where, `missing ${tag}`);
    }
    const ogImage = first(/<meta property="og:image" content="([^"]*)"/, html);
    if (ogImage && !ogImage.startsWith(config.baseUrl + '/')) add(where, 'og:image is not on the configured base URL');

    // ---- body ----
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    if (h1s !== 1) add(where, `expected one <h1>, found ${h1s}`);
    if (/<script(?![^>]*application\/ld\+json)/.test(html)) add(where, 'contains a <script> (pages must work without JavaScript)');

    for (const img of html.match(/<img\b[^>]*>/g) || []) {
      if (!/\balt="[^"]+"/.test(img)) add(where, `image without alt text: ${img.slice(0, 80)}`);
      if (!/\bwidth="\d+"/.test(img) || !/\bheight="\d+"/.test(img)) add(where, `image without width/height: ${img.slice(0, 80)}`);
    }
    for (const a of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) {
      if (!/rel="noopener"/.test(a)) add(where, 'target=_blank link without rel=noopener');
    }

    // ---- links and files ----
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
    const dir = posix.dirname(p.file);
    const refs = [];
    for (const m of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) refs.push(m[1]);
    for (const m of html.matchAll(/\b(?:srcset|imagesrcset)="([^"]*)"/g)) {
      for (const part of m[1].split(',')) refs.push(part.trim().split(/\s+/)[0]);
    }
    for (let ref of refs) {
      if (!ref || /^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
      if (ref.startsWith('#')) {
        if (ref.length > 1 && !ids.has(ref.slice(1))) add(where, `broken in-page link ${ref}`);
        continue;
      }
      if (ref.startsWith('/') && !ref.startsWith('//')) {
        // root-relative (404.html): strip the base path and check the file
        if (basePath && ref.startsWith(basePath + '/')) ref = ref.slice(basePath.length);
        else if (basePath) { add(where, `root-relative link outside the base path: ${ref}`); continue; }
        ref = ref.replace(/^\//, '');
      } else if (/^https?:\/\//.test(ref)) {
        if (!ref.startsWith(config.baseUrl + '/') && ref !== config.baseUrl) continue; // external
        ref = ref.slice(config.baseUrl.length) || '/';
        ref = ref.replace(/^\//, '');
      } else {
        ref = posix.normalize(posix.join(dir, ref));
      }
      ref = ref.split('#')[0].split('?')[0];
      if (ref === '' || ref === '.' || ref.endsWith('/')) ref += 'index.html';
      if (ref.startsWith('..')) { add(where, `link escapes the site: ${ref}`); continue; }
      if (!exists(ref)) add(where, `broken link or missing file: ${ref}`);
    }

    // ---- JSON-LD ----
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let data;
      try { data = JSON.parse(m[1]); } catch (e) { add(where, `JSON-LD does not parse: ${e.message}`); continue; }
      const text = JSON.stringify(data);
      if (!data['@context']) add(where, 'JSON-LD without @context');
      if (/aggregateRating/.test(text)) add(where, 'aggregateRating must not be used with Airbnb reviews');
      if (/FILL|\[price\]|\[Answer|\[Distance/.test(text)) add(where, 'JSON-LD contains an unfilled placeholder');
      if (data['@type'] === 'LodgingBusiness') {
        for (const k of ['name', 'address', 'telephone', 'image', 'url']) if (!data[k]) add(where, `LodgingBusiness is missing ${k}`);
      }
      if (data['@type'] === 'FAQPage') {
        if (!Array.isArray(data.mainEntity) || data.mainEntity.length === 0) add(where, 'FAQPage without questions');
        for (const q of data.mainEntity || []) if (!q.name || !q.acceptedAnswer?.text) add(where, 'FAQPage question without answer text');
      }
    }
  }

  // ---- site-wide ----
  const sitemap = out.get('sitemap.xml') || '';
  for (const p of rendered.filter((x) => !x.noindex)) {
    if (!sitemap.includes(`<loc>${config.baseUrl}${p.path}</loc>`)) problems.push(`sitemap.xml: missing ${p.path}`);
  }
  const robots = out.get('robots.txt') || '';
  if (config.staging && !/Disallow: \//.test(robots)) problems.push('robots.txt must block everything while staging');
  if (!config.staging && !/Sitemap: /.test(robots)) problems.push('robots.txt must point to the sitemap when live');
  if (!config.staging && /Disallow: \/\s*$/m.test(robots)) problems.push('robots.txt still blocks everything but the site is live');
  if (!config.staging && !config.customDomain) problems.push('live mode needs customDomain in config.json');
  for (const id of Object.keys(manifest)) {
    for (const v of [...manifest[id].webp, ...manifest[id].jpg]) {
      const f = `images/${id}-${v.w}.${manifest[id].webp.includes(v) ? 'webp' : 'jpg'}`;
      if (!exists(f)) problems.push(`image file missing: ${f}`);
    }
  }
  return problems;
}
