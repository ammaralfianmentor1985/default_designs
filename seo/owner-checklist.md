# Owner Checklist — the tasks only you can do

Everything here is free except the domain (~US$12/yr). Items marked 🔑 block the phases listed next to them. Do them in order; each takes minutes except GBP verification (Google may take days to send the code).

## A. Information I still need (answer in the SEO Manager chat) — 🔑 blocks Phase 1

- [ ] WhatsApp number for bookings (becomes the wa.me booking button — currently a placeholder in the design)
- [ ] Exact address line for public display (I have: Jalan Laviana No. 8, Banyualit, Kalibukbuk, Lovina, Singaraja, Bali 81152 — confirm or correct)
- [ ] Google Maps pin / coordinates of the property (open Google Maps, long-press on the villa, copy the two numbers)
- [ ] The Airbnb listing URL for **Annie's Villa** (I found Laviana Bungalow: airbnb.com/rooms/31995942 — is Annie's Villa a separate listing? Link please)
- [ ] Unit names & count (how many rooms in Annie's Villa? Is Laviana Bungalow one whole-place unit?)
- [ ] Price range per night per unit (shown as a range on the site + schema, e.g. "from IDR 450k / ~$30")
- [ ] Check-in/out times, breakfast price, airport pickup price (for FAQ)
- [ ] Any Instagram/Facebook pages for the villa (links)

## B. Buy the domain — 🔑 blocks Phase 1 deploy

- [ ] Follow `domain-shortlist.md` → buy **anniesvillalovina.com** (or next available), auto-renew ON
- [ ] Tell the Web Engineer chat the domain + registrar; it will hand you the DNS records to paste

## C. Google Business Profile — 🔑 blocks Phase 2 (biggest single lever — do not skip)

1. [ ] Go to https://business.google.com → "Add your business"
2. [ ] Name: **Annie's Villa Lovina** (exactly — no extra keywords, Google suspends stuffed names)
3. [ ] Category: **Villa** (add "Guest house" as secondary)
4. [ ] Address: the confirmed address from section A; drag the map pin precisely onto the property
5. [ ] Phone: the WhatsApp number · Website: the new domain
6. [ ] Verification: Google offers video/phone/postcard — postcard to Bali can take ~2 weeks; prefer video verification if offered (walk around the property filming per instructions)
7. [ ] After verification: upload 15–20 of the best photos from this repo, set amenities, opening hours "Open 24 hours" (hotels), and write the description (the SEO Manager chat will draft it)
8. [ ] From now on: ask every happy guest for a **Google review** (section E)

## D. Search Console (after the site is live) — Phase 2

- [ ] Web Engineer chat will give you a link https://search.google.com/search-console → "Add property" → Domain → paste one DNS record at the registrar (engineer provides it) → click Verify
- [ ] Then the engineer submits the sitemap; nothing else for you to do

## E. Reviews & links routine — Phase 4, ongoing

- [ ] WhatsApp template to past + future guests (SEO Manager will draft, ~2 lines + your Google review link from GBP)
- [ ] Add the website link to: Airbnb listing description & host profile, Instagram/Facebook bio, WhatsApp Business catalog
- [ ] Target: 10 Google reviews in the first 2 months (you have 8 years of Airbnb guests to ask)

## F. Creating the two worker chats (when ready to start Phase 1)

1. [ ] New chat on this repo → set model to **Sonnet** → paste the whole of `seo/agent-briefs/web-engineer.md`
2. [ ] When Phase 1's PR is merged and the site is live: new chat on this repo → **Sonnet** → paste `seo/agent-briefs/content-writer.md`
3. [ ] Keep using the SEO Manager chat (the one that wrote these documents) for questions, reviews, and monthly reports
