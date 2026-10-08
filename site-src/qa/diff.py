"""Compare ref-W.png with new-W.png for every width in a folder (written by parity.mjs).

  python3 -I site-src/qa/diff.py <dir> [threshold=8]

Prints the share of pixels that differ by more than `threshold` (0-255) and where; writes diff-W.png (differences in red).
Needs Pillow and numpy.
"""
import os
import re
import sys

import numpy as np
from PIL import Image

d = sys.argv[1]
thr = int(sys.argv[2]) if len(sys.argv) > 2 else 8
widths = sorted(int(m.group(1)) for f in os.listdir(d) if (m := re.match(r"ref-(\d+)\.png$", f)))
worst = 0.0
for w in widths:
    a = np.asarray(Image.open(f"{d}/ref-{w}.png").convert("RGB")).astype(np.int16)
    b = np.asarray(Image.open(f"{d}/new-{w}.png").convert("RGB")).astype(np.int16)
    note = ""
    if a.shape != b.shape:
        note = f"  SIZE DIFFERS design={a.shape[1]}x{a.shape[0]} converted={b.shape[1]}x{b.shape[0]}"
        h = min(a.shape[0], b.shape[0])
        a, b = a[:h], b[:h]
    diff = np.abs(a - b).max(axis=2) > thr
    pct = 100.0 * diff.sum() / diff.size
    worst = max(worst, pct)
    rows = np.where(diff.any(axis=1))[0]
    bands = []
    if len(rows):
        start = prev = rows[0]
        for r in rows[1:]:
            if r - prev > 12:
                bands.append((start, prev))
                start = r
            prev = r
        bands.append((start, prev))
    print(f"{w:5d}px  differing pixels {pct:6.3f}%  regions {len(bands)}{note}")
    for s, e in bands[:6]:
        cols = np.where(diff[s:e + 1].any(axis=0))[0]
        print(f"        rows {s}-{e}  columns {cols.min()}-{cols.max()}")
    if diff.any():
        out = b.astype(np.uint8).copy()
        out[diff] = [255, 0, 0]
        Image.fromarray(out).save(f"{d}/diff-{w}.png")
print("worst", round(worst, 3), "%")
sys.exit(1 if worst > 0 else 0)
