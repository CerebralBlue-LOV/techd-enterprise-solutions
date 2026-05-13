# Apply W2 (Pull-quote + ledger) to Solutions Why section, with click-to-promote animation + section divider

## Changes

### 1. Rewrite `src/sections/solutions/WhyPracticeSection.tsx` to the W2 layout

- Replace the current cyan-gradient hero card + 2×2 tiles with the **Pull-quote + ledger** treatment from `/section-lab` (W2):
  - Eyebrow `Why TechD · {practice.name}`
  - Large editorial pull-quote (the **active** point's `title`, wrapped in primary cyan curly quotes)
  - Body line under it = the active point's `body`
  - Faint dot-grid backdrop (same `radial-gradient(hsl(var(--border)) 1px, …)` as W2), masked to upper-left
  - Below: a **3-up ledger row** of the *non-active* points, separated by `md:divide-x divide-border`
- Brand palette only. No new tokens.

### 2. Make notes clickable with a "promote to quote" animation

- The active note is held in component state (`useState<number>(0)`, defaults to the first point).
- Each ledger note becomes a `<button>`. Clicking it sets that index as active, swapping it into the quote slot; the previous quote demotes into the ledger position vacated by the click.
- Animation:
  - The pull-quote area is keyed by `active` so React remounts it. A short cross-fade / lift uses Tailwind's existing `animate-fade-in` (`fade-in 0.3s ease-out` — already in `tailwind.config.ts`).
  - The ledger items get a `transition-all duration-300` on opacity + small `translate-y` so the reorder reads smoothly. To keep DOM simple, the ledger renders `points.filter((_, i) => i !== active)` and relies on React keys (the point's `title`) so unaffected items don't re-animate.
  - Hovered note gets a cyan top hairline + slight `-translate-y-0.5` to signal it's interactive.
  - All motion respects `prefers-reduced-motion` via Tailwind's built-in `motion-reduce:` variants on the transitions.
- Accessibility: each note button gets `aria-pressed={i === active}` and a visible focus ring (`focus-visible:ring-2 focus-visible:ring-primary`).

### 3. Section divider between Why and the next section

- After the section's content, render a thin **side-by-side divider rule** that visually closes Why and opens the next (`ProductsGridSection`):
  - Layout: `container-page`, single horizontal row split into two halves — left half `h-px bg-border`, right half `h-px bg-primary/40` (or vice versa), with a small mono micro-label (`§ 02 · Products`) sitting on the seam.
  - Lives inside the same `<section id="why">` so it doesn't affect the route or anchors.
  - Pure decorative — `aria-hidden="true"` on the rule itself; the label is plain text.
- This pattern stays local to this section for now; if you want it across all pages later, we can promote it into a shared `SectionSeam` component.

## Reuse / scope

- No changes to `_PracticePage.tsx`, content files, or any other section.
- No changes to Industries / Services Why sections — they keep the W2 lab proposal as a *reference* until you decide to roll the same treatment there too.
- `SectionMarker` and `Reveal` continue to be used; `HoverGridBackdrop` is no longer needed in this file (import removed).
- The `/section-lab` W2 stays as-is (it's the static reference).

## Out of scope

- Touching Industries/Services/Home Why sections.
- Building a shared `<WhySection>` primitive — defer until at least one more page adopts the same pattern.
- Editing `src/content/solutions-extras.ts` (uses existing `whyTitle` + `whyPoints` shape).
