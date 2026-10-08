// JSON-LD builders (schema.org). Rules:
//   - only facts the owner confirmed (config.json); null values are left out, never guessed
//   - only things that are visible on the page the markup is on
//   - no aggregateRating: Airbnb reviews are off-platform, Google's guidelines do not allow them as star ratings.
//     The review count is shown as visible text instead.
import { formatIdr, stripTags } from './core.mjs';

const postalAddress = (c) => {
  const a = c.config.address;
  if (!a.postalCodeConfirmed) c.fill('postal-code', `Postal code ${a.postalCode} is "likely" - owner to confirm`, false);
  return {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
};

const imageUrls = (c, ids) =>
  ids.map((id) => {
    const largest = c.manifest[id].jpg.at(-1);
    return c.abs(`/images/${id}-${largest.w}.jpg`);
  });

const feature = (name, value = true) => ({ '@type': 'LocationFeatureSpecification', name, value });

function optionalGeo(c, o) {
  const { latitude, longitude } = c.config.geo;
  if (latitude == null || longitude == null) {
    c.fill('geo', 'Map coordinates (latitude and longitude) for the structured data', false);
  } else {
    o.geo = { '@type': 'GeoCoordinates', latitude, longitude };
  }
}

function optionalPriceRange(c, o) {
  const prices = Object.values(c.config.prices).filter((p) => typeof p === 'number');
  if (prices.length === 0) {
    c.fill('price-range', 'priceRange for the structured data (set the nightly prices in config.json)', false);
  } else {
    o.priceRange = `${formatIdr(Math.min(...prices))} - ${formatIdr(Math.max(...prices))}`;
  }
}

export function lodgingBusiness(c) {
  const cfg = c.config;
  const o = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': c.abs('/#lodging'),
    name: cfg.brand.schemaName,
    alternateName: cfg.brand.alternateNames,
    description: `Quiet garden villa with a ${cfg.stay.poolLengthM} m pool in Lovina, North Bali: two rooms with private bathrooms and a separate bungalow with its own kitchen.`,
    url: c.abs('/'),
    image: imageUrls(c, ['annies-villa-lovina-pool-dusk', 'annies-villa-lovina-aerial-grounds', 'annies-villa-lovina-garden-lawn']),
    telephone: cfg.contact.phoneSchema,
    address: postalAddress(c),
  };
  optionalGeo(c, o);
  optionalPriceRange(c, o);
  Object.assign(o, {
    checkinTime: cfg.stay.checkIn,
    checkoutTime: cfg.stay.checkOut,
    hasMap: cfg.links.googleMaps,
    amenityFeature: [
      feature(`Outdoor swimming pool (${cfg.stay.poolLengthM} m)`),
      feature('Private bathroom in each room'),
      feature('Private kitchen in the bungalow'),
    ],
    sameAs: [cfg.links.airbnbBungalow, cfg.links.airbnbHost, cfg.links.instagram],
    containsPlace: [
      { '@type': 'Accommodation', '@id': c.abs('/annies-villa/#accommodation'), name: "Annie's Villa rooms", url: c.abs('/annies-villa/') },
      { '@type': 'Accommodation', '@id': c.abs('/laviana-bungalow/#accommodation'), name: 'Laviana Bungalow', url: c.abs('/laviana-bungalow/') },
    ],
  });
  return o;
}

/** One Accommodation per unit page. `place` is the page path, `rooms` optional child Accommodations. */
export function accommodation(c, { path, name, description, images, features = [], numberOfRooms, category, rooms }) {
  const cfg = c.config;
  const o = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    '@id': c.abs(`${path}#accommodation`),
    name,
    description,
    url: c.abs(path),
    image: imageUrls(c, images),
    containedInPlace: {
      '@type': 'LodgingBusiness',
      '@id': c.abs('/#lodging'),
      name: cfg.brand.schemaName,
      url: c.abs('/'),
      address: postalAddress(c),
      telephone: cfg.contact.phoneSchema,
    },
    amenityFeature: features.map((f) => feature(f)),
  };
  if (category) o.accommodationCategory = category;
  if (numberOfRooms) o.numberOfRooms = numberOfRooms;
  if (rooms) {
    o.containsPlace = rooms.map((r) => ({
      '@type': 'Accommodation',
      name: r.name,
      description: r.description,
      floorSize: { '@type': 'QuantitativeValue', value: r.areaM2, unitCode: 'MTK' },
      numberOfBathroomsTotal: 1,
    }));
  }
  return o;
}

/** FAQPage from [{q, a}] where `a` may contain simple HTML. Only questions with a confirmed answer belong here. */
export function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(a) },
    })),
  };
}
