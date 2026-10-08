// Page shell: <head> (SEO layer), navigation, footer. Same on every page.
import { esc, extAttrs } from './core.mjs';

// Header and footer navigation (seo/site-structure.md "Internal linking rules").
export const NAV = [
  { path: '/annies-villa/', label: 'Annie’s Villa' },
  { path: '/laviana-bungalow/', label: 'Laviana Bungalow' },
  { path: '/location/', label: 'Location' },
  { path: '/long-term/', label: 'Long stays' },
  { path: '/faq/', label: 'FAQ' },
];

// The links the approved design had (one-page anchors). Used only by the parity check.
const DESIGN_NAV = [
  ['#stays', 'Stays'],
  ['#green', 'The garden'],
  ['#property', 'The property'],
  ['#lovina', 'Lovina'],
  ['#honest', 'Our promise'],
];

export function nav(c) {
  const links = c.design
    ? DESIGN_NAV.map(([href, label]) => `<a class="navlink" href="${href}">${label}</a>`).join('')
    : NAV.map((n) => `<a class="navlink" href="${c.rel(n.path)}"${c.page.path === n.path ? ' aria-current="page"' : ''}>${n.label}</a>`).join('');
  const cta = c.pill({
    href: c.D('#contact', c.wa('general')),
    label: 'Check availability',
    short: 'Book',
    tone: 'dark',
    size: 'sm',
    external: !c.design,
  });
  return `<nav class="nav" aria-label="Main">
  <a class="nav__brand" href="${c.D('#top', c.rel('/'))}">Annie’s Villa</a>
  <div class="nav__links">${links}</div>
  ${cta}
</nav>`;
}

export function footer(c) {
  const cfg = c.config;
  const showBooking = cfg.toggles.showBookingCom;
  const bookingHref = cfg.links.bookingCom || '#contact';

  if (c.design) {
    return `<footer class="footer">
  <div class="footer__grid">
    <div>
      <div class="footer__brand">Annie’s Villa</div>
      <p class="footer__blurb">Two rooms, a bungalow and a pool in a green garden in Lovina, north Bali.</p>
    </div>
    <div class="footlinks">
      <a href="#stays">Stays</a><a href="#green">The garden</a><a href="#property">The property</a><a href="#lovina">Lovina</a><a href="#contact">Contact</a>
    </div>
    <div class="footlinks">
      <a href="#contact">Instagram</a><a href="#contact">Airbnb</a><a href="#contact">Booking.com</a>
    </div>
  </div>
  <div class="footer__bottom">
    <span>© [YEAR] Annie’s Villa. All rights reserved.</span>
    <span>Lovina, Singaraja, North Bali</span>
  </div>
</footer>`;
  }

  if (showBooking && !cfg.links.bookingCom) c.fill('booking-com-url', 'Booking.com listing URL (or set toggles.showBookingCom to false)');
  const pages = [{ path: '/', label: 'Home' }, ...NAV]
    .map((n) => `<a href="${c.rel(n.path)}">${n.label}</a>`)
    .join('');
  const external = [
    `<a href="${esc(c.wa('general'))}"${extAttrs}>WhatsApp</a>`,
    `<a href="${esc(cfg.links.instagram)}"${extAttrs}>Instagram</a>`,
    `<a href="${esc(cfg.links.airbnbHost)}"${extAttrs}>Airbnb</a>`,
    showBooking ? `<a href="${esc(bookingHref)}"${cfg.links.bookingCom ? extAttrs : ''}${cfg.links.bookingCom ? '' : ' data-fill="booking-com-url"'}>Booking.com</a>` : '',
  ].join('');
  return `<footer class="footer">
  <div class="footer__grid">
    <div>
      <div class="footer__brand">Annie’s Villa</div>
      <p class="footer__blurb">Two rooms, a bungalow and a pool in a green garden in Lovina, north Bali.</p>
      <p class="footer__blurb">Airbnb Superhost · Guest Favorite · ${esc(cfg.reviews.airbnbRating)}★ from ${cfg.reviews.airbnbCount} reviews</p>
      <address class="footer__address">${esc(cfg.address.oneLine)}<br><a href="${esc(c.wa('general'))}"${extAttrs}>WhatsApp ${esc(cfg.contact.phoneDisplay)}</a></address>
    </div>
    <div class="footlinks">${pages}</div>
    <div class="footlinks">${external}</div>
  </div>
  <div class="footer__bottom">
    <span>© ${cfg.copyrightYear} Annie’s Villa. All rights reserved.</span>
    <span>Lovina, Singaraja, North Bali</span>
  </div>
</footer>`;
}

/**
 * <head>. Staging adds noindex to every page; the 404 page is never indexable.
 * Open Graph and Twitter tags control the link preview people see when the page is shared on WhatsApp.
 */
export function head(c, p, cssVersion) {
  const cfg = c.config;
  const url = c.abs(p.path);
  const noindex = cfg.staging || p.noindex;
  const ogImage = c.abs(`/images/${p.ogImage || 'og-annies-villa-lovina'}-1200.jpg`);
  const ogAlt = p.ogAlt || 'Pool at dusk at Annie’s Villa in Lovina, with the lit pavilion behind it';
  const jsonld = (p.jsonld || [])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}${p.noCanonical ? '' : `<link rel="canonical" href="${esc(url)}">\n`}<meta name="theme-color" content="#0E3221">
<link rel="icon" href="${c.rel('/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${c.rel('/favicon.ico')}" sizes="32x32">
<link rel="apple-touch-icon" href="${c.rel('/apple-touch-icon.png')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.brand.schemaName)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<link rel="preload" href="${c.rel('/assets/fonts/inter-latin-var.woff2')}" as="font" type="font/woff2" crossorigin>
${p.preload || ''}<link rel="stylesheet" href="${c.rel('/assets/css/site.css')}?v=${cssVersion}">
${jsonld}
</head>`;
}

export function shell(c, p, main, cssVersion) {
  return `<!DOCTYPE html>
<html lang="en">
${head(c, p, cssVersion)}
<body>
${c.design ? '' : '<a class="skip" href="#main">Skip to content</a>\n'}<div class="page">
${nav(c)}
<main id="main">
${main}
</main>
${footer(c)}
</div>
</body>
</html>
`;
}
