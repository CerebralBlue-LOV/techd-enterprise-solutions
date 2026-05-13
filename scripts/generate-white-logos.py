#!/usr/bin/env python3
"""
Generate white-on-transparent versions of customer logos for use on dark surfaces.

For each allow-listed source logo in public/logos/:
  - If the .svg embeds a base64 PNG (PowerPoint export), extract it.
  - If it's a real .svg vector, skip (CSS invert handles those cleanly).
  - Otherwise load the raster directly.
Then knock out the white/uniform background, recolor remaining pixels to pure
white preserving alpha, trim, and save to public/logos/white/<name>.png.

Re-runnable. Logs per-file outcome.
"""
from __future__ import annotations
import base64
import io
import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public" / "logos"
OUT_DIR = SRC_DIR / "white"

# Industry #clients allow-list. Filenames (without extension) under public/logos/.
ALLOW = [
    "admed", "netcare", "childrens-health",
    "snap", "adobe", "verizon",
    "metlife",
    "tepsco",
    "harvard", "pennstate", "nus", "stonybrook", "nyit",
]

WHITE_THRESHOLD = 240  # any channel >= this counts as background-ish
EDGE_TOLERANCE = 18    # tolerance for matching the dominant corner color


def find_source(stem: str) -> Path | None:
    for ext in (".svg", ".png", ".jpg", ".jpeg"):
        p = SRC_DIR / f"{stem}{ext}"
        if p.exists():
            return p
    return None


def extract_embedded_png(svg_path: Path) -> Image.Image | None:
    text = svg_path.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r'data:image/(?:png|jpeg);base64,([A-Za-z0-9+/=]+)', text)
    if not m:
        return None
    raw = base64.b64decode(m.group(1))
    return Image.open(io.BytesIO(raw))


def load_image(path: Path) -> tuple[Image.Image | None, str]:
    if path.suffix.lower() == ".svg":
        img = extract_embedded_png(path)
        if img is None:
            return None, "true-vector-svg (skip, use CSS invert)"
        return img.convert("RGBA"), "embedded-png"
    return Image.open(path).convert("RGBA"), "raster"


def knockout_to_white(img: Image.Image) -> Image.Image:
    """Make near-white + dominant corner color transparent; recolor rest to white."""
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size

    # Sample corners to detect a uniform non-white background.
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    bg = None
    if all(c[3] > 0 for c in corners):
        # If all four corners agree (within tolerance), treat as background.
        r0, g0, b0 = corners[0][:3]
        if all(
            abs(c[0] - r0) <= EDGE_TOLERANCE
            and abs(c[1] - g0) <= EDGE_TOLERANCE
            and abs(c[2] - b0) <= EDGE_TOLERANCE
            for c in corners
        ):
            bg = (r0, g0, b0)

    out = Image.new("RGBA", img.size, (255, 255, 255, 0))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            # Near-white background → transparent
            if r >= WHITE_THRESHOLD and g >= WHITE_THRESHOLD and b >= WHITE_THRESHOLD:
                continue
            # Detected uniform background color → transparent
            if bg is not None:
                br, bg_, bb = bg
                if (
                    abs(r - br) <= EDGE_TOLERANCE
                    and abs(g - bg_) <= EDGE_TOLERANCE
                    and abs(b - bb) <= EDGE_TOLERANCE
                ):
                    continue
            # Foreground → white, preserve original alpha modulated by darkness
            # (darker source pixels = more opaque white silhouette).
            luminance = (r * 299 + g * 587 + b * 114) // 1000
            new_a = max(0, min(255, int(a * (1 - luminance / 255))))
            # Floor to keep mid-tones visible
            if new_a < 40 and a > 200:
                new_a = max(new_a, 80)
            op[x, y] = (255, 255, 255, new_a)
    return out


def trim(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output: {OUT_DIR.relative_to(ROOT)}\n")
    summary = []
    for stem in ALLOW:
        src = find_source(stem)
        if src is None:
            summary.append((stem, "MISSING source", 0))
            continue
        img, kind = load_image(src)
        if img is None:
            summary.append((stem, kind, 0))
            continue
        white = knockout_to_white(img)
        white = trim(white)
        # Sanity: count non-transparent pixels
        alpha = white.split()[-1]
        opaque = sum(1 for v in alpha.getdata() if v > 0)
        out_path = OUT_DIR / f"{stem}.png"
        white.save(out_path, "PNG", optimize=True)
        summary.append((stem, f"{kind} -> {white.size[0]}x{white.size[1]}", opaque))

    print(f"{'logo':<22} {'status':<48} {'opaque px'}")
    print("-" * 90)
    for stem, status, opaque in summary:
        warn = "  <-- LOW (review)" if 0 < opaque < 500 else ("  <-- EMPTY" if opaque == 0 else "")
        print(f"{stem:<22} {status:<48} {opaque}{warn}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
