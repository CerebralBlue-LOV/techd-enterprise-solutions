## Goal
Generate white-on-transparent versions of the client logos used in the industry `#clients` cards, then point the cards at those white variants so every logo reads as a clean white mark on the dark surface.

## Approach
A one-off Python script (Pillow) that processes each input logo once, writes a `*-white.png` next to it, and is safe to re-run. The site code then prefers the white variant when present.

## Script — `scripts/generate-white-logos.py`

Language: Python 3 with Pillow.

For each input logo:

1. Load the source.
   - If it's a real `.svg` (true vector), skip — those already invert cleanly with CSS and don't need a raster pass.
   - If it's a PowerPoint-style `.svg` with an embedded `data:image/png;base64,...`, extract that PNG.
   - If it's a `.png` or `.jpg`, load it directly.
2. Convert to RGBA.
3. Knock out the background:
   - Treat near-white pixels (R, G, B all above ~245) as transparent.
   - Optionally also knock out a single dominant solid corner color (handles non-white but uniform backgrounds).
4. Recolor remaining pixels to pure white, preserving the original alpha so anti-aliased edges stay smooth.
5. Trim transparent margins and write `public/logos/white/<name>.png`.

The script logs which files it processed, which it skipped, and which produced suspiciously empty output (so we can replace those by hand later).

## Scope of logos to process (industry `#clients` only, for now)

- Healthcare: Admed, Netcare, Children's Health
- Media: Snap Inc., Adobe, Verizon
- Insurance: MetLife
- Energy: TEPSCO
- Higher Ed: Harvard, Penn State, NUS, Stony Brook, NYIT

The script accepts an explicit allow-list so we don't touch home-marquee-only logos.

## Site changes after the script runs

- Add an optional `logoOnDark` field to `Customer` in `src/content/site.ts` and fill it in for the logos above.
- Update `IndustryClientsSection.tsx`:
  - When `logoOnDark` exists, render that asset directly with no `brightness-0 invert` filter.
  - When it doesn't exist, fall back to the current filter behavior.
- No change to the home logo strip.

## Validation

- Run the script.
- Open the generated PNGs and visually QA each one (size, edges, no leftover background fringe).
- Spot-check the higher-education and healthcare `#clients` sections in preview at desktop and mobile widths.
- Note any logo that the script can't clean well — those become candidates for option 1 (manually sourced white mark).

## Out of scope

- Home-page logo marquee
- Re-vectorizing the broken SVGs
- Sourcing official brand-portal assets (deferred to follow-up if the script output isn't good enough)