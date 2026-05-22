#!/usr/bin/env python3
"""
Generate a white-scale version of the upscaled TechD logo.

Reads:  src/assets/brand/lab/techd-logo-upscale.png
Writes: src/assets/brand/lab/techd-logo-upscale-white.png

Recolors every non-transparent pixel to pure white, preserving the original
alpha so antialiased edges stay smooth. Keeps the original canvas
dimensions (no crop) so margins stay identical to the colored version.
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "brand" / "lab" / "techd-logo-upscale.png"
OUT = ROOT / "src" / "assets" / "brand" / "lab" / "techd-logo-upscale-white.png"


def to_white(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    arr = np.array(img)
    alpha = arr[..., 3]
    # White RGB everywhere, keep original alpha (antialiasing preserved).
    out = np.zeros_like(arr)
    out[..., 0] = 255
    out[..., 1] = 255
    out[..., 2] = 255
    out[..., 3] = alpha
    return Image.fromarray(out, "RGBA")


def main() -> int:
    if not SRC.exists():
        print(f"missing source: {SRC}", file=sys.stderr)
        return 1
    img = Image.open(SRC)
    white = to_white(img)
    white.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {white.size[0]}x{white.size[1]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
