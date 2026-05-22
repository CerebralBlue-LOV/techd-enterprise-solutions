## Goal

Regenerate `src/assets/brand/lab/techd-logo-upscale.png` so it (a) preserves the **original brand color depth** instead of being flat single-tone cyan, and (b) has enough transparent margin that no part of the gears or wordmark is clipped.

## Problems with current file

- Lost color richness — looks like a flat fill in one cyan tone
- Edges clipped at the corners (notably the "D" in TechD)

## Steps

1. Re-run `imagegen--edit_image` using the **canonical source** `src/assets/brand/techd-logo.webp` as input (not the previous upscale, which already degraded the color).
2. Prompt the model to:
   - Upscale to high-resolution PNG with crisp, vector-like edges
   - Preserve the exact original TechD cyan tone and any subtle tonal variation in the original
   - Keep a fully transparent background
   - Add generous empty space on all four sides so no glyph or gear tooth touches the canvas edge
   - Aspect ratio `3:2` (wider than the logo's natural ratio to guarantee margin)
3. Post-process with a small Python (PIL) script:
   - Detect bbox of non-transparent pixels
   - Re-crop with ~8% padding on each side (instead of tight-cropping to bbox)
   - Overwrite `src/assets/brand/lab/techd-logo-upscale.png`
4. Leave white variant, wordmark, gear, and `TechDBrandLab.tsx` untouched — the lab already reads this filename.

## Files touched

- `src/assets/brand/lab/techd-logo-upscale.png` (overwrite only)

## Out of scope

- White, wordmark, gear variants
- Production assets in `src/assets/brand/`
- Any component or styling change
