# Villa Landing: the design

The default design for a villa, guesthouse or homestay website. It was built for Annie's Villa in Lovina, North Bali, and is meant to be reused for other properties.

Style reference: the "Luxury Villa Website Design" case study on Behance (https://www.behance.net/gallery/249147259/Luxury-Villa-Website-Design). Use it for the feel only: big two-tone Inter headlines, pill buttons with an arrow disc, rounded photos and numbered section labels. Never copy its images or text.

The look in one sentence: white pages, one deep green, large Inter headlines in two tones, pill buttons, photos with 20 px corners, and full-width bands in dark green and pale green.

## Colours

| Token | Hex | Used for | Contrast |
|---|---|---|---|
| `ink` | `#201F22` | Headlines and main text | 16.4:1 on white |
| `ink-muted` | `#5C5C5C` | Body text on white | 6.7:1 on white |
| `ink-subtle` | `#707070` | Second half of two-tone headlines, captions | 4.9:1 on white |
| `line` | `#E4E4E2` | Rules and card borders | n/a |
| `surface` | `#FFFFFF` | Page background | n/a |
| `surface-soft` | `#F4F4F2` | The rooms band | n/a |
| `green` | `#0E3221` | Brand name, buttons, dark bands, big numbers | 14:1 with white |
| `green-deep` | `#0E2218` | Footer | n/a |
| `green-label` | `#2F5D3F` | Uppercase section labels on light bands | 7.6:1 on white |
| `green-soft` | `#EEF2E9` | Garden and booking bands | n/a |
| `green-subtle` | `#6E8E78` | Second half of headlines on `green-soft`, 24 px and up only | 3.2:1 |
| `green-mist` | `#A9C2B0` | Labels and second halves on dark green | 7.4:1 on `green` |
| `on-green` | `#DCE6DF` | Body text on dark green | 11:1 on `green` |
| `hero-accent` | `#CFE0C6` | Second half of the hero headline | 10:1 on `green` |
| `line-on-green` | `#3F5D4B` | Rules on dark green | n/a |
| `line-on-soft` | `#C9D5C2` | Rules on `green-soft` | n/a |

The green carries the brand. Swap `green` for another property only if the photos call for it, and keep it dark enough for white text: at least 4.5:1.

## Type

One family: Inter 400, 500 and 600 from Google Fonts. Every size scales with the screen width.

| Style | Size | Line height | Letter spacing |
|---|---|---|---|
| Hero headline | `clamp(46px, 9vw, 132px)`, weight 500 | 0.92 | -0.045em |
| Section headline | `clamp(40px, 5.5vw, 84px)`, weight 500 | 0.98 | -0.045em |
| About statement | `clamp(32px, 4.4vw, 62px)`, weight 500 | 1.06 | -0.035em |
| Booking headline | `clamp(48px, 9vw, 132px)`, weight 500 | 0.95 | -0.055em |
| Card title | 28 px, weight 500 | normal | -0.02em |
| Body | 16 px (17 px on dark bands) | 1.6 to 1.65 | normal |
| Section label | 13 px uppercase | normal | 0.08em |
| Button | 14 to 16 px, weight 500 | normal | normal |

**Two-tone headlines.** A headline is one sentence in two parts. The first part is in `ink`. The second part completes the thought and goes in `ink-subtle`, or in the matching soft colour on green bands. Example: "Choose your stay. Scroll across →".

**Labels.** Each section opens with a number and a noun, such as "(01) About" or "(02) Stays".

## Layout

- **Side margin:** `clamp(16px, 5.5vw, 80px)`.
- **Widths:** content is at most 1440 px wide. The text inside dark bands is at most 1280 px.
- **Section padding:** `clamp(72px, 10vw, 150px)` at the top and bottom.
- **Grids:** use `repeat(auto-fit, minmax(min(<N>px, 100%), 1fr))`. The `min()` lets a phone drop to one column without spilling sideways.
- **Corners:** 20 px for photos and cards, 999 px for pills. The hero has square edges.
- **Pill button:** text plus an arrow `→` in a 28 to 36 px disc of the opposite colour. With a mouse, hovering widens the gap and turns the disc by 45°.

## Sections, in order

1. **Menu bar.** It sticks to the top. The property name is on the left, five section links sit in the centre, and the green "Check availability" pill is on the right. The links hide at 1000 px wide and below. At 420 px and below the pill reads "Book".
2. **Hero.** Four photos crossfade on a 24 s loop with a slow zoom, under a dark gradient so the text stays readable. Over them sit the location in an outlined pill, the two-tone headline, a white "See the stays" pill and a one-line summary.
3. **(01) About.** A short paragraph on the left and a large two-tone statement on the right.
4. **Marquee.** A dark green band of seven short things guests notice, separated by ✦. It scrolls slowly and pauses on hover.
5. **(02) Stays.** One card per way to stay: a 4:3 photo, a label with the size, a title, one line, the price and a pill. At 1200 px and wider all cards sit in one row and their buttons line up. Below that the cards become a sideways strip with "Scroll across →" in the headline.
6. **(03) Garden** (`green-soft`). A headline, then a photo mosaic in 7 and 5 columns that stacks at 760 px and below, then a row of three plain facts.
7. **(04) Promise** (`green`). A headline, then three ratings and three honest promises. Ratings stay as placeholders until there are screenshots to back them up.
8. **(05) Property.** Four 4:5 photos with captions. The second and fourth sit 48 px lower.
9. **(06) Rooms** (`surface-soft`). A wide 16:9 room photo with a caption, then two bathroom photos and the room facts.
10. **(07) Area.** Four 4:3 photos of nearby places, then the line "Tours and day trips are arranged and priced separately."
11. **Questions.** A numbered list of questions that open and close, next to a 4:5 photo.
12. **(08) Book** (`green-soft`). A very large two-tone headline, three pills (Airbnb, Booking.com, message the family) and the contact line.
13. **Footer** (`green-deep`). The name, a one-line description, two link columns with 44 px rows, and a legal line.

## Motion

- The hero photos crossfade and slowly zoom. The hero text rises in on load.
- Sections fade up as they scroll into view. This uses `animation-timeline: view()` inside `@supports`, so browsers without it simply show the content.
- Hover zoom and lift only apply with a mouse, inside `@media (hover:hover) and (pointer:fine)`. Otherwise they stick after a tap on a phone.
- `prefers-reduced-motion` turns every animation off and shows the first hero photo.

## Rules that keep it working on every screen

These come from testing the Annie's Villa page at 13 widths, from 320 to 2560 px.

- The page wrapper must use `overflow-x: clip`, not `hidden`. With `hidden`, the sticky menu bar scrolls away.
- Add `section[id] { scroll-margin-top: 84px }` so menu links don't land under the bar.
- Every link and button must be at least 44 px tall: menu links get `padding: 13px 0`, and footer links get `min-height: 44px`.
- Give the menu bar no `flex-wrap`. On phones it should hold only the name and one button, about 83 px tall.
- Lazy-load every photo below the hero (`loading="lazy"`).
- Set the hero to `height: min(92vh, 900px); min-height: 620px`.
- Make media-query overrides of inline grid styles `!important`, because inline styles win otherwise.

## Photos

- **Hero:** landscape, ideally 1600 px wide or more. At 1200 px the hero looks soft on monitors 1920 px and wider.
- **Cards:** 4:3 at 900 px wide or more.
- **Tall crops:** 4:5 or 3:4, at 720 px wide or more.
- **Panoramas:** put very wide photos, such as a waterfall strip, in 4:3 cards. Never stretch them into tall cards.
- **Framing:** use `object-position` to keep the subject in frame, for example `50% 62%` for a bed in a portrait photo.
- **Honesty:** use only real photos of the property. When retouching, change only quality, light and colour. Never add lamps, furniture or views that aren't there.

## Words

- Never invent facts. Prices, ratings, distances, reviews, services and contact details stay in brackets until the owner confirms them: `[price]`, `[5.0]`, `[WhatsApp number]`.
- Prices are honest. Anything extra is priced separately and told to the guest before they pay.
- Write short, plain sentences. Describe what a stay is like, not how amazing it is.

## In a Claude Design canvas

- The page is one artboard, `Main.dc.html`, with `"expand": "fill"` and `w` set to 1440.
- A canvas frame can be at most 8000 px tall. This page is about 10,700 px at 1440 px wide, so the canvas preview shows the top part and the full-window view shows the whole page.
- Upload photos as canvas assets and use the `/_blob/<id>` urls they return. Those urls only work inside the canvas they were uploaded to.
- Keep the `<script src="./support.js"></script>` line and the `<script type="text/x-dc" data-dc-script>` block exactly as they are in the template.

## Check before calling it done

- [ ] Nothing scrolls sideways at 320, 360, 390, 414, 768, 834, 1024, 1280, 1366, 1440, 1536, 1920 or 2560 px.
- [ ] The menu bar is at most about 90 px tall and stays at the top after scrolling.
- [ ] Every link and button is at least 44 px tall.
- [ ] The hero text is fully visible on short laptop screens: 1366×657 and 1280×720.
- [ ] Apart from the hero on very large screens, no photo is shown at more than 1.5 times its real pixel size.
- [ ] Every bracketed placeholder is listed for the owner to fill in.
