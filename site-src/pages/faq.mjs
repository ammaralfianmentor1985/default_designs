// /faq/ — the design's four questions plus the ones the owner has already answered.
// Questions whose answer is not confirmed yet (breakfast, family stays, visa help...) are not on the page:
// they are listed in the PR for the owner to answer. Unanswered design placeholders stay visible and block go-live.
// FAQPage structured data only contains questions with a confirmed answer.
import { NB, esc } from '../lib/core.mjs';
import { faqPage } from '../lib/schema.mjs';
import { bookBand, pageHead, sections } from '../lib/inner.mjs';

export default function faq(c) {
  const { rel, pill, picture: pic, config: cfg } = c;
  const idr = (n) => 'IDR' + NB + n.toLocaleString('en-US');

  const items = [
    { q: 'Is the pool private to the guests?', html: c.placeholder('faq-pool-private', '[Answer, confirmed by the family.]', 'FAQ: is the pool private to the guests?') },
    { q: 'Can we rent the whole property?', a: `Yes, it is possible. Message the family directly to arrange it. For a stay of ${cfg.stay.longStayMinMonths} months or longer, see <a class="link" href="${rel('/long-term/')}">long stays</a>.` },
    { q: 'Are tours included in the price?', a: 'No. Tours and day trips are priced separately, and we tell you the price before you pay.' },
    { q: 'How far is the market?', html: c.placeholder('faq-market-distance', '[Distance and travel time, confirmed by the family.]', 'FAQ: how far is the market?') },
    { q: 'Do you offer airport pickup?', a: `Yes. Message us on WhatsApp to arrange it. It costs about ${idr(cfg.stay.airportPickupIdr)}.` },
    { q: 'What time are check-in and check-out?', a: `Check-in is from ${esc(cfg.stay.checkIn)}. Check-out is by ${esc(cfg.stay.checkOut)}.` },
    { q: 'Can we stay for months?', a: `Yes. The whole property can be rented for ${cfg.stay.longStayMinMonths} months to ${cfg.stay.longStayMaxYears} years. See <a class="link" href="${rel('/long-term/')}">long stays</a>.` },
    { q: 'Which languages do you speak?', a: `${esc(cfg.host.name)}, our host, speaks ${cfg.host.languages.slice(0, -1).join(', ')} and ${cfg.host.languages.at(-1)}.` },
    { q: 'How do I book?', a: `Message us on WhatsApp at <a class="link" href="${esc(c.wa('general'))}" target="_blank" rel="noopener">${esc(cfg.contact.phoneDisplay)}</a>, or book on Airbnb.` },
    { q: 'What is the difference between Annie’s Villa and Laviana Bungalow?', a: `Annie’s Villa has two rooms, each with a private bathroom. <a class="link" href="${rel('/laviana-bungalow/')}">Laviana Bungalow</a> is a separate building with its own bedroom, living room and private kitchen. The garden and the pool are part of the same property.` },
  ];

  const rows = items
    .map((it, i) => {
      const n = String(i + 1).padStart(2, '0');
      return `      <details${i === 0 ? ' open' : ''}><summary class="q"><span class="q__n">${n}</span><span class="q__t">${esc(it.q)}</span><span class="plus" aria-hidden="true">+</span></summary><p class="a">${it.html || it.a}</p></details>`;
    })
    .join('\n');

  const head = pageHead(c, {
    eyebrow: '(01) FAQ',
    title: 'Questions',
    tail: 'and answers.',
    lead: 'About Annie’s Villa and Laviana Bungalow in Lovina. Cannot find your question? Message the family on WhatsApp.',
  });

  const list = `<section class="sec sec--md sec--page sec--tail faq">
  <div>
    <div class="faq__list">
${rows}
    </div>
  </div>
  <div class="zoom rounded ar-4-5">${pic('annies-villa-lovina-front-door-night', { alt: 'Front door of the villa at night under a moonlit sky', sizes: '(min-width:700px) 42vw, 100vw' })}</div>
</section>`;

  const book = bookBand({
    eyebrow: '(02) Ask',
    title: 'Still a question?',
    tail: 'Message us directly.',
    pills: [
      pill({ href: c.wa('general'), label: 'Message on WhatsApp', tone: 'dark', size: 'lg', external: true }),
      pill({ href: rel('/annies-villa/'), label: 'See the rooms', tone: 'outline', size: 'lg' }),
    ],
  });

  const answered = items.filter((it) => it.a).map((it) => ({ q: it.q, a: it.a }));
  return {
    title: "Annie's Villa Lovina — Questions & Answers",
    description: "Answers about Annie's Villa and Laviana Bungalow in Lovina, North Bali: renting the whole property, tours, airport pickup, check-in and check-out, and long stays.",
    jsonld: [faqPage(answered)],
    main: sections(head, list, book),
  };
}
