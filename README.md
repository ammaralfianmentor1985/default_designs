# Annie's Villa & Laviana Bungalow — Website & SEO

Working repository for the website of **Annie's Villa & Laviana Bungalow**, a garden villa property with a 16 m pool in Lovina, Singaraja, North Bali (Airbnb Superhost · Guest Favorite · [listing](https://www.airbnb.com/rooms/31995942)).

**Goal:** make the property findable on Google and convert searches into direct bookings. Full program: [`seo/SEO_PLAN.md`](seo/SEO_PLAN.md).

## Repository map

| Path | What it is |
|---|---|
| `*.jpg` / `*.png` (repo root) | Original property & listing photos (~130, untouched masters) |
| `design/annies-villa-landing-page.html` | The approved landing-page design (Claude artifact export — see `seo/landing-page-audit.md` before using) |
| `seo/SEO_PLAN.md` | The 5-phase SEO roadmap, team, and timeline |
| `seo/landing-page-audit.md` | Technical audit of the design + Phase 1 definition of done |
| `seo/site-structure.md` | Page-by-page website blueprint (Web Engineer's spec) |
| `seo/keyword-map.md` | Target keywords by tier |
| `seo/content-calendar.md` | First 10 content pieces |
| `seo/domain-shortlist.md` | Domain to buy + brand naming decision |
| `seo/owner-checklist.md` | **Start here** — the owner's action list |
| `seo/agent-briefs/` | Paste-ready kickoff prompts for the Web Engineer and Content Writer chats |
| `site/` | (Phase 1) The deployable website — created by the Web Engineer |

## How work happens

Three Claude chats on this repo: **SEO Manager** (strategy, reviews, monthly reports — the session that authored `seo/`), **Web Engineer** (builds & deploys, brief in `seo/agent-briefs/web-engineer.md`), **Content Writer** (guides, brief in `seo/agent-briefs/content-writer.md`). Each change arrives as a PR for the owner to merge.
