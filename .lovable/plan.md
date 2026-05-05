## Goal

Restyle the **Featured Case Study** card (`data-section="home:case-study"`) — replace the flat dark `bg-secondary` block + single cyan blur blob with a richer, more intentional surface inspired by the uploaded Pro Plan card (deep navy, subtle starfield, soft directional glow, fine inner border).

## Current state

```
<div class="rounded-2xl border border-border bg-secondary text-secondary-foreground p-10 md:p-16">
  <div class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
  ...content
</div>
```

Issues: solid mid‑grey surface reads as "placeholder dark," the single blur blob in the corner feels generic, and the card doesn't visually connect to the cyan particle-globe / engineered-field language of the rest of the page.

## Proposed direction

Keep the card dark (it's the page's one strong contrast moment and anchors the CTA), but swap "flat grey" for a **layered deep-navy surface** built from brand tokens, with three stacked decorative layers — same compositional recipe as `SectionBackdrop` and `HeroBackdrop`, just scoped inside the card.

### Visual layers (back → front)

1. **Base** — deep near-black tinted toward the brand. Use `bg-[hsl(220_40%_6%)]` *or* introduce a new token `--surface-deep` in `index.css` so it stays inside the design system. Slight gradient from top-left (slightly lighter) to bottom-right (darker) for depth.
2. **Starfield** — a fixed, lightweight CSS-generated dot field (no JS, no canvas). Implemented as one or two stacked `radial-gradient` backgrounds with tiny white/cyan dots at varied opacities (0.15 / 0.35 / 0.7), masked by a radial fade so stars concentrate top-right and dissolve toward the CTA. Tile at ~120px. Optional: 4–6 slightly larger "hero" stars rendered as absolutely-positioned spans with a soft `box-shadow` glow.
3. **Directional glow** — replace the current single corner blob with two soft, offset blobs:
  - top-right: `bg-primary/25` blur-3xl (tighter, brighter — the "light source")
  - bottom-left: `bg-primary/10` blur-3xl (ambient bounce, ties to the globe)
   Both behind content, both `pointer-events-none`.
4. **Inner hairline border** — `ring-1 ring-white/[0.06]` on top of the existing `border-border` to give the card the same crisp inner edge as the reference image.
5. **Top edge highlight** — a 1px gradient line at the top (`bg-gradient-to-r from-transparent via-primary/40 to-transparent` absolute strip) to mimic the "rim light" in the Pro Plan card.

### Content-side adjustments (minimal)

- `text-secondary-foreground` → `text-white` (since base is now deep navy, not mid-grey).
- Eyebrow/metric labels stay `text-primary`.
- Body copy `opacity-90` → `text-white/80`, footnote → `text-white/60`.
- CTA button: keep current primary; no change.

## Out of scope

- No animation on the starfield (static — respects `prefers-reduced-motion` by default, and avoids competing with the rotating globe directly above).
- No changes to copy, layout, grid of three metrics, or the IBM link.
- No new dependencies — pure CSS/Tailwind.
- No changes to other sections or to `SectionBackdrop`.

## Files touched

- `src/pages/Index.tsx` — rewrite the case-study card's wrapper div + decorative layers + text color classes (one localized block, ~30 lines).
- *(Optional)* `src/index.css` — add `--surface-deep` token if we want this reusable; otherwise inline the HSL.

## Open question for you

Which **base tone** do you want?

- **A. Deep navy** (`hsl(220 40% 6%)`) — cool, ties to cyan primary, matches reference image most closely. this one
- **B. Near-black with cyan tint** (`hsl(195 30% 5%)`) — darker, more "infrastructure," still on-brand.
- **C. True black** (`#000`) — maximum contrast, most "Stripe/Linear," stars pop hardest.

Reply with A / B / C (or describe a different vibe) and I'll implement.