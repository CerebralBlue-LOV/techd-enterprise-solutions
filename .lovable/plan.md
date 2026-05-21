# Smoother chat open/close

## Why it feels off today

Three things are working against the animation:

1. **Everything fires at once.** Launcher fade and panel open both run for 1.00 s starting on the same frame. The eye doesn't know what to follow, so nothing feels intentional.
2. **The panel starts at `scale(0.04)`.** That's essentially a single pixel growing to full size. Over 1 s it looks like a "zoom from nothing" effect — fast at the start, then crawls. Native panels (iOS, macOS, Linear, Raycast) start at ~0.92–0.96, not near-zero.
3. **One easing curve for everything.** `cubic-bezier(0.22, 1, 0.36, 1)` is a strong "ease-out" — great for entrances, wrong for exits. Closes feel like they hesitate.

## The plan

Treat opening and closing as a **two-step choreography**, not one big simultaneous animation.

### Opening (total ~480 ms, feels instant but smooth)

```text
0 ms ─────────── 180 ms ─────────── 480 ms
│ launcher fades + scales out      │
│       │ panel starts rising + fading in
```

- **Launcher out:** 180 ms, `ease-in` (quick exit — it's getting out of the way)
- **Panel in:** starts at 120 ms (slight overlap), runs 360 ms
  - opacity 0 → 1
  - scale **0.96 → 1** (not 0.04)
  - translateY **8 px → 0** (subtle rise from the launcher's position)
  - no blur (the blur filter is expensive and adds nothing at this scale)
  - easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out — feels like it "lands")

### Closing (total ~320 ms, snappier than open)

```text
0 ms ─────────── 240 ms ─────── 320 ms
│ panel fades + shrinks         │
│              │ launcher fades back in
```

- **Panel out:** 240 ms, `cubic-bezier(0.4, 0, 1, 1)` (ease-in — it's leaving)
  - opacity 1 → 0, scale 1 → 0.96, translateY 0 → 4 px
- **Launcher in:** starts at 140 ms, runs 180 ms, `ease-out`

Native UIs always close faster than they open — that's what makes closes feel "responsive" instead of "sluggish."

### Why these numbers

- **Material/Apple HIG sweet spot** for panel transitions is 200–400 ms. 1 s is movie-trailer slow for a UI affordance.
- **Subtle scale (0.96)** + **small translate (8 px)** reads as "the panel grew out of the button" without the cartoonish zoom.
- **Staggering by ~120 ms** gives the eye a clear focal point: launcher leaves, *then* panel arrives. No competing motion.
- **Asymmetric open/close durations** match every polished app you've used (Linear, Raycast, Slack, macOS sheets).

## What I'll change

- `ChatWidget.tsx`
  - Replace single `ANIM_MS = 1000` with separate open/close timings
  - Drop `blur` from the transition (perf + visual noise)
  - Change closed state from `scale-[0.04]` → `scale-95` + small translate
  - Use different easing strings for enter vs exit
- `ChatLauncher.tsx`
  - Shorter fade (180 ms out / 180 ms in) with small delay on re-entry
  - Use `ease-in` going out, `ease-out` coming back

## What stays the same

- Brand colors, button styling, sheen sweep, hover glow
- Panel content, scroll behavior, focus management
- `prefers-reduced-motion` still disables transitions
- Escape-to-close, click-to-toggle

## Out of scope

- Not adding a backdrop/overlay
- Not changing the panel's position or dimensions
- Not touching the CTA bubble animation

After implementing, I'll give you the updated timing table so you can fine-tune any single number.