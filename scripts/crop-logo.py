"""Crop the TechD logo into gear-only and wordmark-only PNGs for the intro splash."""
from pathlib import Path
import numpy as np
from PIL import Image

SRC = Path("src/assets/techd-logo.webp")
OUT_DIR = Path("public/logos")
OUT_DIR.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert("RGBA")
arr = np.array(im)
alpha = arr[:, :, 3]
W, H = im.size  # (264, 70)

# Find the transparent gap between gear and wordmark
col_sum = alpha.sum(axis=0)
gap_cols = [x for x in range(int(W * 0.2), int(W * 0.5)) if col_sum[x] == 0]
gap_start = min(gap_cols)
gap_end = max(gap_cols)
print(f"Gap: x={gap_start}..{gap_end}")

def tight_crop(box):
    """Crop then trim transparent margins."""
    region = im.crop(box)
    bbox = region.getbbox()
    return region.crop(bbox) if bbox else region

def center_on_square(img):
    """Pad img with transparent pixels so its visible bbox sits at the exact
    geometric center of a square canvas. CSS `transform-origin: 50% 50%` pivots
    around the image box center, so any asymmetric padding shows up as wobble.
    """
    bbox = img.getbbox()  # (l, t, r, b) of opaque pixels
    if not bbox:
        return img
    l, t, r, b = bbox
    w, h = r - l, b - t
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    offset_x = (side - w) // 2 - l
    offset_y = (side - h) // 2 - t
    canvas.paste(img, (offset_x, offset_y), img)
    return canvas

gear = center_on_square(tight_crop((0, 0, gap_start, H)))
word = tight_crop((gap_end + 1, 0, W, H))

gear_path = OUT_DIR / "techd-gear.png"
word_path = OUT_DIR / "techd-wordmark.png"
gear.save(gear_path, "PNG", optimize=True)
word.save(word_path, "PNG", optimize=True)

print(f"Gear:     {gear.size}  →  {gear_path}")
print(f"Wordmark: {word.size}  →  {word_path}")
