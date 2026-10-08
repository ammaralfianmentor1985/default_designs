// 404.html — GitHub Pages serves this for any unknown address, at any depth, so every link on it is absolute.
// It is never indexable, even after go-live.
import { bookBand, pageHead, sections } from '../lib/inner.mjs';

export default function notFound(c) {
  const { rel, pill } = c;
  const head = pageHead(c, {
    eyebrow: '(404) Page not found',
    title: 'That page is',
    tail: 'not here.',
    lead: 'The link may be old, or the address may have a typo. Try the home page, or message the family.',
  });
  const book = bookBand({
    eyebrow: 'Next',
    title: 'Let us help',
    tail: 'you find it.',
    pills: [
      pill({ href: rel('/'), label: 'Go to the home page', tone: 'dark', size: 'lg' }),
      pill({ href: c.wa('general'), label: 'Message on WhatsApp', tone: 'outline', size: 'lg', external: true }),
    ],
  });
  return {
    title: "Page not found — Annie's Villa Lovina",
    description: "This page could not be found. Go to the Annie's Villa home page or message the family on WhatsApp.",
    main: sections(head, book),
  };
}
