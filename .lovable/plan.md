# Industries: Stacked Deck Presentation

Replace the current flat drag-carousel under "Built for regulated, complex enterprises." with a **3D stacked deck** — the active card sits in front, the next 2–3 peek behind it with progressive scale/offset/blur, and users advance via swipe, click, or auto-advance.

## What changes

- **Component:** rewrite `src/sections/home/_shared/IndustriesCarousel.tsx` as a stacked-deck. Same export name so `EngineeredFieldSection.tsx` stays untouched.
- **Card content (active card only):** keep current `name` + `outcome`, plus add a small **"See industry →"** CTA linking to `/industries#<id>` (matches today's link target). Background cards show only title + motif, dimmed.
- **Motifs:** reuse the existing 6 SVG motifs (Waves, Nodes, Grid, Bars, Pulse, Chevrons) — no new assets.
- **Colors:** strictly current tokens (`primary`, `secondary`, `muted-foreground`, `border`, `background`). No new hex.

## Interaction (medium motion)

- **Active card** — full size, full opacity, soft cyan glow shadow, motif visible.
- **+1 / +2 / +3 behind** — each step: scale 0.94 / 0.88 / 0.82, translateY +18px / +34px / +48px, opacity 0.7 / 0.45 / 0.25, slight blur on +2/+3.
- **Auto-advance** every 6s, pauses on hover or focus.
- **Controls:**
  - Click on a peeking card → it becomes active.
  - Swipe left/right (touch + mouse drag) → next / previous.
  - Keyboard: ←/→ when deck is focused.
  - Small dot indicators below (one per industry) — clickable, current is `primary`.
- **Reduced motion** — disable auto-advance, replace 3D transforms with simple opacity crossfade.

## Layout

- Container height ~360px on desktop, 320px on mobile.
- Single centered card column, max-width ~520px.
- Dots row + a subtle "drag" hint on first view only.

## Technical notes

```text
Deck state: activeIndex (number), isPaused (bool)
Render: INDUSTRIES.map((ind, i) => {
  const offset = (i - activeIndex + N) % N  // 0 = active, 1..N-1 behind
  const depth = Math.min(offset, 3)         // cap visible depth
  style = transforms keyed off `depth`
  zIndex = N - depth
  pointerEvents = depth <= 1 ? 'auto' : 'none'
}
```

- Use Framer-style CSS transitions (transform + opacity, 500ms cubic-bezier) — no new dependency, keep the existing tailwind/CSS-only approach.
- Drag detection reuses today's mouse/touch threshold pattern; commit to next/prev when |dx| > 60px.
- Auto-advance via `setInterval` cleared on hover/focus/visibilitychange.
- Keep `Link` semantics: each card is wrapped in a `<Link>` but `preventDefault` if drag moved (same guard as today).

## Out of scope

- No change to `EngineeredFieldSection.tsx` content or to the case-study card below.
- No change to the Solutions FlipCards above.
- No new images or routes.
