## Goal

Fix the broken "Full logo" candidate in `/techd-brand-lab`. The wordmark-only and gear-only brand-snapped assets are already perfect; only the composite full logo has artifacts (white speckles between cyan teeth, halos). Instead of patching pixels, compose a new full logo with Nano Banana using the two known-good assets as references, then replace the existing Nano candidate file.

## Approach

1. **Feed Nano Banana the two perfect assets as references** (multi-image edit):
   - `src/assets/brand/lab/techd-gear-upscale-brand.png` (perfect gear)
   - `src/assets/brand/lab/techd-wordmark-upscale-brand.png` (perfect wordmark)
   - Plus `src/assets/brand/lab/techd-logo-upscale-brand.png` as the **layout reference** so proportions, gear-to-wordmark gap, vertical alignment, and overall horizontal aspect ratio stay identical to the current logo.

2. **Prompt rules given to Nano Banana**:
   - Do NOT redraw the gear or the wordmark — composite them verbatim from the two reference images.
   - Keep the exact same composition, scale ratio, spacing, baseline, and aspect ratio as the layout reference.
   - Transparent background, clean alpha edges, no white halo, no white speckles between gear teeth, hub holes transparent.
   - Preserve exact brand hex: `#00B3E3` cyan, `#56565A` dark grey, `#A7A5A8` muted grey. No color drift.

3. **Save output** to `src/assets/brand/lab/techd-logo-nano.png` (overwriting the current bad Nano file — the lab already imports this path, so no code change needed if we keep the filename).

4. **Verify** by opening `/techd-brand-lab` and inspecting the Nano candidate on both light and dark surfaces at full scale. Zoom into the gear region to confirm no white speckles and clean separation between cyan and grey segments.

5. **If the first pass still drifts**: re-run with a tighter prompt (or fall back to a deterministic Python composite — paste the gear PNG + wordmark PNG onto a transparent canvas at measured offsets — which guarantees zero pixel drift but loses Nano's anti-aliasing polish). I'll only do this if Nano fails twice.

## Out of scope

- No changes to the wordmark-only, gear-color, or gear-white candidates (all already perfect).
- No changes to the Brand-snapped full-logo candidate (kept as the algorithmic baseline for comparison).
- No changes to production assets in `src/assets/brand/` — this is lab-only until you pick a winner.
- No size, layout, or component changes to the Brand Lab page itself.

## Files touched

- `src/assets/brand/lab/techd-logo-nano.png` (overwritten)
- Optionally update the `note` field for the Nano candidate in `src/pages/TechDBrandLab.tsx` to reflect the new compositing method.
