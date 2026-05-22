#!/usr/bin/env python3
"""
Generate favicon assets from the TechD logo.

Crops the gear icon (left 70×70 px of techd-logo.png), adds a small
transparent pad, then writes:
  public/favicon.ico          — multi-size ICO (16, 32, 48)
  public/favicon-32x32.png
  public/favicon-16x16.png
  public/apple-touch-icon.png — 180×180

Also patches index.html: adds <link rel="icon"> tags and sets the title
to "TechD | IBM Gold Partner".

Requirements: pip install Pillow
"""

import os
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_LOGO = ROOT / "src" / "assets" / "brand" / "techd-logo.png"
PUBLIC = ROOT / "public"
INDEX = ROOT / "index.html"

PAD_FRACTION = 0.08   # transparent padding as fraction of icon size


def make_icon(src: Path, out_size: int, out_path: Path) -> None:
    img = Image.open(src).convert("RGBA")

    # Crop the square icon region (left 70×70 px)
    icon_raw = img.crop((0, 0, img.height, img.height))

    # Add transparent padding so the mark doesn't bleed to the edge
    pad = int(icon_raw.width * PAD_FRACTION)
    padded_size = icon_raw.width + pad * 2
    canvas = Image.new("RGBA", (padded_size, padded_size), (0, 0, 0, 0))
    canvas.paste(icon_raw, (pad, pad))

    out = canvas.resize((out_size, out_size), Image.LANCZOS)
    out.save(out_path)
    print(f"  ✓  {out_path.relative_to(ROOT)}")


# ── Delete old Lovable favicon ──────────────────────────────────────────────
old_ico = PUBLIC / "favicon.ico"
if old_ico.exists():
    old_ico.unlink()
    print(f"  ✗  deleted {old_ico.relative_to(ROOT)}")

# ── Generate new assets ─────────────────────────────────────────────────────
make_icon(SRC_LOGO, 16,  PUBLIC / "favicon-16x16.png")
make_icon(SRC_LOGO, 32,  PUBLIC / "favicon-32x32.png")
make_icon(SRC_LOGO, 180, PUBLIC / "apple-touch-icon.png")

# ICO bundles 16, 32, 48 into one file
imgs = []
for size in (16, 32, 48):
    img = Image.open(SRC_LOGO).convert("RGBA")
    icon_raw = img.crop((0, 0, img.height, img.height))
    pad = int(icon_raw.width * PAD_FRACTION)
    padded_size = icon_raw.width + pad * 2
    canvas = Image.new("RGBA", (padded_size, padded_size), (0, 0, 0, 0))
    canvas.paste(icon_raw, (pad, pad))
    imgs.append(canvas.resize((size, size), Image.LANCZOS))

ico_path = PUBLIC / "favicon.ico"
imgs[0].save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)],
             append_images=imgs[1:])
print(f"  ✓  {ico_path.relative_to(ROOT)}")

# ── Patch index.html ─────────────────────────────────────────────────────────
html = INDEX.read_text(encoding="utf-8")

# 1. Update <title>
html = re.sub(
    r"<title>.*?</title>",
    "<title>TechD | IBM Gold Partner</title>",
    html,
)

# 2. Replace any existing favicon <link> tags (or insert after <meta charset>)
FAVICON_BLOCK = """\
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />"""

# Remove any existing icon link tags first
html = re.sub(r'\s*<link rel="(?:icon|apple-touch-icon)"[^>]*/>\n?', "", html)

# Insert favicon block right after <meta charset> line
html = re.sub(
    r'(<meta charset="UTF-8" />)',
    r'\1\n' + FAVICON_BLOCK,
    html,
)

INDEX.write_text(html, encoding="utf-8")
print(f"  ✓  index.html patched (title + favicon links)")

print("\nDone. Run `npm run dev` to verify the tab icon.")
