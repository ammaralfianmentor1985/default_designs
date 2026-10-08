#!/usr/bin/env python3
"""Draw the favicon set: an "A" monogram in the design's deep green (#0E3221) and pale green (#CFE0C6).

  site/favicon.svg          modern browsers (scales to any size)
  site/favicon.ico          16/32/48 px fallback
  site/apple-touch-icon.png 180 px, full-bleed square (iOS rounds the corners itself)

Usage: python3 -I site-src/make_icons.py
"""
import os

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, "..", "site")
GREEN = (14, 50, 33)
PALE = (207, 224, 198)

SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Annie's Villa">
  <rect width="64" height="64" rx="14" fill="#0E3221"/>
  <path d="M18 47 32 17l14 30M23.5 37h17" fill="none" stroke="#CFE0C6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""

# geometry on a 64-unit grid, same as the SVG
POINTS = [(18, 47), (32, 17), (46, 47)]
BAR = [(23.5, 37), (40.5, 37)]
STROKE = 6


def draw(size, rounded):
    s = 16  # supersampling
    big = size * s
    k = big / 64
    im = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if rounded:
        d.rounded_rectangle([0, 0, big - 1, big - 1], radius=14 * k, fill=GREEN)
    else:
        d.rectangle([0, 0, big, big], fill=GREEN)
    # the apple icon is full-bleed, so keep the monogram a little smaller inside it
    zoom = 1 if rounded else 0.82
    off = 32 * (1 - zoom)

    def tx(p):
        return ((p[0] * zoom + off) * k, (p[1] * zoom + off) * k)

    w = STROKE * zoom * k
    for line in (POINTS, BAR):
        pts = [tx(p) for p in line]
        d.line(pts, fill=PALE, width=round(w), joint="curve")
        for x, y in pts:  # round caps
            d.ellipse([x - w / 2, y - w / 2, x + w / 2, y + w / 2], fill=PALE)
    return im.resize((size, size), Image.LANCZOS)


def main():
    os.makedirs(SITE, exist_ok=True)
    with open(os.path.join(SITE, "favicon.svg"), "w", encoding="utf-8") as fh:
        fh.write(SVG)
    draw(180, rounded=False).convert("RGB").save(os.path.join(SITE, "apple-touch-icon.png"), optimize=True)
    base = draw(256, rounded=True)
    base.save(os.path.join(SITE, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote favicon.svg, favicon.ico, apple-touch-icon.png")


if __name__ == "__main__":
    main()
