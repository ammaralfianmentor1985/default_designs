// /long-term/ — monthly and yearly stays (target keyword: "long term rental Lovina").
// Confirmed: the whole property can be rented for 6 months to 3 years, enquiries on WhatsApp.
// Not confirmed, so not written: monthly price, utilities, deposit, minimum payment terms.
import { NB, esc } from '../lib/core.mjs';
import { accommodation } from '../lib/schema.mjs';
import { bookBand, facts, intro, pageHero, sectionHead, sections } from '../lib/inner.mjs';

export const longStayQuestions = [
  { q: 'How long can I stay?', a: 'From 6 months up to 3 years.' },
  { q: 'Do I rent the whole property?', a: 'Yes. Long stays are for the whole property: both rooms, the bungalow and the garden pool.' },
  { q: 'How do I get a price?', a: 'Message us on WhatsApp with your dates and how many of you there are. We reply with a price.' },
];

export default function longTerm(c) {
  const { rel, pill, picture: pic, config: cfg } = c;
  const { longStayMinMonths: min, longStayMaxYears: max } = cfg.stay;
  c.fill('long-stay-terms', 'Long-stay price, what is included (utilities), deposit and payment terms, if the family wants them on the page', false);

  const hero = pageHero(c, {
    image: 'annies-villa-lovina-garden-lawn',
    alt: 'Green garden lawn beside the villa',
    title: 'Stay longer',
    tail: 'in Lovina.',
    cta: pill({ href: c.wa('longStay'), label: 'Enquire on WhatsApp', tone: 'light', size: 'hero', external: true }),
    note: `The whole property · ${min} months to ${max} years`,
  });

  const about = intro({
    eyebrow: '(01) Long stays',
    lead: 'Annie’s Villa is also available as a long-term rental in Lovina. You rent the whole property.',
    statement: 'A quiet green home near the sea, for months or years.',
    tone: 'Two rooms, a bungalow and a pool, all yours.',
  });

  const what = `<section id="what-you-rent" class="sec sec--page">
${sectionHead({
    eyebrow: '(02) What you rent',
    title: 'The whole property,',
    tail: 'inside one walled garden.',
    lead: 'Main house, bungalow and pool. It is quiet, which suits retirees and young people alike.',
  })}
  <div class="long-grid">
    <div class="zoom rounded ar-4-3 reveal">${pic('annies-villa-lovina-aerial-grounds', { alt: 'Aerial view of the main house, bungalow and green grounds', sizes: '(min-width:900px) 46vw, 100vw' })}</div>
    <div>
${facts([
    ['The rooms', `Two rooms, 7${NB}×${NB}8${NB}m and 5${NB}×${NB}6${NB}m, each with a private bathroom`],
    ['The bungalow', 'A separate building with its own bedroom, living room and private kitchen'],
    ['The pool', `A ${cfg.stay.poolLengthM}${NB}m garden pool`],
    ['The garden', 'Palms, banana trees and frangipani around the house'],
    ['Length of stay', `${min} months to ${max} years`],
    ['Price', 'Enquire on WhatsApp'],
  ])}
    </div>
  </div>
</section>`;

  const how = `<section id="how-to-enquire" class="sec sec--md sec--soft">
  <div class="wrap">
${sectionHead({
    eyebrow: '(03) How to enquire',
    title: 'Three simple steps.',
    tail: 'No forms.',
  })}
${facts([
    ['01', 'Message us on WhatsApp.'],
    ['02', 'Tell us when you would like to arrive, how long you would like to stay and how many of you there are.'],
    ['03', 'We reply with a price.'],
  ])}
  </div>
</section>`;

  const q = (n, question, answer) => `      <details${n === '01' ? ' open' : ''}><summary class="q"><span class="q__n">${n}</span><span class="q__t">${question}</span><span class="plus" aria-hidden="true">+</span></summary><p class="a">${answer}</p></details>`;
  const questions = `<section id="questions" class="sec sec--md sec--page faq">
  <div>
    <h2 class="h2 h2--60">Long-stay questions</h2>
    <div class="faq__list">
${longStayQuestions.map((x, i) => q(String(i + 1).padStart(2, '0'), esc(x.q), esc(x.a))).join('\n')}
    </div>
    <p class="note note--grey note--tight"><a class="link" href="${rel('/faq/')}">More questions and answers</a></p>
  </div>
  <div class="zoom rounded ar-4-5">${pic('annies-villa-lovina-pool-loungers', { alt: 'Two loungers beside the swimming pool', sizes: '(min-width:700px) 42vw, 100vw' })}</div>
</section>`;

  const book = bookBand({
    eyebrow: '(04) Enquire',
    title: 'Tell us your dates,',
    tail: 'we will send a price.',
    pills: [
      pill({ href: c.wa('longStay'), label: 'Enquire on WhatsApp', tone: 'dark', size: 'lg', external: true }),
      pill({ href: rel('/annies-villa/'), label: 'Short stay: see the rooms', tone: 'outline', size: 'lg' }),
    ],
    noteHtml: `On WhatsApp: <a class="link" href="${esc(c.wa('longStay'))}" target="_blank" rel="noopener">${esc(cfg.contact.phoneDisplay)}</a>.`,
  });

  return {
    title: 'Long-Term Villa Rental in Lovina — Monthly & Yearly Stays',
    description: `Rent the whole property — two rooms, the bungalow and a ${cfg.stay.poolLengthM} m pool — for ${min} months to ${max} years. A quiet garden base in Lovina. Enquire on WhatsApp.`,
    jsonld: [
      accommodation(c, {
        path: '/long-term/',
        name: "Annie's Villa — whole property for long stays",
        description: `The whole property at Annie's Villa in Lovina, North Bali, for stays of ${min} months to ${max} years: two rooms with private bathrooms, Laviana Bungalow with its own kitchen, and a ${cfg.stay.poolLengthM} m garden pool.`,
        images: ['annies-villa-lovina-aerial-grounds', 'annies-villa-lovina-garden-lawn', 'annies-villa-lovina-pool-loungers'],
        features: [`Garden pool (${cfg.stay.poolLengthM} m)`, 'Private bathroom in each room', 'Private kitchen in the bungalow'],
      }),
    ],
    main: sections(hero, about, what, how, questions, book),
  };
}
