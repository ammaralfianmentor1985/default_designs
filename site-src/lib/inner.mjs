// Components for the inner pages. They only compose the design's existing classes (see site.css):
// the same hero, eyebrow + big two-tone heading, split image/text blocks, dark trust band, pale booking band.
import { esc, extAttrs } from './core.mjs';

/** Full-bleed hero with one still photograph (the home page crossfades four). */
export function pageHero(c, { image, alt, pos, title, tail, note, cta }) {
  return `<section id="top" class="hero hero--page">
  <div class="hero__slide hero__slide--solo">${c.picture(image, { alt, sizes: '100vw', priority: true, pos })}</div>
  <div class="hero__shade"></div>
  <div class="hero__body">
    <p class="chip rise">Lovina · Singaraja · North Bali</p>
    <h1 class="hero__title rise rise--1">${title}${tail ? ` <span class="tone--hero">${tail}</span>` : ''}</h1>
    <div class="hero__actions rise rise--2">
      ${cta}
      ${note ? `<span class="hero__note">${note}</span>` : ''}
    </div>
  </div>
</section>`;
}

/** Text-only page header (FAQ, 404). */
export function pageHead(c, { eyebrow, title, tail, lead }) {
  return `<section class="sec sec--page page-head">
  <div class="sec-head">
    <div>
      <p class="eyebrow mb-18">${eyebrow}</p>
      <h1 class="h2 h2--84">${title}${tail ? ` <span class="tone">${tail}</span>` : ''}</h1>
    </div>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;
}

/**
 * The home page's "(01) About" block: small label and text on the left, big statement on the right.
 * No scroll-reveal here (the home page has it): on an inner page this block sits right under the hero, at the
 * edge of the first screen, where a half-faded block fails contrast checks and adds nothing.
 */
export function intro({ eyebrow, lead, statement, tone }) {
  return `<section class="sec sec--page intro">
  <div class="intro__side">
    <p class="eyebrow">${eyebrow}</p>
    <p class="lead lead--340">${lead}</p>
  </div>
  <p class="statement">${statement} <span class="tone">${tone}</span></p>
</section>`;
}

/** Section header: eyebrow, two-tone h2, short lead on the right. */
export function sectionHead({ eyebrow, title, tail, lead }) {
  return `  <div class="sec-head">
    <div>
      <p class="eyebrow mb-18">${eyebrow}</p>
      <h2 class="h2 h2--84">${title}${tail ? ` <span class="tone">${tail}</span>` : ''}</h2>
    </div>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>`;
}

/** Image beside text. `reverse` puts the image on the right from tablet width up. */
export function split({ imageHtml, ratio = 'ar-4-3', eyebrow, title, text, price, cta, reverse = false }) {
  return `    <div class="split split--unit${reverse ? ' split--reverse' : ''}">
      <div class="zoom rounded ${ratio} reveal">${imageHtml}</div>
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h3 class="h2 h2--64">${title}</h3>
        <p class="lead lead--480">${text}</p>
        ${price ? `<p class="split__price">${price}</p>` : ''}
        ${cta ? `<div class="split__cta">${cta}</div>` : ''}
      </div>
    </div>`;
}

/** Photographs with a caption (and optional text), four across on a laptop. */
export function figures(c, items, { sizes = '(min-width:1100px) 22vw, (min-width:600px) 46vw, 100vw', ratio = 'ar-4-3', heading = false } = {}) {
  const rows = items
    .map((f) => `    <figure class="reveal"><div class="zoom rounded ${ratio}">${c.picture(f.img, { alt: f.alt, sizes, pos: f.pos })}</div><figcaption class="fig__cap${f.text ? ' fig__cap--tight' : ''}">${heading ? `<h3 class="fig__h">${f.cap}</h3>` : f.cap}${f.text ? `<p class="fig__text">${f.text}</p>` : ''}</figcaption></figure>`)
    .join('\n');
  return `  <div class="figs">\n${rows}\n  </div>`;
}

/** Label and value rows (check-in times, what is included...). */
export function facts(rows) {
  const items = rows
    .map(([label, value]) => `      <div class="facts__row"><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('\n');
  return `    <dl class="facts">\n${items}\n    </dl>`;
}

/** Dark band with three big numbers (the home page's "Our promise" pattern). Text only, no star markup. */
export function trustBand(c, { eyebrow, title, tail, tiles, linkHref, linkLabel, hostLine }) {
  const cfg = c.config;
  const stats = tiles
    .map(([n, caption]) => `      <div><div class="stat__n">${n}</div><div class="stat__c">${caption}</div></div>`)
    .join('\n');
  return `<section class="sec sec--md sec--dark">
  <div class="wrap--1280">
    <p class="eyebrow eyebrow--dark mb-20">${eyebrow}</p>
    <h2 class="reveal h2 h2--76">${title} <span class="tone--mist">${tail}</span></h2>
    <div class="stats stats--dark">
${stats}
    </div>
    <div class="promise">
      <p>${hostLine || `Hosted by ${esc(cfg.host.name)} (“${esc(cfg.host.nickname)}”), an Airbnb Superhost. ${cfg.host.languages.slice(0, -1).join(', ')} and ${cfg.host.languages.at(-1)} spoken.`}</p>
      <p><a class="link" href="${esc(linkHref)}"${extAttrs}>${linkLabel}</a></p>
    </div>
  </div>
</section>`;
}

/** Pale band that closes a page: where to book. `pills` is an array of rendered pills. */
export function bookBand({ eyebrow, title, tail, pills, noteHtml }) {
  return `<section id="contact" class="sec sec--md sec--pale">
  <div class="wrap">
    <p class="eyebrow mb-24">${eyebrow}</p>
    <h2 class="reveal h2 h2--132">${title} <span class="tone--sage">${tail}</span></h2>
    <div class="actions">
      ${pills.join('\n      ')}
    </div>
    ${noteHtml ? `<p class="note">${noteHtml}</p>` : ''}
  </div>
</section>`;
}

/** Wraps a page's sections. */
export const sections = (...parts) => parts.filter(Boolean).join('\n\n');
