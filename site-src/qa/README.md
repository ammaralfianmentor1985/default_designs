# Test tools

Optional scripts that check the website the way the Phase 1 definition of done (`seo/landing-page-audit.md`) asks.
None of them is needed to build or publish the site; `node site-src/build.mjs --check` (also run by CI) covers the
checks that need no browser.

They need [Playwright](https://playwright.dev) (Node) and, for `diff.py`, Python with Pillow and numpy. If
`import 'playwright'` does not resolve, point `PLAYWRIGHT_PATH` at it
(Claude Code cloud sessions: `export PLAYWRIGHT_PATH=/opt/node-tools/node_modules/playwright`).

```bash
node site-src/qa/serve.mjs            # http://localhost:8802/default_designs/  (behaves like GitHub Pages)
```

| Script | Question it answers | Expected |
|---|---|---|
| `nojs.mjs <url>` | Does every page render with JavaScript off? | `ok` on every page, `scripts=0` |
| `widths.mjs <url>` | Any horizontal scroll, broken image or console error from 320 to 2560 px? | none, 13 widths x 6 pages |
| `parity.mjs` + `diff.py` | Is the converted home page pixel-identical to the approved design? | `0.000 %` in `layout` mode at all nine widths |
| `lighthouse.sh` + `lighthouse-report.mjs` | Performance, accessibility, best practices, SEO (mobile, simulated Slow 4G) | see below |
| `validate-jsonld.mjs` | Is every JSON-LD block valid against the schema.org vocabulary? | `0 errors, 0 warnings` |

## Pixel parity with the design

```bash
node site-src/build.mjs --design-parity /tmp/parity-site     # home page with the design's own wording and links
cp -r site/assets site/images /tmp/parity-site/
node site-src/qa/serve.mjs /tmp/parity-site 8801 ''            # http://localhost:8801/
node site-src/qa/parity.mjs design/annies-villa-landing-page.html http://localhost:8801/ /tmp/parity-out layout
python3 -I site-src/qa/diff.py /tmp/parity-out
```

(`design/annies-villa-landing-page.html` is in the SEO program branch.) Use mode `real` to keep the photographs; then
only image re-encoding noise remains (mean difference below 1.5 of 255). Full-page captures need images that are
already painted; that is why `lib.mjs` loads every image and scrolls once before capturing.

## Structured data

Google's Rich Results Test needs a public URL and a browser session, so it cannot run from a build script. Run it on
the live address (`https://search.google.com/test/rich-results`) for the home page (LodgingBusiness) and `/faq/`
(FAQPage). `validate-jsonld.mjs` is the part that can be automated: it checks every type, property and value type
against the official vocabulary.

```bash
curl -sSL -o /tmp/schemaorg.jsonld https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/29.0/schemaorg-current-https.jsonld
node site-src/qa/validate-jsonld.mjs /tmp/schemaorg.jsonld site
```

## Lighthouse

```bash
npm install --prefix /tmp/lh lighthouse@12
LIGHTHOUSE=/tmp/lh/node_modules/.bin/lighthouse CHROME_PATH=/path/to/chrome \
  site-src/qa/lighthouse.sh http://localhost:8802/default_designs 3 /tmp/lh-runs
node site-src/qa/lighthouse-report.mjs /tmp/lh-runs
```

While staging, every page says `noindex`, so the SEO score is 66 (`is-crawlable` fails, as intended). A live-mode build
scores 100.
