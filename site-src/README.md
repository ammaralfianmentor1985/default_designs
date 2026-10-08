# Website source — `site-src/` builds `site/`

The website for **Annie's Villa & Laviana Bungalow** is plain static HTML in `site/`. GitHub Pages publishes that
folder. The HTML is generated from this folder so that the header, footer, SEO tags, structured data and the
domain name are defined once.

- No JavaScript on any page. All content is in the HTML.
- The design is the approved landing page (`design/annies-villa-landing-page.html`), converted without changes to
  layout, type, colour or order. The converted page is pixel-identical to it (see "Checked against the design").
- Until the domain is bought the site runs in **staging mode**: every page says `noindex` and `robots.txt` blocks everything.

## What is where

| Path | What it is |
|---|---|
| `site/` | The published website. Generated: do not edit by hand (CI fails if it drifts from the generator). |
| `site-src/config.json` | Facts (phone, address, prices, review counts), the base URL and the **staging switch**. |
| `site-src/pages/*.mjs` | One file per page: its wording, images and structured data. `pages/index.mjs` lists the pages. |
| `site-src/lib/` | Shared pieces: `<head>` and SEO tags, header, footer, JSON-LD builders, the audit checks. |
| `site-src/css/site.css` | The design, as named classes (`.hero`, `.pill`, `.card`, `.split`, ...). Built to `site/assets/css/site.css`. |
| `site-src/images/` | `catalog.json` (every image, its source and alt text), `build_images.py`, the five masters. |
| `site-src/make_icons.py` | Draws the favicon set. |
| `.github/workflows/pages.yml` | Publishes `site/` to GitHub Pages when it changes on `main`. |
| `.github/workflows/site-check.yml` | Runs `build.mjs --check` on every pull request that touches the site. |

## Everyday commands

```bash
node site-src/build.mjs            # rebuild site/ and print what is still unconfirmed
node site-src/build.mjs --check    # what CI runs: is site/ up to date, and do all audit checks pass?
python3 -I site-src/images/build_images.py   # after adding or changing an image in catalog.json
```

Node 18 or newer. Python 3 with Pillow is only needed for images and icons. Commit `site-src/` and `site/` together.

## Editing

- **A fact** (phone, price, review count, check-in time, link): change it in `config.json`, rebuild.
- **Wording on a page**: edit `site-src/pages/<page>.mjs`, rebuild.
- **A new page**: create `site-src/pages/<name>.mjs` (copy a small one such as `location.mjs`), add it to
  `site-src/pages/index.mjs`, rebuild. The sitemap, canonical, Open Graph tags and the audit checks pick it up.
- **A new photo**: copy it anywhere in the repo, add an entry to `site-src/images/catalog.json` (descriptive `id` such
  as `annies-villa-lovina-pool-dusk`, honest `alt`), run `build_images.py`, then use `c.picture('<id>', { alt, sizes })`.
  Every image is written as WebP plus a JPEG fallback, at most 250 KB (heroes 400 KB), with width and height set.
  Use the original at full size; metadata (including GPS) is dropped when it is re-encoded.
- **Never invent a fact.** If something is not confirmed, leave it `null` in `config.json`. The build keeps it out of
  the structured data, keeps the design's `[placeholder]` on the page where the design had one, and lists it.

### Placeholders

`[price]`, `[Answer, confirmed by the family.]` and similar are the design's own markers. Each one is tagged in the
HTML (`data-fill="..."`) and listed at the end of every build. In staging they are allowed. Once `staging` is `false`
the build **fails** while any is left, so an unfinished page cannot go live by accident.

## Staging mode and going live

Staging (now) is what `"staging": true` in `config.json` does:

- `<meta name="robots" content="noindex">` on every page
- `robots.txt` says `Disallow: /` and has no sitemap line
- `baseUrl` is the free GitHub address, `https://ammaralfianmentor1985.github.io/default_designs`

Note: search engines only read `robots.txt` at the root of a host. On the `github.io` project address it is not read,
so the `noindex` tags are what keep the pages out of search. On the real domain `robots.txt` is read normally.

All internal links are relative, so the same files work under `/default_designs/` and at the root of the domain.
Canonical tags, Open Graph tags, JSON-LD and the sitemap use `baseUrl`, which is the only place the address is set.

### Go-live checklist (one small pull request)

1. **Owner:** buy the domain (see `seo/domain-shortlist.md`, planned: `anniesvillalovina.com`).
2. **Owner:** answer the open questions so no `[placeholder]` is left (the build lists them).
3. In `site-src/config.json` set `"baseUrl": "https://<domain>"`, `"customDomain": "<domain>"`, `"staging": false`.
4. Run `node site-src/build.mjs`. It writes `site/CNAME`, removes `noindex`, opens `robots.txt` and adds the sitemap line.
   It refuses to finish while a placeholder is left. Commit `site-src/` and `site/`, merge.
5. **GitHub:** Settings > Pages > Custom domain: enter the domain, save, then tick **Enforce HTTPS** once the check passes.
6. **Registrar DNS** (check GitHub's "Managing a custom domain" page before pasting; these are the published addresses):

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (four records) |
   | AAAA (optional) | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | CNAME | `www` | `ammaralfianmentor1985.github.io` |

7. **Google Search Console:** add the domain property, verify with the DNS record it shows, submit
   `https://<domain>/sitemap.xml`, request indexing for the home page.
8. Add the website link to the Google Business Profile, the Airbnb listings and the Instagram bio.

## One-time GitHub setting (owner)

`.github/workflows/pages.yml` publishes `site/`, but a repository owner has to switch Pages on once:
**Settings > Pages > Build and deployment > Source: GitHub Actions.** The first run after merging fails until this is
done; then open the **Actions** tab, choose **Deploy site to GitHub Pages** and **Run workflow**. The staging address is
`https://ammaralfianmentor1985.github.io/default_designs/`.

## Checked against the design

- `node site-src/build.mjs --design-parity <dir>` writes the home page with the design's own wording and links.
  Rendered next to the original design at 320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 px (images hidden) it
  differs in **0.000 %** of pixels, with identical page heights at every width.
- The live version differs from the design only where the brief asks for it: navigation and footer link to the real
  pages, buttons go to WhatsApp and Airbnb, the "Choose your stay" cards name the units and link to their pages,
  confirmed facts replace placeholders (rating, review count, WhatsApp number, year), and a few quiet text links
  were added (More about Lovina, More questions and answers).
- Not changed on purpose: the header has no menu button on phones, exactly like the design (links are in the footer
  and in the page content). Adding one would be a design decision for the owner.

## Optional test tools

`site-src/qa/` has the scripts used to check the site: a static server that behaves like GitHub Pages (including a
`/default_designs/` sub-path), the pixel-parity comparison, a no-JavaScript check and the Lighthouse runner. They
need Playwright and Lighthouse installed; see `site-src/qa/README.md`.
