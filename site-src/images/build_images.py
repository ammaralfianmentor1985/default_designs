#!/usr/bin/env python3
"""Build the website images from site-src/images/catalog.json.

For every catalogue entry this writes responsive WebP and JPEG files into
site/images/ and records their sizes in site-src/images/manifest.json (the page
generator reads that file to build <picture> elements with width/height).

  WebP : 480, 800 and 1040 px and the original width (never upscaled; 1040 serves a 390 px phone at 2.6x)
  JPEG : 800 px and the original width (fallback for very old browsers)

Rules (see seo/site-structure.md, "Image conventions"):
  - the originals in the repository root are never modified
  - EXIF/GPS metadata is dropped (images are re-encoded from pixels)
  - every file is at most 250 KB (hero images at most 400 KB); quality is
    lowered in steps until the file fits

Usage:  python3 -I site-src/images/build_images.py
Needs:  Pillow with WebP support.
"""
import json
import os
import sys

from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "site", "images")

WEBP_QUALITY = 74
JPEG_QUALITY = 78
MIN_QUALITY = 55


def save_within_budget(im, path, fmt, quality, budget):
    """Save `im`, lowering quality until the file is within `budget` bytes."""
    q = quality
    while True:
        if fmt == "WEBP":
            im.save(path, "WEBP", quality=q, method=6)
        else:
            im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
        size = os.path.getsize(path)
        if size <= budget or q <= MIN_QUALITY:
            return q, size
        q -= 4


def main():
    with open(os.path.join(HERE, "catalog.json"), encoding="utf-8") as fh:
        catalog = json.load(fh)
    limits = catalog["limits"]
    os.makedirs(OUT, exist_ok=True)

    # start clean so renamed or removed images do not linger in site/images
    for name in os.listdir(OUT):
        if name.endswith((".webp", ".jpg")):
            os.remove(os.path.join(OUT, name))

    manifest = {}
    over_budget = []
    for item in catalog["images"]:
        src = os.path.join(ROOT, item["src"])
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        if item.get("crop"):
            im = im.crop(tuple(item["crop"]))
        native_w, native_h = im.size
        budget = (limits["hero_kb"] if item.get("hero") else limits["default_kb"]) * 1024

        if item.get("single"):
            webp_widths = []
            jpg_widths = [native_w]
        else:
            webp_widths = sorted({w for w in (480, 800, 1040, native_w) if w <= native_w})
            jpg_widths = sorted({w for w in (800, native_w) if w <= native_w})
        if item.get("jpeg_only"):
            webp_widths = []

        entry = {"w": native_w, "h": native_h, "alt": item.get("alt", ""), "webp": [], "jpg": []}

        def variant(width):
            if width == native_w:
                return im
            height = round(native_h * width / native_w)
            return im.resize((width, height), Image.LANCZOS)

        for fmt, widths, ext, quality in (
            ("WEBP", webp_widths, "webp", WEBP_QUALITY),
            ("JPEG", jpg_widths, "jpg", JPEG_QUALITY),
        ):
            for width in widths:
                v = variant(width)
                path = os.path.join(OUT, "%s-%d.%s" % (item["id"], width, ext))
                q, size = save_within_budget(v, path, fmt, quality, budget)
                if size > budget:
                    over_budget.append((os.path.basename(path), size))
                entry[ext].append({"w": v.width, "h": v.height, "bytes": size, "q": q})
        manifest[item["id"]] = entry
        print("%-48s %4dx%-4d  webp %s  jpg %s" % (
            item["id"], native_w, native_h,
            ",".join("%d:%dK" % (e["w"], e["bytes"] // 1024) for e in entry["webp"]) or "-",
            ",".join("%d:%dK" % (e["w"], e["bytes"] // 1024) for e in entry["jpg"]) or "-",
        ))

    with open(os.path.join(HERE, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=1, sort_keys=True)
        fh.write("\n")

    total = sum(os.path.getsize(os.path.join(OUT, n)) for n in os.listdir(OUT))
    print("\n%d images, %d files, %.1f MB in site/images" % (len(manifest), len(os.listdir(OUT)), total / 1048576))
    if over_budget:
        print("OVER BUDGET:", over_budget)
        sys.exit(1)


if __name__ == "__main__":
    main()
