"""Recolor lab brand PNGs to exact brand tokens.

Reads each AI upscale in src/assets/brand/lab/ and writes a *-brand.png
sibling with every opaque pixel snapped to one of:
    #00B3E3  primary cyan
    #56565A  secondary dark gray
    #A7A5A8  muted light gray
Alpha is preserved so anti-aliased edges stay smooth.
"""
from pathlib import Path
from PIL import Image

LAB = Path(__file__).parent.parent / "src" / "assets" / "brand" / "lab"

PRIMARY = (0, 179, 227)   # #00B3E3
SECONDARY = (86, 86, 90)  # #56565A
MUTED = (167, 165, 168)   # #A7A5A8
WHITE = (255, 255, 255)

SAT_THRESHOLD = 40
DARK_LUM_CUTOFF = 130
ALPHA_FLOOR = 0


def snap_pixel(r: int, g: int, b: int) -> tuple[int, int, int]:
    s = max(r, g, b) - min(r, g, b)
    l = (r + g + b) // 3
    if s > SAT_THRESHOLD and b >= r and b >= g:
        return PRIMARY
    if l < DARK_LUM_CUTOFF:
        return SECONDARY
    return MUTED


def recolor(src: Path, dst: Path, force_white: bool = False) -> None:
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    counts = {"primary": 0, "secondary": 0, "muted": 0, "white": 0, "transparent": 0}
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a <= ALPHA_FLOOR:
                px[x, y] = (0, 0, 0, 0)
                counts["transparent"] += 1
                continue
            if force_white:
                px[x, y] = (*WHITE, a)
                counts["white"] += 1
                continue
            nr, ng, nb = snap_pixel(r, g, b)
            px[x, y] = (nr, ng, nb, a)
            if (nr, ng, nb) == PRIMARY:
                counts["primary"] += 1
            elif (nr, ng, nb) == SECONDARY:
                counts["secondary"] += 1
            else:
                counts["muted"] += 1
    im.save(dst, "PNG")
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
