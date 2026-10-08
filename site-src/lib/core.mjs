// Core helpers shared by every page: escaping, per-page context, <picture>, pills.
// No dependencies. Pages are plain functions that return HTML strings.

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const stripTags = (s) => String(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

// non-breaking space, so "IDR 600,000" and "7 × 8 m" never split across two lines
export const NB = '\u00A0';
export const formatIdr = (n) => 'IDR' + NB + Number(n).toLocaleString('en-US');

/**
 * Per-page context.
 *  - rel(path)  : link from this page to a site path ("/annies-villa/"), relative so the site works
 *                 under /default_designs/ (staging) and at the root of a custom domain.
 *                 404.html uses root-relative links because it is served from any depth.
 *  - abs(path)  : absolute URL on the configured base (canonical, Open Graph, JSON-LD, sitemap).
 *  - D(a, b)    : design-parity switch. `a` is the text/link exactly as in the approved design, `b` is
 *                 what the live site uses. Only the parity check (build.mjs --design-parity) asks for `a`.
 *  - fill(...)  : registers a value the owner still has to confirm.
 */
export function createCtx({ config, manifest, page, design = false, fills }) {
  const absolute = Boolean(page.absolute);
  const depth = absolute || page.path === '/' ? 0 : page.path.split('/').filter(Boolean).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  // 404.html is served from any depth, so its links are root-relative ("/default_designs/assets/..." while staging,
  // "/assets/..." on a custom domain) instead of relative to its own location.
  const basePath = new URL(config.baseUrl).pathname.replace(/\/$/, '');
  const rel = (p) => {
    if (absolute) return basePath + p;
    if (p === '/') return depth === 0 ? './' : prefix;
    return prefix + p.slice(1);
  };
  const abs = (p) => config.baseUrl + p;
  const wa = (key) =>
    'https://wa.me/' + config.contact.whatsappNumber + '?text=' + encodeURIComponent(config.whatsappMessages[key]);

  const ctx = {
    config, manifest, page, design, rel, abs, wa,
    D: (designValue, siteValue) => {
      const v = design ? designValue : siteValue;
      return typeof v === 'function' ? v() : v; // lazy, so a placeholder is only registered when it is shown
    },
    fill: (key, note, blocking = true) => fills.add({ key, note, blocking, page: page.path }),
  };

  /** Visible [placeholder] from the design that the owner still has to fill. */
  ctx.placeholder = (key, text, note) => {
    ctx.fill(key, note || text, true);
    return `<span data-fill="${esc(key)}">${esc(text)}</span>`;
  };

  /** "From IDR 450,000 per night" or the design's "From [price] per night" while the price is unknown. */
  ctx.priceLine = (key) => {
    const price = config.prices[key];
    if (price === 'enquire' && !design) return 'Enquire for price'; // same wording the design uses for the whole property
    if (price == null) return 'From ' + ctx.placeholder('price-' + key, '[price]', 'Nightly price for ' + key) + ' per night';
    return 'From ' + formatIdr(price) + ' per night';
  };

  ctx.picture = (id, opts = {}) => picture(ctx, id, opts);
  ctx.pill = (opts) => pill(ctx, opts);
  return ctx;
}

/** External links open in a new tab and never leak the opener. */
export const extAttrs = ' target="_blank" rel="noopener"';

export function pill(c, { href, label, short, tone = 'dark', size = 'lg', external = false, attrs = '' }) {
  const text = short
    ? `<span class="long">${label}</span><span class="short">${short}</span>`
    : label;
  return `<a class="pill pill--${tone} pill--${size}" href="${esc(href)}"${external ? extAttrs : ''}${attrs ? ' ' + attrs : ''}>${text} <span class="disc" aria-hidden="true">→</span></a>`;
}

/**
 * Responsive <picture>: WebP sources with a JPEG fallback, width/height attributes from the real file
 * (reserves space, no layout shift), lazy loading except for the one hero image that is the LCP.
 */
export function picture(c, id, { alt, sizes = '100vw', priority = false, pos, lazy = true } = {}) {
  const m = c.manifest[id];
  if (!m) throw new Error(`Unknown image "${id}" (run python3 site-src/images/build_images.py)`);
  if (alt == null) throw new Error(`Image "${id}" needs alt text`);
  const file = (w, ext) => c.rel(`/images/${id}-${w}.${ext}`);
  const webp = m.webp.map((v) => `${file(v.w, 'webp')} ${v.w}w`).join(', ');
  const jpg = m.jpg.map((v) => `${file(v.w, 'jpg')} ${v.w}w`).join(', ');
  const src = [...m.jpg].reverse().find((v) => v.w <= 800) || m.jpg[0];
  const attrs = [
    `src="${file(src.w, 'jpg')}"`,
    m.jpg.length > 1 ? `srcset="${jpg}"` : '',
    `sizes="${sizes}"`,
    `width="${m.w}"`,
    `height="${m.h}"`,
    `alt="${esc(alt)}"`,
    priority ? 'fetchpriority="high"' : lazy ? 'loading="lazy"' : '',
    pos ? `style="object-position:${pos}"` : '',
  ].filter(Boolean).join(' ');
  return `<picture><source type="image/webp" srcset="${webp}" sizes="${sizes}"><img ${attrs}></picture>`;
}

/** Collects the things the owner still has to confirm (reported by the build). */
export class Fills {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  get blocking() { return this.items.filter((i) => i.blocking); }
  grouped() {
    const map = new Map();
    for (const i of this.items) {
      const e = map.get(i.key) || { key: i.key, note: i.note, blocking: i.blocking, pages: new Set() };
      e.pages.add(i.page);
      map.set(i.key, e);
    }
    return [...map.values()].map((e) => ({ ...e, pages: [...e.pages] }));
  }
}
