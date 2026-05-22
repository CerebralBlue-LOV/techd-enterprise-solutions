#!/usr/bin/env python3
"""
optimize-heavy-assets.py
------------------------
One-shot optimizer for the heaviest assets in the TechD site.

What it does (in order):
  1. Re-encodes `src/assets/team/garrett-rowe.jpg` at quality=82, max 1200px
     on the long edge. Typical result: ~500 KB -> ~60 KB.
  2. Runs `svgo` over `public/images/partners/` in place (skips
     `partners-deprecated/`). Typical savings: 30-60%.
  3. Prints a before/after report.

Dry-run by default. Pass --apply to actually write changes.

Usage:
    python scripts/optimize-heavy-assets.py           # dry run (report only)
    python scripts/optimize-heavy-assets.py --apply   # write changes

Requirements:
    python -m pip install --no-cache-dir Pillow
    npm i -g svgo   # or: npx svgo ... (script will try npx automatically)
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEAM_DIR = ROOT / "src" / "assets" / "team"
PARTNERS_DIR = ROOT / "public" / "images" / "partners"

HEADSHOT = TEAM_DIR / "garrett-rowe.jpg"
HEADSHOT_QUALITY = 82
HEADSHOT_MAX_EDGE = 1200


def human(n: int) -> str:
    for unit in ("B", "KB", "MB"):
        if n < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} GB"


def optimize_headshot(apply: bool) -> tuple[int, int]:
    if not HEADSHOT.exists():
        print(f"  skip: {HEADSHOT} not found")
        return 0, 0
    before = HEADSHOT.stat().st_size
    if not apply:
        return before, before  # report only

    try:
        from PIL import Image, ImageOps
    except ImportError:
        sys.exit("Pillow not installed. Run: python -m pip install Pillow")

    img = Image.open(HEADSHOT)
    img = ImageOps.exif_transpose(img).convert("RGB")
    img.thumbnail((HEADSHOT_MAX_EDGE, HEADSHOT_MAX_EDGE), Image.LANCZOS)
    img.save(HEADSHOT, "JPEG", quality=HEADSHOT_QUALITY, optimize=True, progressive=True)
    after = HEADSHOT.stat().st_size
    return before, after


def svgo_cmd() -> list[str] | None:
    if shutil.which("svgo"):
        return ["svgo"]
    if shutil.which("npx"):
        return ["npx", "--yes", "svgo"]
    return None


def optimize_svgs(apply: bool) -> tuple[int, int, int]:
    svgs = sorted(PARTNERS_DIR.glob("*.svg"))
    before_total = sum(p.stat().st_size for p in svgs)
    if not apply:
        return before_total, before_total, len(svgs)

    cmd = svgo_cmd()
    if cmd is None:
        sys.exit("svgo not found. Install with: npm i -g svgo")

    # Run in place, multipass for stronger compression.
    subprocess.run(
        cmd + ["--multipass", "-f", str(PARTNERS_DIR)],
        check=True,
    )
    after_total = sum(p.stat().st_size for p in svgs)
    return before_total, after_total, len(svgs)


def main() -> None:
    parser = argparse.ArgumentParser(description="Optimize TechD's heaviest assets.")
    parser.add_argument("--apply", action="store_true", help="Actually write changes (default: dry run).")
    args = parser.parse_args()

    mode = "APPLY" if args.apply else "DRY RUN"
    print(f"== TechD asset optimizer ({mode}) ==\n")

    print("[1/2] Headshot: src/assets/team/garrett-rowe.jpg")
    h_before, h_after = optimize_headshot(args.apply)
    if h_before:
        print(f"      before: {human(h_before)}")
        if args.apply:
            print(f"      after:  {human(h_after)}  ({(1 - h_after / h_before) * 100:.0f}% smaller)")

    print("\n[2/2] Partner SVGs: public/images/partners/*.svg")
    s_before, s_after, count = optimize_svgs(args.apply)
    print(f"      files:  {count}")
    print(f"      before: {human(s_before)}")
    if args.apply:
        print(f"      after:  {human(s_after)}  ({(1 - s_after / s_before) * 100:.0f}% smaller)")

    total_before = h_before + s_before
    total_after = h_after + s_after
    print(f"\nTotal before: {human(total_before)}")
    if args.apply:
        print(f"Total after:  {human(total_after)}  (saved {human(total_before - total_after)})")
    else:
        print("Run again with --apply to write changes.")


if __name__ == "__main__":
    main()
