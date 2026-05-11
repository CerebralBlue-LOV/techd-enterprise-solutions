## Problem

The progress fill on the bottom segmented bar is technically working (session replay confirms it animates every cycle), but it's visually imperceptible:

- The bar is only `2px` tall — a fill growing inside 2px of height is hard to notice
- The active segment's track and fill are both white-ish, so there's almost no contrast between "filled" and "unfilled" parts of the active line
- Inactive segments use `bg-white/25`, which is close enough to the active track that the active segment doesn't stand out either

## Fix

Single file change: `src/sections/solutions/ProductsGridSection.tsx` (the segmented bar block only). No new dependencies, no keyframe changes.

1. **Thicken the bar** from `h-[2px]` to `h-[3px]` so the fill has room to read.
2. **Lower the track contrast** on every segment to `bg-white/15` — this becomes the unfilled background everywhere.
3. **Brighten the fill** to solid white (already is) but make the fill clearly stand out by sitting on the much-darker track.
4. **Mark the active segment** with a faint cyan tint underneath the white fill so the eye lands there even before the fill grows — `bg-primary/30` on the active button's track instead of white/15. As the white fill sweeps across, you see white-over-cyan, which is unmistakable.
5. **Keep behavior unchanged**: same `progress-fill` keyframe, same `AUTO_MS`, same pause-on-hover via `animationPlayState`, same click-to-jump.

## What the user will see

- A row of five thin lines spans the bottom of the dark card edge to edge.
- Four are dim grey-white (15% opacity).
- The active one has a soft cyan tint as its background, with a bright white bar sweeping across it from left to right over ~7 seconds.
- When the sweep completes, the next product slides in and the next segment starts sweeping.
- Hover over the card → sweep pauses.

## Out of scope

- No changes to slide animations, auto-advance timing, card chrome, or content.
- No new keyframes or Tailwind config edits.
