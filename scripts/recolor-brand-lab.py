"""Recolor lab brand PNGs to exact brand tokens.

Pipeline per asset:
  1. Initial per-pixel classification by saturation + luminance into one of
     three brand tokens (PRIMARY / SECONDARY / MUTED).
  2. Majority-filter cleanup over a 7x7 window on the label map. This flips
     thin fringe pixels (e.g. the bottom-edge of the dark gear that the AI
     upscale rendered at L~166 and the strict luminance cutoff misclassifies
     as muted) back to whatever the surrounding region is.
  3. Alpha is preserved untouched throughout, so anti-aliased edges stay
     smooth.

Writes *-brand.png siblings next to each *-upscale.png in src/assets/brand/lab/.
"""
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

LAB = Path(__file__).parent.parent / "src" / "assets" / "brand" / "lab"

PRIMARY = (0, 179, 227)   # #00B3E3
SECONDARY = (86, 86, 90)  # #56565A
MUTED = (167, 165, 168)   # #A7A5A8
WHITE = (255, 255, 255)

LABELS = {0: PRIMARY, 1: SECONDARY, 2: MUTED}

SAT_THRESHOLD = 40
DARK_LUM_CUTOFF = 145
ALPHA_FLOOR = 0
MAJORITY_WINDOW = 7  # odd; pixels are repainted to the modal label in this window
MIN_ISLAND_AREA = 400  # any color island smaller than this gets absorbed by its neighbors


def initial_labels(rgb: np.ndarray) -> np.ndarray:
    """Per-pixel label: 0=PRIMARY, 1=SECONDARY, 2=MUTED."""
    r, g, b = rgb[..., 0].astype(int), rgb[..., 1].astype(int), rgb[..., 2].astype(int)
    mx = np.maximum.reduce([r, g, b])
    mn = np.minimum.reduce([r, g, b])
    sat = mx - mn
    lum = (r + g + b) // 3
    is_cyan = (sat > SAT_THRESHOLD) & (b >= r) & (b >= g)
    labels = np.where(is_cyan, 0, np.where(lum < DARK_LUM_CUTOFF, 1, 2))
    return labels.astype(np.uint8)


def majority_filter(labels: np.ndarray, mask: np.ndarray, window: int) -> np.ndarray:
    """Repaint each masked pixel with the modal label in a window x window box,
    counting only masked (opaque) pixels."""
    out = labels.copy()
    for lbl in (0, 1, 2):
        # count of this label in a window x window box around each pixel
        is_lbl = ((labels == lbl) & mask).astype(np.uint16)
        # using uniform filter as a fast box-sum proxy (multiply by area)
        area = window * window
        box = ndimage.uniform_filter(is_lbl.astype(np.float32), size=window) * area
        if lbl == 0:
            counts = box[..., None]
        else:
            counts = np.concatenate([counts, box[..., None]], axis=-1)
    new_labels = np.argmax(counts, axis=-1).astype(np.uint8)
    out[mask] = new_labels[mask]
    return out


def absorb_small_islands(labels: np.ndarray, mask: np.ndarray, min_area: int) -> np.ndarray:
    """Find connected components of each label; any component smaller than
    min_area is reassigned to the modal label of pixels in a dilated ring
    around it (i.e. the surrounding region's color)."""
    out = labels.copy()
    for lbl in (0, 1, 2):
        region = (labels == lbl) & mask
        comp, n = ndimage.label(region)
        if n == 0:
            continue
        sizes = ndimage.sum(np.ones_like(comp), comp, range(1, n + 1))
        small_ids = [i + 1 for i, s in enumerate(sizes) if s < min_area]
        for cid in small_ids:
            island = comp == cid
            # one-pixel ring just outside the island
            dilated = ndimage.binary_dilation(island, iterations=2) & ~island & mask
            if not dilated.any():
                continue
            neighbor_labels = out[dilated]
            # modal neighbor label (excluding the island's own label if possible)
            others = neighbor_labels[neighbor_labels != lbl]
            chosen = others if others.size else neighbor_labels
            counts = np.bincount(chosen, minlength=3)
            new_lbl = int(np.argmax(counts))
            out[island] = new_lbl
    return out


def recolor(src: Path, dst: Path, force_white: bool = False) -> None:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im)
    rgb = arr[..., :3]
    alpha = arr[..., 3]
    mask = alpha > ALPHA_FLOOR

    if force_white:
        out_rgb = np.where(mask[..., None], np.array(WHITE, dtype=np.uint8), rgb)
        out_alpha = np.where(mask, alpha, 0)
        Image.fromarray(
            np.concatenate([out_rgb, out_alpha[..., None]], axis=-1).astype(np.uint8),
            "RGBA",
        ).save(dst, "PNG")
        print(f"{dst.name}: white={int(mask.sum())} transparent={int((~mask).sum())}")
        return

    labels = initial_labels(rgb)
    labels = majority_filter(labels, mask, MAJORITY_WINDOW)

    palette = np.array([PRIMARY, SECONDARY, MUTED], dtype=np.uint8)
    out_rgb = palette[labels]
    # zero out transparent regions cleanly
    out_rgb = np.where(mask[..., None], out_rgb, 0)
    out_alpha = np.where(mask, alpha, 0)
    out = np.concatenate([out_rgb, out_alpha[..., None]], axis=-1).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(dst, "PNG")

    counts = {
        "primary": int(((labels == 0) & mask).sum()),
        "secondary": int(((labels == 1) & mask).sum()),
        "muted": int(((labels == 2) & mask).sum()),
        "transparent": int((~mask).sum()),
    }
    print(f"{dst.name}: {counts}")


def main() -> None:
    jobs = [
        ("techd-logo-upscale.png", "techd-logo-upscale-brand.png", False),
        ("techd-wordmark-upscale.png", "techd-wordmark-upscale-brand.png", False),
        ("techd-gear-upscale.png", "techd-gear-upscale-brand.png", False),
        ("techd-gear-upscale-white.png", "techd-gear-upscale-white-brand.png", True),
    ]
    for src_name, dst_name, force_white in jobs:
        src = LAB / src_name
        dst = LAB / dst_name
        if not src.exists():
            print(f"SKIP (missing): {src}")
            continue
        recolor(src, dst, force_white=force_white)


if __name__ == "__main__":
    main()
