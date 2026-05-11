## Goal

Replace the current 3-column products grid on every practice page (`/solutions/:practice`) with a single, high-impact showcase: a left-side section heading paired with a tall, dark featured card on the right that auto-cycles through that practice's products. Reference video's vibe, our brand colors (cyan-only gradient on dark), our icons, our content.

## Layout (desktop, ≥lg)

```text
┌─────────────────────────────┬──────────────────────────┐
│ Eyebrow                     │  ┌────────────────────┐  │
│                             │  │ ◐ Category   pill ↗│  │
│ Big section title           │  │                    │  │
│ (text-5xl, bold)            │  │   PRODUCT NAME     │  │
│                             │  │   (focal display)  │  │
│ Subtitle paragraph          │  │                    │  │
│                             │  │   Tagline (bold)   │  │
│ [Talk to an expert →]       │  │   Description…     │  │
│ [View case studies]         │  │                    │  │
│                             │  │ ● ○ ○ ○ ○          │  │
│                             │  └────────────────────┘  │
└─────────────────────────────┴──────────────────────────┘
       5 cols of 12                  7 cols of 12
```

Mobile/tablet (<lg): stacks vertically — heading on top, card below, full width.

## The featured card

- Tall aspect (~4:5 desktop, auto on mobile), `rounded-3xl`.
- Background: near-black surface (`bg-secondary` shifted darker via a CSS-token-only overlay) with an off-center cyan radial glow — `radial-gradient(at 30% 20%, hsl(var(--primary)/0.55), transparent 60%)` layered over `hsl(var(--secondary)/0.95)`. All via tokens, no raw hex.
- Subtle inner ring (`ring-1 ring-white/10`) and a soft drop shadow.
- The glow's position shifts per slide (top-left, top-right, bottom-left…) so each rotation feels like the light moves — that's the "movement" the user asked for.

Card content, top to bottom:
1. **Chip row** — left: small circular badge with the practice motif icon + product category label (e.g. "Foundation models"). Right: pill showing the practice name + small `↗` arrow that links to the product page (or external URL).
2. **Focal display** — the product short name in a huge, condensed weight (e.g. `text-7xl md:text-8xl font-bold`), with a small up-right arrow next to it. This is the analogue to the "35%" in the reference.
3. **Body** — bold tagline, then light description (truncated to ~2–3 lines for consistent height).
4. **Dot pagination** — one dot per product, active dot wider (a `w-8` pill vs `w-2` circles), clickable.

## Motion

- **Auto-advance** every 5s, pause on hover or when card is focused.
- **Slide transition**: content cross-fades + slides up 12px (200ms ease-out); the gradient glow re-positions via a 600ms transition so the light visibly drifts to a new corner — this delivers the "kind of movement for each card" effect.
- **Respect `prefers-reduced-motion`**: disable auto-advance and reduce the transition to a plain opacity swap.
- Keyboard: ←/→ arrows cycle; dots are real buttons with `aria-label`.

## Data

- Source: existing `practice.products` from `src/content/solutions.ts` — no schema changes.
- The "category label" inside the chip comes from `practice.name` (consistent per practice). No new content fields needed.
- Icon in the chip reuses the practice's existing motif from `src/content/practice-motifs.ts` (one icon per practice, fine because all slides belong to the same practice).
- Link target: internal product → `/solutions/:practice/:slug`; external → the URL with `target="_blank"`.

## Files

- **Replace** `src/sections/solutions/ProductsGridSection.tsx` with the new showcase component (keep the same export name + filename so `_PracticePage.tsx` doesn't change). Section keeps `id="products"` and `scroll-mt-24` so existing anchors still work.
- **No changes** to `src/content/solutions.ts`, `src/pages/solutions/_PracticePage.tsx`, or anything else.

## Accessibility

- Section labeled by its heading.
- The card is a `region` with `aria-roledescription="carousel"` and `aria-live="polite"` for slide changes.
- Dots are `<button>` with `aria-label="Show product N of M"` and `aria-current` on the active one.
- Auto-rotation pauses on focus within the card, not just hover.

## Out of scope

- No new content fields, no copy rewrites, no changes to product detail pages.
- No new dependencies (no Embla, no Framer Motion) — plain React state + Tailwind transitions are enough for this effect.
