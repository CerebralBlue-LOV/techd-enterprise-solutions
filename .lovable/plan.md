## Logo intro splash

A one-time, full-screen splash on first visit per browser session. After dismissal, it never plays again until the session ends.

### Asset

You pushed raster favicons only (no SVG):
- `public/apple-touch-icon.png` (180×180, ~30 KB) — **use this** as the animated gear
- `favicon-32`, `favicon-16`, `favicon.ico` — too small for the splash

Since the gear is raster, the animation is transform-based (rotate/scale/translate) on an `<img>`. Quality stays sharp because we render it at ~96px, well under its native 180px.

### Behavior

1. On app mount, check `sessionStorage["techd-intro-played"]`.
2. If absent → render fixed full-screen overlay (white, above header), play animation, set the flag, fade out.
3. If present → render nothing, no flash.
4. `prefers-reduced-motion: reduce` → show the final lockup (gear + wordmark) statically for ~400ms then dismiss.
5. Overlay is non-interactive while visible (pointer-events locked).

### Animation (~1.8s)

Centered on white background.

```text
  t=0.00s   gear fades in, scale 0.85→1.0                       (250ms)
  t=0.10s   gear rotates 540° (1.5 turns), ease-in-out          (1100ms)
  t=0.90s   gear slides left ~half the final lockup width       (450ms, ease-out)
  t=1.05s   "TechD" wordmark slides in from x:-16 → 0, fades 0→1 (500ms)
  t=1.55s   thin cyan underline draws under wordmark            (200ms)
  t=1.80s   overlay fades out                                    (250ms)
```

- Wordmark: Roboto Condensed Bold, `text-secondary`, height matched to gear.
- Underline: `bg-primary`, 1px, scale-x 0→1.
- All colors via existing tokens — no raw hex.

### Files

- **New**: `src/components/shared/IntroSplash.tsx`
  - `fixed inset-0 z-[100] bg-background`
  - Inline `<style>` with three `@keyframes` (no Tailwind config bloat, no new deps)
  - Reads/sets `sessionStorage` flag, returns `null` after fade-out
  - Honors `prefers-reduced-motion`
- **Edit**: `src/components/layout/Layout.tsx` — mount `<IntroSplash />` once, above `<Header />`

### Out of scope

- No new dependencies (pure CSS, no framer-motion)
- No changes to header logo, hero, or favicon files
- Not a per-route transition — strictly first-load-of-session
- Header still uses `techd-logo.webp` unchanged
