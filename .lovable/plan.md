## Goal

Make the cyan spotlight glow behind the product carousel transition smoothly from one position to the next, matching the text slide animation, instead of snapping instantly when the slide changes.

## Problem today

In `src/sections/solutions/ProductsGridSection.tsx`:

- The text uses two overlapping layers (`SlideContent` outgoing + incoming) with a ~1.4s slide-out + slide-in cross-transition.
- The spotlight glow is a single `<div>` whose `background` (radial gradient at a per-slide position) is rewritten in place on each index change. Only `opacity` is transitionable on that node, so `background` swaps instantly — the glow appears to teleport.
- Ambient layers (rotating conic shimmer + 3 drifting cyan blobs) are continuous loops and are not the issue.

## Fix

Mirror the text pattern for the spotlight: render two stacked glow layers (current + previous) and cross-fade them.

1. Render an "incoming" glow layer keyed to `index` — fades in from `opacity-0` to `opacity-100` over ~700ms.
2. While `prevIndex !== null`, also render an "outgoing" glow layer keyed to `prevIndex` — fades from `opacity-100` to `opacity-0` over ~700ms.
3. Both layers use the existing radial-gradient background, parameterized by `GLOW_POSITIONS[i]`.
4. Reuse the existing `prevIndex` state and 1500ms cleanup timeout already in the component — no new state machine.
5. Honor `prefers-reduced-motion` (the section already disables animations under that media query via `motion-reduce:[&_*]:!animate-none`, so the cross-fade naturally collapses to an instant swap).

## Out of scope

- No changes to the ambient blobs or conic shimmer.
- No changes to the text slide animation, progress bar, or auto-advance timing.
- No new dependencies, no design tokens, no color additions.

## Technical notes

- File touched: `src/sections/solutions/ProductsGridSection.tsx` only.
- Replace the single spotlight `<div>` (currently around lines 263–269) with two absolutely-positioned layers inside the same `aria-hidden` background wrapper.
- Use Tailwind's `transition-opacity duration-700` plus an initial `opacity-0` → mount → `opacity-100` pattern (via a tiny `useEffect` + state, or `key` + CSS animation). Lean toward a single CSS keyframe (`fade-in-glow`) over 700ms to avoid extra React state.
- Timing: 700ms cross-fade keeps the glow movement subtler than the 1.4s text slide, which reads as the background "settling" while the text moves — matches Stripe/Linear restraint.
