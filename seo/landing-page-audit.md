# SEO Audit — `design/annies-villa-landing-page.html`

Audited: 2025-10-08 · Verdict: **design & copy are strong; the file is not launchable as-is.** It is a Claude-artifact *self-unpacking JavaScript bundle* (3.8 MB): all content lives in JSON inside `<script type="__bundler/...">` blocks and is rendered at runtime. Convert before launch.

## Findings & required fixes

| # | Check | Current state | Fix (Web Engineer) |
|---|---|---|---|
| 1 | Content without JavaScript | ❌ Page shows only "Loading Annie's Villa…" without JS; all real content unpacked by script | Rebuild as plain static HTML, pixel-identical. Extract the markup from the `__bundler/template` JSON block as the starting point |
| 2 | Page weight | ❌ 3.8 MB single file; images embedded in the bundle manifest | Serve images as real files (`site/images/`), compressed (target ≤ 250 KB each, WebP + JPEG fallback), `loading="lazy"` below the fold. The repo's 130 photos are the originals |
| 3 | `<title>` | ⚠️ `Annie's Villa` — no location, no intent | `Annie's Villa & Laviana Bungalow — Private Pool Villa in Lovina, North Bali` (≤ 60 chars-ish; final wording per `site-structure.md`) |
| 4 | Meta description | ❌ Missing | Per page, ~150 chars, includes Lovina + pool + the Superhost/Guest Favorite trust signals |
| 5 | Open Graph / Twitter tags | ❌ Missing | `og:title`, `og:description`, `og:image` (hero pool photo), `og:url`. Controls WhatsApp/Facebook link previews — most guests will receive this link in WhatsApp |
| 6 | Structured data (JSON-LD) | ❌ None | `LodgingBusiness` on home (name, address, geo, telephone, priceRange, amenityFeature, image, sameAs → Airbnb listing); one `VacationRental`/`Accommodation` per unit page; `FAQPage` on the FAQ (questions already in the design: "Is the pool private to the guests?", "Can we rent the whole property?", "Are tours included in the price?", "How far is the market?") |
| 7 | Image `alt` text | ❌ None on ~23 images | Descriptive, location-bearing alt: `Private pool with sun loungers at Annie's Villa Lovina` |
| 8 | **"Laviana Bungalow" absent** | ❌ The page never mentions Laviana Bungalow — one of our two branded search terms has **no landing target** | Add a Laviana Bungalow unit page (and name the units in the "Choose your stay" section); link both unit pages from home |
| 9 | WhatsApp booking link | ❌ Placeholder "[WhatsApp number]" | Number confirmed: **+62 812-388-3439** → `https://wa.me/628123883439?text=...` prefilled booking message |
| 10 | Headings/keywords | ⚠️ Beautiful brand-voice headings ("A quiet green villa", "Sea, springs") with no location terms | **Do not butcher the copy.** Keywords go in title/meta/schema/alt and the location section body text; headings stay as designed |
| 11 | Canonical / robots / sitemap / 404 / favicon | ❌ None | Add all; `sitemap.xml` listing every page, `robots.txt` allowing all + sitemap pointer |
| 12 | Heading hierarchy | ✅ One `<h1>`, sectioned `<h2>`s — good | Keep |
| 13 | Content quality | ✅ Real, specific, honest copy ("Honest stays, five-star service"; "Lovina · Singaraja · North Bali") | Keep; it reads human, which Google's helpful-content systems reward |

## What stays exactly as designed

The visual design, typography, color system, section order, photography choices, and the copy's voice. This audit adds an SEO layer *under* the design; it does not redesign anything.

## Definition of done (Phase 1 gate)

1. Disable JavaScript → full page content still renders.
2. [PageSpeed Insights](https://pagespeed.web.dev/) mobile score ≥ 90.
3. [Google Rich Results Test](https://search.google.com/test/rich-results) passes for `LodgingBusiness` and `FAQPage` with zero errors.
4. Every image has alt text; total home-page transfer ≤ ~1.5 MB.
5. `curl` of `/sitemap.xml` and `/robots.txt` returns 200.
6. Side-by-side screenshot vs. `design/annies-villa-landing-page.html` — visually identical.
