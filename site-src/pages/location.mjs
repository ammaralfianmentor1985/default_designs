// /location/ — where the villa is and what is around it. The hub that future guides link back to.
// Only geography that is generally true and facts the owner confirmed. No distances or travel times: those
// are still to be confirmed by the family, so the page has no "how far" table yet (listed in the PR).
import { NB, esc, extAttrs } from '../lib/core.mjs';
import { bookBand, facts, figures, intro, pageHero, sectionHead, sections } from '../lib/inner.mjs';

export default function location(c) {
  const { rel, pill, config: cfg } = c;
  const idr = (n) => 'IDR' + NB + n.toLocaleString('en-US');
  c.fill('location-distances', 'Distances and travel times (beach, market, hot springs, waterfalls) so a "how far" block can be added', false);

  const hero = pageHero(c, {
    image: 'lovina-beach-sunset',
    alt: 'Sunset over the sea, with outrigger boats on the beach',
    title: 'Sea, springs',
    tail: 'and waterfalls.',
    cta: pill({ href: cfg.links.googleMaps, label: 'Open in Google Maps', tone: 'light', size: 'hero', external: true }),
    note: 'Jalan Laviana, Banyualit, Kalibukbuk',
  });

  const about = intro({
    eyebrow: '(01) Where we are',
    lead: 'Annie’s Villa is on Jalan Laviana in Banyualit, Kalibukbuk, in Lovina, Singaraja, on the north coast of Bali.',
    statement: 'A quiet coastal town with friendly people.',
    tone: 'The market, the mountains and the beach are all close.',
  });

  const things = `<section id="around" class="sec sec--md sec--soft">
  <div class="wrap">
${sectionHead({
    eyebrow: '(02) Around Lovina',
    title: 'Dolphins, hot springs',
    tail: 'and hills.',
    lead: 'Tours and day trips are arranged and priced separately. We tell you the price before you pay.',
  })}
${figures(c, [
    { img: 'lovina-boats-beach-sunset', alt: 'Outrigger boats on a dark-sand beach at sunset, with mountains across the water', cap: 'Sunsets on the beach', text: 'Lovina’s beaches have dark sand and wooden fishing boats. The sun sets over the sea.', pos: '50% 40%' },
    { img: 'lovina-dolphins-at-sea', alt: 'Dolphins surfacing at sea near an outrigger boat', cap: 'Dolphins at dawn', text: 'Boats go out early in the morning to look for dolphins at sea. Ask us about a trip.', pos: '50% 45%' },
    { img: 'lovina-holy-hot-spring', alt: 'The Holy Hot Spring pool, with a pavilion and gardens above it', cap: 'Hot springs', text: 'The Banjar hot springs are west of Lovina, with warm pools in a green garden.', pos: '60% 40%' },
    { img: 'lovina-waterfall-gorge', alt: 'Waterfall falling into a green forest gorge', cap: 'Waterfalls in the hills', text: 'Gitgit, Aling-Aling and Sekumpul are among the waterfalls in the hills behind Lovina.', pos: '50% 35%' },
  ], { ratio: 'ar-1-1', heading: true })}
  </div>
</section>`;

  const getting = `<section id="getting-here" class="sec sec--page">
${sectionHead({
    eyebrow: '(03) Getting here',
    title: 'Find us,',
    tail: 'or let us collect you.',
  })}
${facts([
    ['Address', `<address class="address">${esc(cfg.address.oneLine)}</address><a class="link" href="${esc(cfg.links.googleMaps)}"${extAttrs}>Open in Google Maps</a>`],
    ['Airport pickup', `Arranged on WhatsApp, about ${idr(cfg.stay.airportPickupIdr)}`],
    ['Check-in', `From ${esc(cfg.stay.checkIn)}`],
    ['Check-out', `By ${esc(cfg.stay.checkOut)}`],
    ['Tours and day trips', 'Arranged and priced separately. We tell you the price before you pay.'],
  ])}
</section>`;

  const book = bookBand({
    eyebrow: '(04) Stay',
    title: 'Stay a few nights,',
    tail: 'or longer.',
    pills: [
      pill({ href: rel('/annies-villa/'), label: 'See the rooms', tone: 'dark', size: 'lg' }),
      pill({ href: rel('/laviana-bungalow/'), label: 'See Laviana Bungalow', tone: 'dark', size: 'lg' }),
      pill({ href: c.wa('general'), label: 'Message on WhatsApp', tone: 'outline', size: 'lg', external: true }),
    ],
    noteHtml: `Planning a stay of 6 months or more? Read about <a class="link" href="${rel('/long-term/')}">long stays</a>.`,
  });

  return {
    title: "Lovina, North Bali — Around Annie's Villa",
    description: "Dolphins at dawn, Banjar hot springs, waterfalls and Lovina Beach: what to do around Annie's Villa in Lovina, North Bali. Tours arranged and priced separately.",
    main: sections(hero, about, things, getting, book),
  };
}
