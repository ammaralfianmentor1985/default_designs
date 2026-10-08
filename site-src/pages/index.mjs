// Every page of the site. `path` is the public URL path; the file is derived from it
// ("/" -> site/index.html, "/faq/" -> site/faq/index.html, "/404.html" -> site/404.html).
// To add a page: create site-src/pages/<name>.mjs (default export: (ctx) => { title, description, main, jsonld }),
// add it here, and run `node site-src/build.mjs`. The sitemap and the audit checks pick it up automatically.
const mod = (name) => new URL(name, import.meta.url).href;

export const PAGES = [
  { path: '/', module: mod('./home.mjs') },
  { path: '/annies-villa/', module: mod('./annies-villa.mjs') },
  { path: '/laviana-bungalow/', module: mod('./laviana-bungalow.mjs') },
  { path: '/location/', module: mod('./location.mjs') },
  { path: '/long-term/', module: mod('./long-term.mjs') },
  { path: '/faq/', module: mod('./faq.mjs') },
  // Served for any unknown address at any depth: absolute links, never indexed, no canonical.
  { path: '/404.html', module: mod('./not-found.mjs'), absolute: true, noindex: true, noCanonical: true },
];
