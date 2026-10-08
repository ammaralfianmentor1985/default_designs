# Owner Checklist — the tasks only you can do

Updated 2025-10-08 after the owner's answers. ✅ = done · ⏳ = later, by owner's choice.

## A. Property facts — ✅ ANSWERED (single source of truth)

| Fact | Value |
|---|---|
| Host | Juliani ("Ani") — Airbnb Superhost, 8 years, identity verified; speaks English, Indonesian, Malay |
| Trust signals | **165 reviews, 5.0★** on Airbnb (Annie Villa room listing: 93 reviews 5.0★ · Laviana Bungalow entire-place listing: 72 reviews 5.0★) |
| WhatsApp (bookings) | **+62 812-388-3439** → `https://wa.me/628123883439` |
| Address (public) | Jalan Laviana No. 8, Banyualit, Kalibukbuk, Lovina, Singaraja, Bali (postcode likely 81152 — confirm) |
| Map | https://maps.app.goo.gl/fYGfdKSeuuMvpfvB6 (engineer extracts exact coordinates from this link) |
| Airbnb | Host profile: https://www.airbnb.com/users/profile/1463271766396267063 · Laviana Bungalow: https://www.airbnb.com/rooms/31995942 (Annie Villa room listing URL: grab from host profile when building) |
| Units | Small Room 5×6 m · Large Room 7×8 m (Annie's Villa) · Laviana Bungalow (entire place) · **whole property for long stays (6 months–3 years) — must be offered on the site** |
| Check-in / out | 14:00 / 12:00 |
| Airport pickup | Arranged by WhatsApp, ~IDR 600,000 |
| Prices | Current listed prices are correct; final numbers confirmed with owner at build time (site shows "from IDR …") |
| Instagram | @laviana_bungalow (not active — link it anyway; revive later) |
| Facebook | none |
| Brand spelling | Website brand: **Annie's Villa** (as designed); Airbnb spells it "Annie Villa" → schema `alternateName` so both match in search |

## B. Domain — ⏳ DEFERRED (owner's choice: buy when everything is ready)

No problem for the build: the site deploys to a free GitHub staging URL marked **noindex** (invisible to Google) until you buy the domain. When you're ready, follow `domain-shortlist.md` (10 minutes), tell the engineer chat, and it flips staging → live.
⚠️ Google only starts ranking the site after the domain is live — the 2–6-week clock starts then.

## C. Google Business Profile — ✅ EXISTS (verified, with reviews) → optimize later

Great news — the hardest part is done. Remaining, when the site is live:
- [ ] Tell the SEO Manager chat the **exact business name** as it appears on Google Maps (so the website uses the identical name)
- [ ] Add the website link to the profile (Edit profile → Website)
- [ ] Upload 15–20 best photos from this repo; check categories (Villa / Guest house) and hours
- [ ] Keep asking guests for Google reviews (section E)

## D. Search Console — ⏳ after the domain is live

The engineer hands you one DNS record to paste and one Verify button to click. 5 minutes, nothing more.

## E. Reviews & links routine — ⏳ ongoing, starts after launch

- [ ] SEO Manager drafts a 2-line WhatsApp message with your Google review link; send it to happy guests at checkout
- [ ] Add the website link to the Airbnb listings/profile and the @laviana_bungalow Instagram bio

## F. How to start the worker chats — SIMPLE STEPS

**Start the Web Engineer (do this when you want the website built):**
1. Open the Claude app → start a **new chat** on this repository (`default_designs`) — the same way you started this one.
2. In the model selector choose **Sonnet**.
3. Open the file `seo/agent-briefs/web-engineer.md` (in GitHub or the Claude app) and **copy all of it**.
4. **Paste it as the first message** and send. That's the whole job — the engineer knows everything from the brief and starts working. It will only ask you for things it truly can't find.
5. When it opens a Pull Request, come back to **this chat** and say "review the engineer's PR" — I check it before you press Merge.

**Start the Content Writer:** same 5 steps, but paste `seo/agent-briefs/content-writer.md` — and only **after** the website is live.

**This chat (SEO Manager):** keep it for questions, reviews of the others' work, and monthly reports. You never need to re-explain anything — it's all in `seo/`.
