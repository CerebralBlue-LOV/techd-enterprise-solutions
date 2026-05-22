## Goal

Restructure each asset card in `/techd-brand-lab` so we can compare every upscaled logo across three surfaces, with all sizes laid out horizontally in a single glance.

## Layout changes

Per asset card, render three stacked surface panels (top to bottom):

1. **Light** — white background, colored logo (`src`)
2. **Dark / Color** — secondary (dark) background, colored logo (`src`)
3. **Dark / White** — secondary (dark) background, white logo variant (`darkSrc`)

Within each panel, render all sizes (70/140/280/560 for horizontal, 40/80/160/320 for square) **side by side in a horizontal row** instead of stacked vertically. The row scrolls horizontally on narrow viewports if widths exceed the card. Each size has its label (`70px`, `140px`, …) below or above the image.

Remove the existing "on light" / "on dark" toggle (now redundant — all three are always visible). Keep the "Picked / Use this" footer per card.

## Files touched

- `src/pages/TechDBrandLab.tsx` — only this file. Refactor the card's surface rendering block. Replace the two-section vertical stack with three sections, each containing a flex/overflow-x-auto row of sized images. Remove the `bg` state and toggle UI.

## Out of scope

- No new assets generated.
- No production component changes.
- No new routes or content edits.
