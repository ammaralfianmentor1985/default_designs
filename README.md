# default_designs

Ready-made website designs that Claude can reuse. Each design comes with its own command: type the command, describe the property, and Claude builds a new page in that design.

## Designs

| Command | What it builds | Built first for |
|---|---|---|
| `/villa-landing` | A one-page website for a villa, guesthouse or homestay: white pages with one deep green, big two-tone headlines, round buttons and photo-led sections. It works on phones, tablets and laptops. | Annie's Villa, Lovina, North Bali |

## How to use `/villa-landing`

Start a Claude Code session on this repository, then type the command followed by what you know about the property. For example:

```
/villa-landing Sunset Homestay in Amed, Bali. Three rooms, one pool, run by Made. The photos are in the photos folder.
```

Claude will then:

1. Ask in one short list for anything it can't build without, such as the rooms or the photos.
2. Build the page from the template. Anything you haven't confirmed, such as prices, ratings or a WhatsApp number, stays in [brackets].
3. Put the page on a Claude Design canvas so you can view it and share it, or save it as an HTML file.
4. Check it at phone, tablet and laptop sizes, then list what is still in brackets.

The more you tell it, the fewer brackets are left. Useful details:

- the name, town and region
- each room: its name, size, bathroom, best feature and price
- whether guests can rent the whole property
- extras, such as tours, and how they are priced
- Airbnb and Booking.com links, ratings, and a WhatsApp number or email
- nearby places worth showing
- where the photos are

## What's in the folder

| File | What it is |
|---|---|
| `.claude/skills/villa-landing/SKILL.md` | The command: the steps Claude follows. |
| `.claude/skills/villa-landing/DESIGN.md` | The design rules: colours, fonts, sections, phone and laptop rules, and photo rules. |
| `.claude/skills/villa-landing/template.dc.html` | The page with [placeholders], ready for a Claude Design canvas. |
| `.claude/skills/villa-landing/examples/annies-villa.dc.html` | The finished Annie's Villa page. Its photo links only work inside its own canvas. |

## Using it in Claude Design

Claude Design doesn't read this repository. It uses design systems instead. Your "Luxury Villa Design System" on claude.ai now has the same colours and rules as this design. If you set it as your default design system, new Design canvases start from this look without a command.

## Adding another design

1. Copy the folder `.claude/skills/villa-landing` to `.claude/skills/<new-name>`, using lowercase letters and hyphens.
2. In the new `SKILL.md`, change `name` to the new name and rewrite `description`.
3. Replace `DESIGN.md`, the template and the example with the new design.
4. Add a row to the table at the top of this file.

## This repository is public

Anyone can see what is in it. Keep guest photos, phone numbers and private documents out of it.
