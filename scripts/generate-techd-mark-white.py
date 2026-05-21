#!/usr/bin/env python3
"""
Generate a white version of the TechD gear mark for use on colored surfaces
(e.g., the chat launcher button).

Reads:  src/assets/brand/techd-gear.png
Writes: src/assets/brand/techd-mark-white.png

Recolors every non-transparent pixel to pure white, preserving the original
alpha so antialiased edges stay smooth. Then trims to bounding box.
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "brand" / "techd-gear.png"
OUT = ROOT / "src" / "assets" / "brand" / "techd-mark-white.png"


def to_white(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    out = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            op[x, y] = (255, 255, 255, a)
    return out


def trim(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def main() -> int:
    if not SRC.exists():
        print(f"missing source: {SRC}", file=sys.stderr)
        return 1
    img = Image.open(SRC)
    white = trim(to_white(img))
    white.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {white.size[0]}x{white.size[1]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
