## Goal

Lock the four AI-upscaled brand assets to the exact brand palette by recoloring them deterministically with Python/Pillow. Surface the results in TechD Brand Lab as a new "Brand-snapped" candidate next to the existing AI upscale so you can A/B before promoting.

Originals stay untouched (kept in `src/assets/brand/lab/`). The script writes new files alongside them.

## Coloring rules (your spec)

```text
Gear (3 disjoint pieces):
  top piece     → #56565A   (secondary, dark gray)
  right piece   → #A7A5A8   (muted, light gray)
  bottom-left   → #00B3E3   (primary cyan)

Wordmark "TechD":
  "Tech"        → #00B3E3   (primary cyan)
  "D"           → #56565A   (secondary, dark gray)

White gear variant:
  all opaque    → #FFFFFF
```

## How each pixel gets its color (the actual mechanism)

Good news: in every lab source, the **current pixel colors already encode the right piece identity** — top gear is already dark-gray-ish, right gear is already light-gray-ish, bottom-left is cyan-ish, "Tech" is cyan-ish, "D" is dark-gray-ish. So we don't need positional logic (top vs right vs left) or shape segmentation — we just snap each pixel to the closest target by its **existing** RGB.

### Classifier (applied per pixel, alpha preserved)

For every opaque pixel `(R, G, B, A)`:

1. Compute saturation `S = max(R,G,B) − min(R,G,B)` and luminance `L = (R+G+B)/3`.
2. Bucket:
   - `S > 40` and B is the max channel → **cyan** → write `#00B3E3`
   - `S ≤ 40` (i.e., gray/neutral) and `L < 130` → **dark gray** → write `#56565A`
   - `S ≤ 40` and `L ≥ 130` → **muted gray** → write `#A7A5A8`
3. **Alpha is copied through unchanged** — this preserves anti-aliased edges, no jagged outlines.

Why this works per asset:

| Asset | What the classifier produces |
|---|---|
| `techd-logo-upscale.png` (gear + TechD) | Top gear pixels are dark-gray-ish (L≈90) → `#56565A` ✓. Right gear pixels are light-gray-ish (L≈160) → `#A7A5A8` ✓. Bottom-left gear pixels are blue-dominant → `#00B3E3` ✓. "Tech" letters are blue-dominant → `#00B3E3` ✓. "D" letters are dark-gray → `#56565A` ✓. |
| `techd-wordmark-upscale.png` ("TechD" only) | "Tech" → `#00B3E3`, "D" → `#56565A`. Muted bucket should be empty here; if any stray pixel falls into it, it's an upscale artifact and gets normalized. |
| `techd-gear-upscale.png` (3 pieces, color) | Same as gear portion of full logo — three pieces snap to their three tokens. |
| `techd-gear-upscale-white.png` | Override: any opaque pixel → `#FFFFFF`. (Skip the classifier entirely for this one.) |

### Why this beats positional segmentation

A positional rule ("topmost connected component → dark") would break the moment the AI upscale shifts a piece a few px or merges two gears at the rim. A color-based snap is robust as long as the upscale stayed roughly in the right palette neighborhood — which it did (verified earlier: cyan reads ≈`#10B0D0`, dark gray ≈`#808080`, light gray ≈`#A0A0A0`, all clearly in their buckets).

## What gets built

### 1. `scripts/recolor-brand-lab.py`

Pillow-based, no new dependencies (Pillow is already in your `scripts/` toolchain — `generate-favicon.py` uses it). Reads from `src/assets/brand/lab/*-upscale*.png`, writes `*-upscale-brand.png` next to each:

- `techd-logo-upscale.png` → `techd-logo-upscale-brand.png`
- `techd-wordmark-upscale.png` → `techd-wordmark-upscale-brand.png`
- `techd-gear-upscale.png` → `techd-gear-upscale-brand.png`
- `techd-gear-upscale-white.png` → `techd-gear-upscale-white-brand.png`

Script also prints a per-asset color audit (count of pixels assigned to each token) so you can verify in the console that, e.g., the wordmark produced 0 muted-bucket pixels.

Tunables surfaced at the top of the file:
- `SAT_THRESHOLD = 40` — saturation cutoff between "colored" and "neutral"
- `DARK_LUM_CUTOFF = 130` — split between `#56565A` and `#A7A5A8`
- `ALPHA_FLOOR = 0` — optional: drop pixels below this alpha to kill faint upscale noise (default 0 = preserve all)

### 2. Brand Lab UI changes (`src/pages/TechDBrandLab.tsx`)

For each of the four assets, add a second candidate to the `candidates` array:

```text
{
  label: "Brand-snapped",
  method: "Token-locked recolor · #00B3E3 / #56565A / #A7A5A8",
  src: <import of the new *-brand.png>,
  note: "Pixels classified by hue/luminance and snapped to brand tokens. Alpha preserved.",
}
```

Result: each asset section in the lab shows two side-by-side candidates ("AI upscale" vs "Brand-snapped") at every scale you drag the slider to. The existing "Use this" button already lets you mark a winner per asset.

No other Brand Lab changes — surface panels, scale slider, dark backdrop for the white gear, all reused as-is.

## Out of scope (intentionally)

- No changes to production assets (`src/assets/brand/techd-*.png`) yet. That's the next pass, only after you approve a winner in the lab.
- No favicon regeneration yet — same reason.
- No re-running the upscaler. The recolor pass works on the existing lab files.
- Shape fidelity (e.g., the standalone color-gear upscale flattened the gear teeth into circles) is **not** addressed here. If you also want gear-teeth fidelity restored, that's a separate plan (vector redraw or re-upscaling with a shape-preserving model) — flag it and I'll scope it.

## After you approve in the lab

Quick promotion path (already proven by the previous pass):
1. Copy each approved `*-brand.png` over its production counterpart in `src/assets/brand/`.
2. Sync `public/logos/` debug copies.
3. Re-run `scripts/generate-favicon.py` so the favicon picks up the snapped color gear.

That promotion is **not** part of this plan — it happens on your "ship it" after the Brand Lab review.
