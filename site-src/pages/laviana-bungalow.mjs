// /laviana-bungalow/ — the bungalow had no page and no mention in the design (audit finding #8).
// Only photos the design already pairs with the bungalow are used; there are no bungalow kitchen or bedroom
// photos in the repository yet (listed in the PR as something the owner can supply).
import { NB, esc } from '../lib/core.mjs';
import { accommodation } from '../lib/schema.mjs';
import { bookBand, facts, figures, intro, pageHero, sectionHead, sections, split, trustBand } from '../lib/inner.mjs';

export default function lavianaBungalow(c) {
  const { rel, pill, picture: pic, config: cfg } = c;
  const idr = (n) => 'IDR' + NB + n.toLocaleString('en-US');

  const hero = pageHero(c, {
    image: 'annies-villa-lovina-aerial-grounds',
    alt: 'Aerial view of the main house, bungalow and green grounds at Annie’s Villa',
    title: 'Laviana Bungalow.',
    tail: 'Your own place in the garden.',
    cta: pill({ href: c.wa('bungalow'), label: 'Book the bungalow', tone: 'light', size: 'hero', external: true }),
    note: 'A separate building · its own kitchen',
  });

  const about = intro({
    eyebrow: '(01) Laviana Bungalow at Annie’s Villa',
    lead: 'A separate building in the garden of Annie’s Villa, in Lovina, North Bali. It has its own bedroom, living room and private kitchen.',
    statement: 'Cook, sit and sleep without sharing.',
    tone: 'The garden and the pool are part of the same property.',
  });

  const bungalow = `<section id="bungalow" class="sec sec--page">
${sectionHead({
    eyebrow: '(02) The bungalow',
    title: 'A bungalow of your own.',
    tail: 'With its own kitchen.',
    lead: 'Book it on its own, or rent the whole property.',
  })}
  <div class="stack">
${split({
    imageHtml: pic('annies-villa-lovina-veranda', { alt: 'Covered veranda with sofa and armchairs at Laviana Bungalow', sizes: '(min-width:720px) 46vw, 100vw', pos: '50% 70%' }),
    ratio: 'ar-4-5',
    eyebrow: 'Separate building',
    title: 'Bedroom, living room and kitchen.',
    text: 'The bungalow is a separate building with its own bedroom, living room and private kitchen, so you can cook and sit without sharing.',
    price: c.priceLine('bungalow'),
    cta: pill({ href: c.wa('bungalow'), label: 'Book the bungalow', tone: 'dark', size: 'lg', external: true }),
  })}
  </div>
</section>`;

  const grounds = `<section class="sec sec--md sec--soft">
  <div class="wrap">
${sectionHead({
    eyebrow: '(03) The grounds',
    title: 'Garden and pool',
    tail: 'inside one walled property.',
    lead: `The bungalow shares the ${cfg.stay.poolLengthM}${NB}m garden pool and the green grounds with the rest of the property.`,
  })}
${figures(c, [
    { img: 'annies-villa-lovina-garden-lawn', alt: 'Green garden lawn beside the villa', cap: 'The garden' },
    { img: 'annies-villa-lovina-pool-from-above', alt: 'The curved garden pool with a small round pool beside it, seen from above', cap: 'The garden pool' },
    { img: 'annies-villa-lovina-pool-loungers', alt: 'Two loungers beside the swimming pool', cap: 'Loungers by the pool' },
  ], { sizes: '(min-width:1100px) 30vw, (min-width:600px) 46vw, 100vw' })}
  </div>
</section>`;

  const practical = `<section id="good-to-know" class="sec sec--page">
${sectionHead({
    eyebrow: '(04) Good to know',
    title: 'The practical things.',
    tail: 'Prices are clear.',
  })}
${facts([
    ['Check-in', `From ${esc(cfg.stay.checkIn)}`],
    ['Check-out', `By ${esc(cfg.stay.checkOut)}`],
    ['Kitchen', 'Private, inside the bungalow'],
    ['Pool', `A ${cfg.stay.poolLengthM}${NB}m garden pool, shared with the rest of the property`],
    ['Airport pickup', `Arranged on WhatsApp, about ${idr(cfg.stay.airportPickupIdr)}`],
    ['Tours and day trips', 'Arranged and priced separately. We tell you the price before you pay.'],
    ['Booking', `Message us on WhatsApp, or book on Airbnb. <a class="link" href="${rel('/faq/')}">More questions and answers</a>`],
  ])}
</section>`;

  const trust = trustBand(c, {
    eyebrow: '(05) Guests say',
    title: 'Honest stays, five-star service.',
    tail: 'Read what guests wrote on Airbnb.',
    tiles: [
      [esc(cfg.reviews.airbnbRating), 'Rating on Airbnb · Guest Favorite'],
      [String(cfg.reviews.bungalowCount), 'Reviews of Laviana Bungalow on Airbnb'],
      [String(cfg.host.airbnbYears), 'Years hosting on Airbnb'],
    ],
    linkHref: cfg.links.airbnbBungalow,
    linkLabel: 'Read the reviews on Airbnb',
  });

  const book = bookBand({
    eyebrow: '(06) Book',
    title: 'Book the bungalow,',
    tail: 'or message us directly.',
    pills: [
      pill({ href: c.wa('bungalow'), label: 'Message on WhatsApp', tone: 'dark', size: 'lg', external: true }),
      pill({ href: cfg.links.airbnbBungalow, label: 'Book on Airbnb', tone: 'dark', size: 'lg', external: true }),
      pill({ href: rel('/annies-villa/'), label: 'See the rooms', tone: 'outline', size: 'lg' }),
    ],
    noteHtml: `Renting the whole property? Message the family directly, or read about <a class="link" href="${rel('/long-term/')}">long stays</a>.`,
  });

  return {
    title: 'Laviana Bungalow — Private Bungalow in Lovina, Bali',
    description: `Laviana Bungalow at Annie's Villa, Lovina: your own bedroom, living room and private kitchen, with the ${cfg.stay.poolLengthM} m garden pool. ${cfg.reviews.bungalowCount} Airbnb reviews at ${cfg.reviews.airbnbRating}★. Book direct.`,
    ogImage: 'og-annies-villa-lovina',
    jsonld: [
      accommodation(c, {
        path: '/laviana-bungalow/',
        name: 'Laviana Bungalow',
        description: "Laviana Bungalow at Annie's Villa in Lovina, North Bali: a separate building with its own bedroom, living room and private kitchen, with access to the garden pool.",
        images: ['annies-villa-lovina-veranda', 'annies-villa-lovina-aerial-grounds', 'annies-villa-lovina-pool-loungers'],
        category: 'Bungalow',
        features: ['Private kitchen', 'Living room', 'Bedroom', `Garden pool (${cfg.stay.poolLengthM} m, shared with the rest of the property)`],
      }),
    ],
    main: sections(hero, about, bungalow, grounds, practical, trust, book),
  };
}
