---
name: villa-landing
description: Builds a villa, guesthouse or homestay website in the green Villa Landing design, as a Claude Design canvas or HTML file. Use for /villa-landing or villa website requests.
argument-hint: "[property name, place, rooms, where the photos are]"
---

# /villa-landing

Build a property's landing page from the template in this folder.

The user's request: $ARGUMENTS

Rules that always apply:

- Follow `DESIGN.md` and keep the template's look.
- Never invent facts. Anything unconfirmed stays in [brackets].
- Use only real photos of the property.
- Check the page at phone, tablet and laptop widths before reporting.

Files in this folder:

- `DESIGN.md`: the design rules. Read it fully before building.
- `template.dc.html`: the page with every fact as a [placeholder] and every photo as a labelled `.ph` block.
- `examples/annies-villa.dc.html`: the finished page for Annie's Villa, for reference. Its `/_blob/…` photo urls only work inside its own canvas, so never reuse them.

## 1. Collect the facts

From the request, attached files and the repository, gather:

- the name, and the town, region and country
- each way to stay: its name, size, bathroom, best feature and price
- whether the whole property can be rented
- extras, such as tours, transport or meals, and how each is priced
- booking links (Airbnb, Booking.com, own site), ratings and where each rating comes from
- contact details (WhatsApp, email)
- nearby places
- the photos

If the name, the location, the ways to stay or the photos are missing, ask for them once, in one short list. Everything else may stay as a [placeholder]. Never invent prices, ratings, distances, reviews, services or contact details, and never write a guest quote nobody gave.

## 2. Choose the photos

- Check every photo's pixel size before placing it, and follow the photo rules in `DESIGN.md`. The hero needs landscape photos, ideally 1600 px wide or more.
- Give each section the photo that shows what its text says: rooms on stay cards, bathrooms in the rooms band, nearby places in the area section.
- Never stretch a panorama into a tall frame. Use `object-position` to keep the subject in frame.
- Use only real photos of the property. If a photo was retouched, check that nothing was added that isn't there.

## 3. Build the page

- Start from `template.dc.html`. Keep its CSS, structure and class names.
- Replace every [placeholder] you have a confirmed fact for. Leave the rest in brackets.
- Replace each `<div class="ph">…</div>` with `<img src="…" alt="…" loading="lazy">`. Hero photos are the exception and load without `loading="lazy"`.
- Add or remove stay cards and questions to match the property. Keep the section order and number the labels in order: (01), (02) and so on.
- If the property has no garden, pool or bungalow, retitle or drop that section rather than describing something that isn't there.
- Keep every headline in the two-tone pattern from `DESIGN.md`.
- Use the deep green `#0E3221` unless the owner asks for another colour. A replacement colour must keep white text at 4.5:1 or better.

## 4. Deliver

- **As a Claude Design canvas** (preferred when the Artifact tool offers the Design type). Create one canvas named after the property. Upload the photos as canvas assets and use the `/_blob/<id>` urls the upload returns. Put the page in `project/Main.dc.html` with `"expand": "fill"`, `w` 1440 and `h` 8000, which is the canvas maximum. Follow the Design type's own instructions for the files and the publish call.
- **As an HTML file** (no Design type available, or the user asks for a file):
  - Move the `<helmet>` contents into `<head>`.
  - Remove `<x-dc>`, the `support.js` line and the `data-dc-script` block.
  - Add `<meta name="viewport" content="width=device-width, initial-scale=1">`.
  - Point images at relative paths.

## 5. Check

Run the checklist at the end of `DESIGN.md`. If Playwright or another browser is available, render the page at all 13 widths and at 1366×657 and 1280×720, and look at the screenshots. Fix anything that fails before reporting.

## 6. Report back

Keep it short:

- the link or the file
- every [placeholder] still on the page, grouped by what the owner needs to supply
- photos that are too small or don't match their section
- anything you assumed
- what you checked, and what you couldn't check, such as Safari or a real phone
