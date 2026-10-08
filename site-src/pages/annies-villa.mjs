// /annies-villa/ — the two garden rooms. Photos and wording come from the approved design;
// the facts are the ones the owner confirmed (config.json). Nothing here is invented.
import { NB, esc } from '../lib/core.mjs';
import { accommodation } from '../lib/schema.mjs';
import { bookBand, facts, figures, intro, pageHero, sectionHead, sections, split, trustBand } from '../lib/inner.mjs';

export default function anniesVilla(c) {
  const { rel, pill, picture: pic, config: cfg } = c;
  const idr = (n) => 'IDR' + NB + n.toLocaleString('en-US');

  const hero = pageHero(c, {
    image: 'annies-villa-lovina-pool-loungers',
    alt: 'Two loungers beside the swimming pool at Annie’s Villa',
    title: 'Annie’s Villa.',
    tail: 'Two garden rooms by the pool.',
    cta: pill({ href: c.wa('general'), label: 'Book a room', tone: 'light', size: 'hero', external: true }),
    note: `Private bathrooms · a 16${NB}m garden pool`,
  });

  const about = intro({
    eyebrow: '(01) Annie’s Villa',
    lead: `Two rooms in a family-run villa in Lovina, North Bali. Sea, springs and waterfalls are close: see <a class="link" href="${rel('/location/')}">around Lovina</a>.`,
    statement: 'A quiet room in a green garden, with a pool to swim in.',
    tone: 'The market, the mountains and the sea are all a short way away.',
  });

  const rooms = `<section id="rooms" class="sec sec--page">
${sectionHead({
    eyebrow: '(02) The rooms',
    title: 'Large room or small room.',
    tail: 'Both with a private bathroom.',
    lead: 'Choose the large room if you want to step straight into the pool. Choose the small room for a quiet, comfortable place to sleep.',
  })}
  <div class="stack">
${split({
    imageHtml: pic('annies-villa-lovina-large-room', { alt: 'Large bedroom with a double bed and wardrobe at Annie’s Villa', sizes: '(min-width:720px) 46vw, 100vw' }),
    eyebrow: `Room · 7${NB}×${NB}8${NB}m`,
    title: 'Large room',
    text: `Direct access to the pool and a private bathroom. The room is 7${NB}×${NB}8${NB}m, with a double bed and a wardrobe.`,
    price: c.priceLine('largeRoom'),
    cta: pill({ href: c.wa('largeRoom'), label: 'Book this room', tone: 'dark', size: 'lg', external: true }),
  })}
${split({
    imageHtml: pic('annies-villa-lovina-small-room', { alt: 'Double bed with orange cushions at Annie’s Villa', sizes: '(min-width:720px) 46vw, 100vw', pos: '50% 60%' }),
    ratio: 'ar-4-5',
    eyebrow: `Room · 5${NB}×${NB}6${NB}m`,
    title: 'Small room',
    text: `Quiet and comfortable, with a private bathroom. The room is 5${NB}×${NB}6${NB}m, with a double bed and orange cushions.`,
    price: c.priceLine('smallRoom'),
    cta: pill({ href: c.wa('smallRoom'), label: 'Book this room', tone: 'dark', size: 'lg', external: true }),
    reverse: true,
  })}
  </div>
</section>`;

  const house = `<section class="sec sec--md sec--soft">
  <div class="wrap">
${sectionHead({
    eyebrow: '(03) The house',
    title: 'Porch, veranda',
    tail: 'and a pool.',
    lead: 'A main house, a separate bungalow and a garden with a pool, inside one walled property.',
  })}
${figures(c, [
    { img: 'annies-villa-lovina-house-front-porch', alt: 'Front porch of the main house with a carved wooden door, tiered red umbrellas and chairs with orange cushions', cap: 'The front porch' },
    { img: 'annies-villa-lovina-veranda', alt: 'Covered veranda with sofa and armchairs', cap: 'The veranda' },
    { img: 'annies-villa-lovina-pool-from-above', alt: 'The curved garden pool with a small round pool beside it, seen from above', cap: 'The garden pool' },
    { img: 'annies-villa-lovina-breakfast-spread', alt: 'Breakfast on a wooden table by the pool: toast, banana and almond porridge, jam and a coffee press', cap: 'Breakfast outside' },
  ])}
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
    ['Bathrooms', 'A private bathroom in each room'],
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
      [String(cfg.reviews.villaCount), 'Reviews of Annie’s Villa on Airbnb'],
      [String(cfg.host.airbnbYears), 'Years hosting on Airbnb'],
    ],
    linkHref: cfg.links.airbnbVilla || cfg.links.airbnbHost,
    linkLabel: 'Read the reviews on Airbnb',
  });
  if (!cfg.links.airbnbVilla) c.fill('airbnb-villa-url', 'Airbnb URL of the Annie Villa room listing (the host profile is linked until then)', false);

  const book = bookBand({
    eyebrow: '(06) Book',
    title: 'Book a room,',
    tail: 'or message us directly.',
    pills: [
      pill({ href: c.wa('general'), label: 'Message on WhatsApp', tone: 'dark', size: 'lg', external: true }),
      pill({ href: cfg.links.airbnbVilla || cfg.links.airbnbHost, label: 'Book on Airbnb', tone: 'dark', size: 'lg', external: true }),
      pill({ href: rel('/laviana-bungalow/'), label: 'See Laviana Bungalow', tone: 'outline', size: 'lg' }),
    ],
    noteHtml: `Renting the whole property? Message the family directly, or read about <a class="link" href="${rel('/long-term/')}">long stays</a>.`,
  });

  return {
    title: "Annie's Villa — Garden Rooms with Pool, Lovina",
    description: 'Two garden rooms with private bathrooms in Lovina, North Bali: a 7 × 8 m room with direct pool access and a 5 × 6 m room. Book direct on WhatsApp.',
    ogImage: 'og-annies-villa-lovina',
    jsonld: [
      accommodation(c, {
        path: '/annies-villa/',
        name: "Annie's Villa rooms",
        description: 'Two garden rooms, each with a private bathroom, at Annie\'s Villa in Lovina, North Bali. The large room (7 × 8 m) has direct access to the garden pool; the small room is 5 × 6 m.',
        images: ['annies-villa-lovina-large-room', 'annies-villa-lovina-small-room', 'annies-villa-lovina-pool-loungers'],
        numberOfRooms: 2,
        features: [`Garden pool (${cfg.stay.poolLengthM} m)`, 'Private bathroom in each room', 'Direct pool access from the large room'],
        rooms: [
          { name: 'Large room', description: 'Direct access to the pool and a private bathroom. 7 × 8 m, with a double bed and a wardrobe.', areaM2: 56 },
          { name: 'Small room', description: 'Quiet and comfortable, with a private bathroom. 5 × 6 m, with a double bed.', areaM2: 30 },
        ],
      }),
    ],
    main: sections(hero, about, rooms, house, practical, trust, book),
  };
}
