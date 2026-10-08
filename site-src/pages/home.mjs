// Home page — the approved landing-page design, converted to static HTML.
// Wording, order and styling are the design's. The only differences (each one marked with c.D(design, site)):
//   - navigation, buttons and footer link to the real pages, WhatsApp and Airbnb instead of "#contact"
//   - the "Choose your stay" cards name the units (Annie's Villa rooms, Laviana Bungalow) and link to their pages
//   - placeholders the owner has confirmed are filled in (rating, review count, WhatsApp number, year)
import { esc, extAttrs } from '../lib/core.mjs';
import { lodgingBusiness } from '../lib/schema.mjs';

export default function home(c) {
  const { D, rel, picture: pic, pill, config: cfg } = c;
  const showBooking = cfg.toggles.showBookingCom;

  const slides = [
    { id: 'annies-villa-lovina-pool-dusk', alt: 'Pool at dusk at Annie’s Villa, with the lit pavilion behind it', priority: true },
    { id: 'annies-villa-lovina-aerial-grounds', alt: 'Aerial view of the villa surrounded by palms and banana trees' },
    { id: 'annies-villa-lovina-room-sofa-bed', alt: 'A room with a sofa, a double bed and a carved wooden door', pos: '58% 50%' },
    { id: 'annies-villa-lovina-garden-lawn', alt: 'Green garden lawn beside the villa' },
  ]
    .map((s) => `  <div class="hero__slide">${pic(s.id, { alt: s.alt, sizes: '100vw', priority: s.priority, pos: s.pos })}</div>`)
    .join('\n');

  const hero = `<section id="top" class="hero">
${slides}
  <div class="hero__shade"></div>
  <div class="hero__body">
    <p class="chip rise">Lovina · Singaraja · North Bali</p>
    <h1 class="hero__title rise rise--1">A quiet green villa <span class="tone--hero">by the pool, near the sea.</span></h1>
    <div class="hero__actions rise rise--2">
      ${pill({ href: '#stays', label: 'See the stays', tone: 'light', size: 'hero' })}
      <span class="hero__note">Two rooms · a private bungalow · one garden pool</span>
    </div>
  </div>
</section>`;

  const intro = `<section class="sec sec--page intro">
  <div class="reveal intro__side">
    <p class="eyebrow">(01) About</p>
    <p class="lead lead--340">A family-run villa in Lovina. It feels like a home in a garden: quiet, friendly and close to everything.</p>
  </div>
  <p class="reveal statement">Annie’s Villa is made for slow days among palms and banana trees. <span class="tone">The market, the mountains and the sea are all a short way from your door.</span></p>
</section>`;

  const marqueeText = 'Palm trees ✦ Banana trees ✦ A quiet pool ✦ Sea breeze ✦ Mountain air ✦ Friendly people ✦ Morning market ✦ ';
  const marquee = `<section class="marquee-band" aria-hidden="true">
  <div class="marquee">
    <span>${marqueeText}</span>
    <span>${marqueeText}</span>
  </div>
</section>`;

  // ---- Choose your stay ----
  const cardSizes = '(min-width:1200px) 25vw, min(420px, 82vw)';
  const card = ({ img, alt, pos, eyebrow, title, titleHref, text, price, cta }) => {
    const media = pic(img, { alt, sizes: cardSizes, pos });
    const mediaHtml = titleHref ? `<a href="${titleHref}" tabindex="-1" aria-hidden="true">${media}</a>` : media;
    const heading = titleHref ? `<a href="${titleHref}">${title}</a>` : title;
    return `    <article class="card">
      <div class="zoom ar-4-3">${mediaHtml}</div>
      <div class="card__body">
        <p class="eyebrow eyebrow--card">${eyebrow}</p>
        <h3 class="card__title">${heading}</h3>
        <p class="card__text">${text}</p>
        <p class="card__price">${price}</p>
        ${cta}
      </div>
    </article>`;
  };
  const cardPill = (href, label) => pill({ href, label, tone: 'dark', size: 'md', external: !c.design });
  const stays = `<section id="stays" class="sec sec--flush">
  <div class="sec-head sec-head--flush">
    <div>
      <p class="eyebrow mb-18">(02) Stays</p>
      <h2 class="h2 h2--84">Choose your stay. <span class="rail-hint tone">Scroll across →</span></h2>
    </div>
    <p class="lead">Rent a room, the bungalow or the whole property. Book online, or message the family directly.</p>
  </div>
  <div class="rail">
${card({
    img: 'annies-villa-lovina-large-room', alt: 'Large bedroom with a double bed and wardrobe',
    eyebrow: D('Room · 7 × 8 m', 'Annie’s Villa · 7 × 8 m'), title: 'Large room',
    titleHref: D(null, rel('/annies-villa/')),
    text: 'Direct access to the pool. Private bathroom.', price: c.priceLine('largeRoom'),
    cta: cardPill(D('#contact', c.wa('largeRoom')), 'Book this room'),
  })}
${card({
    img: 'annies-villa-lovina-small-room', alt: 'Double bed with orange cushions and towels', pos: '50% 62%',
    eyebrow: D('Room · 5 × 6 m', 'Annie’s Villa · 5 × 6 m'), title: 'Small room',
    titleHref: D(null, rel('/annies-villa/')),
    text: 'Quiet and comfortable. Private bathroom.', price: c.priceLine('smallRoom'),
    cta: cardPill(D('#contact', c.wa('smallRoom')), 'Book this room'),
  })}
${card({
    img: 'annies-villa-lovina-veranda', alt: 'Covered veranda with sofa and armchairs', pos: '50% 70%',
    eyebrow: 'Separate building', title: D('The bungalow', 'Laviana Bungalow'),
    titleHref: D(null, rel('/laviana-bungalow/')),
    text: 'Its own bedroom, living room and private kitchen.', price: c.priceLine('bungalow'),
    cta: cardPill(D('#contact', c.wa('bungalow')), 'Book the bungalow'),
  })}
${card({
    img: 'annies-villa-lovina-aerial-grounds', alt: 'Aerial view of the main house, bungalow and green grounds',
    eyebrow: 'For one group', title: 'The whole property',
    text: 'Main house, bungalow and pool. Arranged directly with the family.', price: 'Enquire for price',
    cta: cardPill(D('#contact', c.wa('wholeProperty')), 'Message us directly'),
  })}
  </div>
</section>`;

  // ---- The garden ----
  const garden = `<section id="green" class="sec sec--pale">
  <div class="wrap">
    <p class="eyebrow mb-18">(03) The garden</p>
    <h2 class="reveal h2 h2--96">Green in every direction. <span class="tone--sage">Banana trees, palms and frangipani around the house.</span></h2>
    <div class="garden-grid">
      <div class="zoom reveal rounded ar-16-11 garden-grid__main">${pic('annies-villa-lovina-aerial-grounds', { alt: 'Aerial view of the villa among palm and banana trees', sizes: '(min-width:761px) 58vw, 100vw' })}</div>
      <div class="garden-grid__side">
        <div class="zoom reveal rounded ar-16-9">${pic('annies-villa-lovina-garden-lawn', { alt: 'Garden lawn and trees', sizes: '(min-width:761px) 40vw, 100vw' })}</div>
        <div class="zoom reveal rounded ar-16-9">${pic('annies-villa-lovina-pool-frangipani', { alt: 'Frangipani by the pool', sizes: '(min-width:761px) 40vw, 100vw' })}</div>
      </div>
    </div>
    <div class="stats">
      <div><div class="stat__n">2</div><div class="stat__c">Rooms, each with a private bathroom</div></div>
      <div><div class="stat__n">1</div><div class="stat__c">Separate bungalow with its own kitchen</div></div>
      <div><div class="stat__n">1</div><div class="stat__c">Garden pool, with direct access from the large room</div></div>
    </div>
  </div>
</section>`;

  // ---- Our promise ----
  const ratingValue = D('[5.0]', () => esc(cfg.reviews.airbnbRating));
  const ratingCaption = D('Rating on Airbnb', `Rating on Airbnb · ${cfg.reviews.airbnbCount} reviews`);
  let bookingStat = '';
  if (showBooking) {
    const value = cfg.reviews.bookingComRating != null
      ? esc(cfg.reviews.bookingComRating)
      : c.placeholder('booking-com-rating', '[10/10]', 'Booking.com rating');
    bookingStat = `
      <div><div class="stat__n">${value}</div><div class="stat__c">Rating on Booking.com</div></div>`;
  }
  const honest = `<section id="honest" class="sec sec--md sec--dark">
  <div class="wrap--1280">
    <p class="eyebrow eyebrow--dark mb-20">(04) Our promise</p>
    <h2 class="reveal h2 h2--76">Honest stays, five-star service. <span class="tone--mist">What you see here is where you will stay.</span></h2>
    <div class="stats stats--dark">
      <div><div class="stat__n">${ratingValue}</div><div class="stat__c">${ratingCaption}</div></div>${bookingStat}
      <div><div class="stat__n">5★</div><div class="stat__c">Service, as guests describe it</div></div>
    </div>
    <div class="promise">
      <p>Prices are clear. Anything extra, such as tours and day trips, is priced separately and told to you before you pay.</p>
      <p>The rooms, the pool and the bungalow in these photos are the ones you will stay in.</p>
      <p>Need something? Message the family directly and get an answer from a real person.</p>
    </div>
  </div>
</section>`;

  // ---- The property ----
  const figSizes = '(min-width:1100px) 22vw, (min-width:600px) 46vw, 100vw';
  const fig = ({ img, alt, cap, drop }) => `    <figure class="reveal${drop ? ' figs__drop' : ''}"><div class="zoom rounded ar-4-5">${pic(img, { alt, sizes: figSizes })}</div><figcaption class="fig__cap">${cap}</figcaption></figure>`;
  const property = `<section id="property" class="sec sec--page">
  <div class="sec-head">
    <div>
      <p class="eyebrow mb-18">(05) The property</p>
      <h2 class="h2 h2--84">Pool, veranda <span class="tone">and breakfast outside.</span></h2>
    </div>
    <p class="lead">A main house, a separate bungalow and a garden with a pool, inside one walled property.</p>
  </div>
  <div class="figs">
${fig({ img: 'annies-villa-lovina-pool-loungers', alt: 'Two loungers beside the swimming pool', cap: 'The pool' })}
${fig({ img: 'annies-villa-lovina-veranda', alt: 'Covered veranda with sofa and armchairs', cap: 'The veranda', drop: true })}
${fig({ img: 'annies-villa-lovina-breakfast-terrace', alt: 'Breakfast served on the terrace', cap: 'Breakfast' })}
${fig({ img: 'annies-villa-lovina-entrance-gate', alt: 'Carved stone gate at the entrance', cap: 'Arrival', drop: true })}
  </div>
</section>`;

  // ---- Rooms ----
  const rooms = `<section class="sec sec--md sec--soft">
  <div class="wrap">
    <figure class="reveal rooms-lead">
      <div class="zoom rounded ar-16-9">${pic('annies-villa-lovina-room-sofa-bed', { alt: 'A room with a patterned sofa, a double bed with orange cushions and a carved wooden door', sizes: '100vw' })}</div>
      <figcaption class="fig__cap fig__cap--15">A room with a sofa, a double bed and a carved wooden door.</figcaption>
    </figure>
    <div class="split">
      <div class="duo">
        <div class="zoom rounded ar-3-4">${pic('annies-villa-lovina-bathroom-shower', { alt: 'Walk-in shower with grey tiles', sizes: '(min-width:700px) 22vw, 45vw' })}</div>
        <div class="zoom rounded ar-3-4 duo__drop">${pic('annies-villa-lovina-bathroom-basin', { alt: 'Basin and mirror in the bathroom', sizes: '(min-width:700px) 22vw, 45vw' })}</div>
      </div>
      <div>
        <p class="eyebrow mb-20">(06) Rooms</p>
        <h2 class="h2 h2--64">Private bathrooms, <span class="tone">and a bed that is yours.</span></h2>
        <p class="lead lead--480">Both rooms have a private bathroom. The large room opens straight onto the pool. The bungalow has its own kitchen and living room, so you can cook and sit without sharing.</p>
      </div>
    </div>
  </div>
</section>`;

  // ---- Around Lovina ----
  const lov = ({ img, alt, cap, pos }) => `    <figure class="reveal"><div class="zoom rounded ar-4-3">${pic(img, { alt, sizes: figSizes, pos })}</div><figcaption class="fig__cap fig__cap--16">${cap}</figcaption></figure>`;
  const lovinaMore = D('', ` <a class="link" href="${rel('/location/')}">More about Lovina</a>`);
  const lovina = `<section id="lovina" class="sec sec--page">
  <div class="sec-head">
    <div>
      <p class="eyebrow mb-18">(07) Around Lovina</p>
      <h2 class="h2 h2--84">Sea, springs <span class="tone">and waterfalls.</span></h2>
    </div>
    <p class="lead">A quiet city with friendly people. The market is close, the mountains are close, and the beach is close by.</p>
  </div>
  <div class="figs figs--230">
${lov({ img: 'lovina-beach-sunset', alt: 'Sunset over the sea', cap: 'Sunsets on the beach' })}
${lov({ img: 'lovina-sailing-ship-dusk', alt: 'Sailing ship at dusk', cap: 'Sailing at dusk' })}
${lov({ img: 'lovina-hot-spring-pools', alt: 'Hot spring pools beside a temple', cap: 'Hot springs' })}
${lov({ img: 'lovina-waterfall-forest', alt: 'Waterfall in the forest', cap: 'Waterfalls in the hills', pos: '57% 50%' })}
  </div>
  <p class="note note--grey">Tours and day trips are arranged and priced separately.${lovinaMore}</p>
</section>`;

  // ---- Questions ----
  const q = (n, question, answerHtml, open) => `      <details${open ? ' open' : ''}><summary class="q"><span class="q__n">${n}</span><span class="q__t">${question}</span><span class="plus" aria-hidden="true">+</span></summary><p class="a">${answerHtml}</p></details>`;
  const faqMore = D('', `\n    <p class="note note--grey note--tight"><a class="link" href="${rel('/faq/')}">More questions and answers</a></p>`);
  const poolA = cfg.faqAnswers.poolPrivate ?? (c.design ? c.placeholder('faq-pool-private', '[Answer, confirmed by the family.]', 'FAQ: is the pool private to the guests?') : null);
  const marketA = cfg.faqAnswers.marketDistance ?? (c.design ? c.placeholder('faq-market-distance', '[Distance and travel time, confirmed by the family.]', 'FAQ: how far is the market?') : null);
  // questions without a confirmed answer are left out of the live site, not guessed
  const faqRows = [
    poolA && ['Is the pool private to the guests?', poolA],
    ['Can we rent the whole property?', 'Yes, it is possible. Message the family directly to arrange it.'],
    ['Are tours included in the price?', 'No. Tours and day trips are priced separately, and we tell you the price before you pay.'],
    marketA && ['How far is the market?', marketA],
  ].filter(Boolean).map(([qq, a], i) => q(String(i + 1).padStart(2, '0'), qq, a, i === 0)).join('\n');
  const faq = `<section id="faq" class="sec sec--md sec--page sec--tail faq">
  <div>
    <h2 class="h2 h2--60">Questions</h2>
    <div class="faq__list">
${faqRows}
    </div>${faqMore}
  </div>
  <div class="zoom rounded ar-4-5">${pic('annies-villa-lovina-front-door-night', { alt: 'Front door of the villa at night under a moonlit sky', sizes: '(min-width:700px) 42vw, 100vw' })}</div>
</section>`;

  // ---- Book ----
  const bookingPill = showBooking
    ? pill({
        href: cfg.links.bookingCom || '#contact', label: 'Book on Booking.com', tone: 'dark', size: 'lg',
        external: Boolean(cfg.links.bookingCom && !c.design),
        attrs: cfg.links.bookingCom || c.design ? '' : 'data-fill="booking-com-url"',
      })
    : '';
  const contact = `<section id="contact" class="sec sec--md sec--pale">
  <div class="wrap">
    <p class="eyebrow mb-24">(08) Book</p>
    <h2 class="reveal h2 h2--132">Book online, <span class="tone--sage">or message us directly.</span></h2>
    <div class="actions">
      ${pill({ href: D('#contact', cfg.links.airbnbHost), label: 'Book on Airbnb', tone: 'dark', size: 'lg', external: !c.design })}
      ${bookingPill}
      ${pill({ href: D('#contact', c.wa('general')), label: 'Message the family', tone: 'outline', size: 'lg', external: !c.design })}
    </div>
    <p class="note">Renting the whole property, or a group stay? Message the family directly. ${D(() => c.placeholder('contact-whatsapp', '[Contact address or WhatsApp number]', 'Contact address or WhatsApp number'), `On WhatsApp: <a class="link" href="${esc(c.wa('general'))}"${extAttrs}>${esc(cfg.contact.phoneDisplay)}</a>.`)}</p>
  </div>
</section>`;

  // href is the fallback for browsers without imagesrcset support; the others pick from the srcset
  const heroPreload = `<link rel="preload" as="image" type="image/webp" fetchpriority="high" href="${rel('/images/annies-villa-lovina-pool-dusk-800.webp')}" imagesrcset="${c.manifest['annies-villa-lovina-pool-dusk'].webp.map((v) => `${rel(`/images/annies-villa-lovina-pool-dusk-${v.w}.webp`)} ${v.w}w`).join(', ')}" imagesizes="100vw">\n`;

  return {
    title: "Annie's Villa & Laviana Bungalow — Pool Villa in Lovina, Bali",
    description: `Quiet garden villa with a ${cfg.stay.poolLengthM} m pool in Lovina, North Bali. Airbnb Superhost and Guest Favorite, ${cfg.reviews.airbnbRating}★ from ${cfg.reviews.airbnbCount} reviews. Book direct on WhatsApp.`,
    preload: heroPreload,
    jsonld: [lodgingBusiness(c)],
    main: [hero, intro, marquee, stays, garden, honest, property, rooms, lovina, faq, contact].join('\n\n'),
  };
}
