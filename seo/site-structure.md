# Site Structure — the Web Engineer's blueprint

Static HTML site, deployed from this repo via GitHub Pages, custom domain (see `domain-shortlist.md`). Design source: `design/annies-villa-landing-page.html` (pixel-identical conversion) + the owner's "Luxury Villa Design System" artifact for styling reference. Site files live in `site/` at repo root (GitHub Pages serves from there or from a `gh-pages` branch — engineer's choice, documented in the PR).

## Page map

```
/                      Home (the converted landing page)
/annies-villa/         Unit page — Annie's Villa rooms
/laviana-bungalow/     Unit page — Laviana Bungalow (NEW — not in current design)
/location/             Location & things to do (hub that guides hang off)
/faq/                  FAQ (expanded from the design's Questions section)
/guides/<slug>/        Content engine articles (Phase 3)
/404.html              Not-found
```

The home page keeps the designed one-page flow (hero → choose your stay → facilities → location → FAQ teaser → booking). Unit pages and /location/ and /faq/ give the deep content a URL of its own — one primary keyword per page.

## Per-page SEO spec

| Page | `<title>` (draft) | Meta description angle | H1 | JSON-LD |
|---|---|---|---|---|
| `/` | Annie's Villa & Laviana Bungalow — Pool Villa in Lovina, Bali | Quiet garden villa with 16 m pool in Lovina, North Bali. Airbnb Superhost & Guest Favorite. Minutes from Lovina Beach & Banjar Hot Springs. Book direct on WhatsApp. | Keep designed hero: "A quiet green villa…" | `LodgingBusiness` |
| `/annies-villa/` | Annie's Villa — Garden Rooms with Pool, Lovina | Rooms, amenities, photos, price range, book direct | Annie's Villa | `Accommodation`/`VacationRental` |
| `/laviana-bungalow/` | Laviana Bungalow — Private Bungalow in Lovina, Bali | Whole-place bungalow, kitchen, shared 16 m pool; Superhost-hosted | Laviana Bungalow | `Accommodation`/`VacationRental` |
| `/location/` | Lovina, North Bali — Around Annie's Villa | Dolphins at dawn, Banjar hot springs, waterfalls, Lovina Beach — all from a quiet garden base | Keep voice: "Sea, springs…" | `Place` optional |
| `/faq/` | Annie's Villa Lovina — Questions & Answers | Pool privacy, whole-property rental, tours, airport pickup, visa extension | Questions | `FAQPage` |
| `/guides/*` | per `content-calendar.md` | per article | per article | `Article` |

## `LodgingBusiness` JSON-LD skeleton (home page)

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Annie's Villa Lovina",
  "alternateName": "Laviana Bungalow at Annie's Villa",
  "description": "Quiet garden villa with a 16 m pool in Lovina, North Bali.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jalan Laviana No. 8, Banyualit, Kalibukbuk",
    "addressLocality": "Lovina, Singaraja",
    "addressRegion": "Bali",
    "postalCode": "81152",
    "addressCountry": "ID"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "FILL", "longitude": "FILL" },
  "telephone": "+62-FILL (WhatsApp)",
  "priceRange": "FILL (e.g. $–$$)",
  "image": ["https://DOMAIN/images/annies-villa-lovina-pool.jpg"],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Outdoor swimming pool (16 m)" },
    { "@type": "LocationFeatureSpecification", "name": "Free WiFi" },
    { "@type": "LocationFeatureSpecification", "name": "Air conditioning" },
    { "@type": "LocationFeatureSpecification", "name": "Free parking" },
    { "@type": "LocationFeatureSpecification", "name": "Airport pickup (paid)" }
  ],
  "sameAs": ["https://www.airbnb.com/rooms/31995942", "FILL other listings/socials"],
  "url": "https://DOMAIN/"
}
```

`FILL` values come from `owner-checklist.md` answers. Validate with Google's Rich Results Test before deploy.

## Image conventions

- Rename from UUIDs → `annies-villa-lovina-<subject>.jpg` (subject in 2–4 words: `pool-sunloungers`, `garden-path`, `bedroom-annies-villa`, `banjar-hot-springs`).
- Compress: long edge ≤ 1600 px, WebP with JPEG fallback, ≤ 250 KB each; hero may be ≤ 400 KB.
- Every `<img>`: descriptive `alt`, `width`/`height` attributes (prevents layout shift), `loading="lazy"` except the hero.
- Keep originals untouched at repo root until Phase 1 completes; copies go to `site/images/`.

## Internal linking rules

- Header/footer nav: Home · Annie's Villa · Laviana Bungalow · Location · FAQ · Book (WhatsApp).
- Every guide → links to `/location/` + one unit page in body text.
- Home "Choose your stay" cards → the two unit pages (and name the units on the cards).

## Technical files

- `sitemap.xml` — all pages, update on every new guide.
- `robots.txt` — allow all; `Sitemap:` pointer.
- Canonical tag on every page (self-referencing).
- `CNAME` file for the custom domain (GitHub Pages requirement).
- Open Graph on every page; `og:image` 1200×630 crop of the pool hero.
