#!/usr/bin/env python3
"""
convert-heavy-svgs-to-webp.py
-----------------------------
Convert the heaviest partner SVGs to WebP at 2x display height.

Why: a few logos (tepsco, snap, dow, wabtec, netcare) are very path-dense
SVGs that gzip poorly. At their on-screen size (32-80px tall) a 2x WebP
is dramatically smaller with no visible quality loss.

Pipeline:
    SVG -> PNG (resvg at target pixel height) -> WebP (Pillow, q=82)

Outputs land next to the SVG, with the same basename:
    public/images/partners/tepsco.svg  ->  public/images/partners/tepsco.webp

The script ALSO rewrites src/content/site.ts so the matching `logo:` paths
point at the new .webp. The original .svg files are kept (not deleted) so
you can review and roll back via git if anything looks off.

Usage:
    python scripts/convert-heavy-svgs-to-webp.py             # dry run
    python scripts/convert-heavy-svgs-to-webp.py --apply     # write files + patch site.ts

Requirements:
    python -m pip install Pillow
    resvg on PATH (sandbox: `nix run nixpkgs#resvg -- ...` is used automatically)
"""
from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTNERS_DIR = ROOT / "public" / "images" / "partners"
SITE_TS = ROOT / "src" / "content" / "site.ts"

# (filename without ext, render height in px) -- 2x the largest md: display height
TARGETS: list[tuple[str, int]] = [
    ("tepsco",  160),  # h-12 md:h-14 -> 56px * ~3x for safety
    ("snap",    160),  # h-12 md:h-14
    ("dow",     240),  # h-16 md:h-20 -> 80px * 3x
    ("wabtec",  160),  # no class, default
    ("netcare", 160),  # no class, default
]

WEBP_QUALITY = 82


def human(n: int) -> str:
    for unit in ("B", "KB", "MB"):
        if n < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} GB"


def resvg_cmd() -> list[str]:
    if shutil.which("resvg"):
        return ["resvg"]
    if shutil.which("nix"):
        return ["nix", "run", "nixpkgs#resvg", "--"]
    sys.exit("resvg not found. Install it or run in the Lovable sandbox.")


def convert_one(name: str, height: int, apply: bool) -> tuple[int, int]:
    src = PARTNERS_DIR / f"{name}.svg"
    dst = PARTNERS_DIR / f"{name}.webp"
    if not src.exists():
        print(f"  skip: {src.name} not found")
        return 0, 0
    before = src.stat().st_size
    if not apply:
        return before, before

    try:
        from PIL import Image
    except ImportError:
        sys.exit("Pillow not installed. Run: python -m pip install Pillow")

    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        png_path = Path(tmp.name)
    try:
        subprocess.run(
            resvg_cmd() + ["--height", str(height), str(src), str(png_path)],
            check=True,
            capture_output=True,
        )
        img = Image.open(png_path).convert("RGBA")
        img.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)
    finally:
        png_path.unlink(missing_ok=True)

    return before, dst.stat().st_size


def patch_site_ts(apply: bool, names: list[str]) -> int:
    if not SITE_TS.exists():
        print(f"  skip: {SITE_TS} not found")
        return 0
    text = SITE_TS.read_text()
    changes = 0
    for name in names:
        # Only rewrite the `logo:` field, not `logoOnDark:` (those are PNG in /white/).
        pattern = re.compile(rf'(logo:\s*")(/images/partners/{re.escape(name)})\.svg(")')
        new_text, n = pattern.subn(r"\1\2.webp\3", text)
        if n:
            text = new_text
            changes += n
    if apply and changes:
        SITE_TS.write_text(text)
    return changes


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert the heaviest partner SVGs to WebP.")
    parser.add_argument("--apply", action="store_true", help="Write files and patch site.ts (default: dry run).")
    args = parser.parse_args()

    mode = "APPLY" if args.apply else "DRY RUN"
    print(f"== Convert heavy partner SVGs to WebP ({mode}) ==\n")

    total_before = 0
    total_after = 0
    print(f"{'name':<12} {'before':>10} {'after':>10}  saved")
    print("-" * 45)
    for name, height in TARGETS:
        before, after = convert_one(name, height, args.apply)
        total_before += before
        total_after += after
        if before:
            if args.apply:
                pct = (1 - after / before) * 100 if before else 0
                print(f"{name:<12} {human(before):>10} {human(after):>10}  {pct:.0f}%")
            else:
                print(f"{name:<12} {human(before):>10} {'(dry)':>10}")

    print("-" * 45)
    print(f"{'TOTAL':<12} {human(total_before):>10} {human(total_after):>10}")
    if args.apply:
        print(f"Saved: {human(total_before - total_after)}")

    print("\nPatching src/content/site.ts ...")
    n = patch_site_ts(args.apply, [t[0] for t in TARGETS])
    if args.apply:
        print(f"  {n} reference(s) rewritten to .webp")
    else:
        print(f"  would rewrite {n} reference(s) (run with --apply)")

    print("\nOriginal .svg files were kept. Review the site, then `git rm` them if happy.")


if __name__ == "__main__":
    main()
