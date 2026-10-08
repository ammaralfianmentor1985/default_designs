# SEO Program — Annie's Villa & Laviana Bungalow

**Property:** Annie's Villa & Laviana Bungalow — same property, separate units, Jalan Laviana, Banyualit / Kalibukbuk, Lovina, Singaraja, North Bali, Indonesia
**Goal:** be findable on Google — first for branded searches ("Annie's Villa Lovina", "Laviana Bungalow"), then for trip-planning searches ("villa near Banjar hot springs", "family villa Lovina") — and convert that visibility into direct bookings (no ~15% OTA commission).
**Owner:** ammaralfianmentor1985 · **SEO Manager:** Claude (this repo's manager session)

## Why we are invisible today (diagnosis, Oct 2025)

1. **No website of our own exists.** Google has nothing owned to rank — only the Airbnb listing ([airbnb.com/rooms/31995942](https://www.airbnb.com/rooms/31995942)) and OTA aggregator noise.
2. **"Annie's Villa" barely appears at all** — only localized Airbnb mirror pages (es.airbnb.com etc.) surface it.
3. **Name collision:** "The Laviana Hotel" is a *different business* on the same street and absorbs searches for "Laviana".
4. **Google Business Profile exists and is verified, with Google reviews** (confirmed by owner) — but it has no website to send searchers to, and its exact listing name still needs to be matched to the site brand.
5. Strong unused assets: Airbnb **Superhost Juliani ("Ani"), 8 years, 165 reviews at 5.0★** (Annie Villa room listing: 93 · Laviana Bungalow entire-place: 72), **Guest Favorite** badge, ~130 quality photos (in this repo), prime location near Lovina Beach & Banjar Holy Hot Springs, and a finished landing-page design (`design/annies-villa-landing-page.html`).

## Strategy

Deploy the existing design as a fast, SEO-ready website and link it from the already-verified Google Business Profile. Branded searches are winnable in weeks once the domain is live; long-tail content compounds over months. Extra revenue angle confirmed by the owner: a **long-term rental page** (whole property, 6 months–3 years) targeting near-zero-competition keywords like "long term rental Lovina". We do **not** fight Airbnb/Booking for head terms like "Lovina villa" — we win the searches where a real property beats an aggregator: brand, map, neighborhood, and specific questions.

---

## Phases, tasks, and owners

### Phase 0 — Strategy documents ✅ (this commit)
All documents in this `seo/` folder. Read `owner-checklist.md` first.

### Phase 1 — SEO retrofit + deploy (week 1–2) — **Web Engineer chat** (Sonnet)
Blueprint: `site-structure.md` + `landing-page-audit.md`. Summary:
- [ ] Convert `design/annies-villa-landing-page.html` (3.8 MB JS self-unpacking artifact bundle) into clean static HTML — **pixel-identical design**
- [ ] Extract embedded images → real optimized files; rename repo photos from UUIDs to descriptive names (`annies-villa-lovina-pool.jpg`); move into `site/images/`
- [ ] Per-page `<title>`, meta description, canonical, Open Graph tags
- [ ] JSON-LD: `LodgingBusiness` (+ `VacationRental` per unit) and `FAQPage`
- [ ] Descriptive `alt` on every image
- [ ] Add **Laviana Bungalow** unit page (the current design never mentions Laviana — one of our two brand searches has no landing target)
- [ ] Add **/long-term/** page (whole-property stays, 6 months–3 years, WhatsApp inquiry)
- [ ] `sitemap.xml`, `robots.txt`, 404 page, favicon
- [ ] Deploy on **GitHub Pages** as **staging (noindex)** — domain purchase is deferred by the owner; a small "go-live" PR removes noindex + connects the domain + HTTPS when it's bought
- [ ] Target: PageSpeed Insights mobile ≥ 90; content fully visible with JavaScript disabled

### Phase 2 — Google plumbing (after go-live) — **Owner + SEO Manager**
Steps with instructions in `owner-checklist.md`:
- [x] Google Business Profile exists & verified (owner confirmed) → remaining: confirm its exact listing name, add the website link, refresh photos/categories
- [ ] Google **Search Console**: verify domain, submit sitemap, request indexing of core pages
- [ ] Bing Webmaster Tools (free import from GSC)
- [ ] Add the website link to the Airbnb listing/host profile, WhatsApp Business, socials
- [ ] Identical Name–Address–Phone everywhere

### Phase 3 — Content engine (weeks 3–8, ongoing) — **Content Writer chat** (Sonnet)
Plan: `content-calendar.md` + `keyword-map.md`. 1–2 pieces/week, English first; Indonesian versions later.

### Phase 4 — Authority & local SEO (ongoing) — **SEO Manager + Owner**
- [ ] Google reviews funnel: message past/current guests; QR card at the villa
- [ ] Listings/citations: TripAdvisor, bali.com, local tourism directories — same NAP
- [ ] Social profiles link to the site
- [ ] Brand hygiene: always "Annie's Villa Lovina" / "Laviana Bungalow at Annie's Villa" to separate from "The Laviana Hotel"

### Phase 5 — Measure & iterate (monthly) — **SEO Manager (this session)**
- [ ] Monthly GSC review: queries, impressions, clicks, positions → next content/fix decisions
- [ ] Rank spot-checks on target keywords; GBP insights (calls, direction requests)

## Success criteria & honest timeline

Note: the ranking clock starts when the **custom domain goes live** (owner is buying it later; until then the site sits on a hidden staging URL).

| Milestone | When (after site live on the domain + GBP linked) |
|---|---|
| "Annie's Villa Lovina" / "Laviana Bungalow" on page 1 | ~2–6 weeks |
| Appearing in Google Maps local pack for "villa lovina" area searches | 1–2 months |
| Long-tail content traffic ("villa near Banjar hot springs") | 3–6 months |
| Outranking Airbnb/Booking on "Lovina villa" | Not the goal — OTAs usually win head terms |

**Costs:** domain ~US$12/yr · GitHub Pages hosting $0 · Google Business Profile $0 · no paid tools to start.

## Team (chats) & models

| Chat | Job | Model |
|---|---|---|
| SEO Manager — the existing session that produced this plan | Strategy, audits, keyword research, reviews others' work, monthly reports, GBP guidance | Fable (or Opus) |
| Web Engineer — new chat on this repo | Phase 1 build & deploy | Sonnet |
| Content Writer — new chat on this repo | Phase 3 content | Sonnet (Haiku for bulk mechanical tasks, reviewed) |

Paste-ready kickoff prompts: `agent-briefs/web-engineer.md`, `agent-briefs/content-writer.md`.
