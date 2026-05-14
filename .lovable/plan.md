## Goal

Replace the static logo grid in `IndustryClientsSection` with a one-client-per-slide carousel that mirrors the Solutions `ProductsGridSection` pattern (`id="products"`). Same `DarkGlowPanel`, same cross-fading radial glow, same segmented auto-advance progress bar, same clickable name list on the left. Applied to **all 7 industry pages**.

## What changes

**One file: `src/sections/industries/IndustryClientsSection.tsx`** — full rewrite of the right column. Left column keeps eyebrow + headline + intro paragraph + stats; gains a clickable client-name list below the stats (mirrors `Products in this practice`).

### Right column — featured client carousel

Each slide shows:

```
┌──────────────────────────────────────────────┐
│ [Featured client]            [↗ visit site] │  ← chip row
│                                              │
│             [LARGE LOGO]                     │  ← centered, ~h-24 to h-32
│                                              │
│            Client Name                       │  ← text-3xl/4xl, bold, white
│            Industry note copy                │  ← text-base, white/65
│                                              │
│  ▬▬▬▬▬▬▬  ─── ─── ─── ─── ─── ─── ─── ───   │  ← segmented progress
└──────────────────────────────────────────────┘
```

- Auto-advance: `AUTO_MS = 7000`. Pauses on hover, focus, and when `prefers-reduced-motion: reduce`.
- Cross-fade: same overlapping enter/exit slide pattern from `ProductsGridSection` (incoming + outgoing layers, `glow-fade-in` / `glow-fade-out`, `slide-in` / `slide-out` keyframes — already defined in `index.css`).
- Glow positions: reuse the existing `GLOW_POSITIONS` array (extract to a shared util in the same file or inline a copy — inline keeps the change one-file).
- Keyboard: `ArrowLeft` / `ArrowRight` cycle when the panel has focus (same pattern as Products).
- Single-slide industries (e.g. Public Sector with the NDA "Federal Agency" entry): auto-advance disabled, progress bar hidden, no arrow keys, name list still renders (1 item).

### Left column — keep + add name list

Below the existing stats `dl`, add a 2-col (lg:grid-cols-2) clickable list of client names. Active client is `text-primary font-normal`; others are `text-white/55 hover:text-white`. CTA buttons stay (`btn-glow` → `/contact`, outline → `/resources/case-studies`) — currently the section doesn't have CTAs, so we add them to match the Products pattern.

### Removed

- The old `ClientCard` component and the 3-col grid of cards.
- The "Logos remain the property of their respective owners." footnote (move it under the carousel, smaller and centered).

## Out of scope

- No edits to `industries-extras.ts` content (clients/notes stay as-is).
- No new shared component — the carousel logic lives inline in this file. If we later want a second carousel of this exact shape we'll factor out then.
- No changes to the home `LogoStrip`, `/logo-lab`, or any other industry section (`WhyIndustrySection`, `IndustryOutcomesSection`, etc.).
- No new dependencies, no new keyframes — reuses what `ProductsGridSection` and `index.css` already define.

## Technical notes

- New state in the component: `index`, `prevIndex`, `reverse`, `paused`, plus `cardRef` for focus management.
- Reuse the `goTo(next, dir)` + `useEffect` auto-advance + keyboard handler shape from `ProductsGridSection.tsx` lines ~140–187 verbatim, just retyped against `ResolvedClient[]` instead of `Product[]`.
- A small inline `<SlideContent>` component renders one client (logo + name + note + visit link). The outgoing copy is keyed by `prevIndex`, the incoming by `index`, both absolutely positioned on the same focal area.
- Logo source: `c.logoOnDark ?? c.logo`, with `brightness-0 invert` fallback when `logoOnDark` is missing — same logic the current `ClientCard` uses.
- Clients without a `customer` match (e.g. "Federal Agency") render the initials fallback inside the slide.
- `min-h` on the slide area ≈ `min-h-[420px] md:min-h-[480px]` so the panel doesn't jump height between clients with short vs long notes.
- `prefers-reduced-motion`: skip auto-advance and the cross-fade by short-circuiting `prevIndex` to `null` when the media query matches (matches site-wide rule).
