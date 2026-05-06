# Industries Active Card — Premium Hover

Add a Uiverse-inspired hover treatment to the **active (center) card** of the industries stacked deck. Inspired by the reference, but in TechD's brand language: cyan instead of gold, restrained, no logo unfold.

## What changes

- File: `src/sections/home/_shared/IndustriesCarousel.tsx`, only the active card branch inside `StackedCard`.
- No new files, no new dependencies, no changes to peek cards or to the deck mechanics.

## The hover effect (3 layered moves)

1. **Inset border snap**
   - A second border sits at `inset: 14px`, color `hsl(var(--primary))`, opacity 0, rotated `4deg`, slightly scaled.
   - On hover: opacity 1, rotation 0, scale 1. 500ms ease-in-out.
   - Acts like a "frame inside the frame" — the signature beat from the reference.

2. **Diagonal light sweep (the trail)**
   - A thin diagonal cyan gradient band sweeps once across the card from top-left to bottom-right on hover-in.
   - Implemented via a pseudo-element-style `<span>` with `bg-gradient-to-br from-transparent via-primary/25 to-transparent`, `-translate-x-full` → `translate-x-full`, `skew-x-[-12deg]`, 900ms ease-out, single-shot per hover (re-triggers via `group-hover` + transition).
   - Same family as the existing "Read on IBM.com" button sweep, so it feels consistent.

3. **Eyebrow letter-spacing expand + caption fade**
   - The regulation eyebrow (e.g. "HIPAA · HITECH") gets `tracking-[0.2em]` → `tracking-[0.34em]` on hover, 500ms ease-out.
   - A small "Click to explore →" microcopy line under the existing CTA fades in (opacity 0→1, +6px translateY) on hover. The existing "See industry →" CTA remains as the primary affordance.

Plus: card lifts `-translate-y-1` and shadow deepens (`shadow-[0_28px_70px_-30px_hsl(var(--primary)/0.55)]`) on hover, replacing the current static shadow.

## Constraints respected

- Only the active card (`isActive === true`) gets the hover layers — peek cards stay quiet.
- All colors via tokens (`primary`, `secondary`, `muted-foreground`, `border`, `background`). No new hex.
- All transitions use existing easing patterns (`ease-out`, `cubic-bezier(0.22, 1, 0.36, 1)`).
- `prefers-reduced-motion`: skip rotation, skew, sweep, and translate. Keep only opacity changes and the border showing instantly.
- Pointer behavior unchanged — drag-to-swipe and click-to-activate continue to work because the new layers are `pointer-events-none`.

## Technical sketch

```text
<Link className="group ...">
  {/* existing motif + scrim + content */}

  {isActive && (
    <>
      {/* 1. Inset frame */}
      <span aria-hidden
            className="pointer-events-none absolute inset-[14px] rounded-xl border
                       border-primary opacity-0 rotate-[4deg] scale-[0.98]
                       transition-all duration-500 ease-in-out
                       group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100" />

      {/* 2. Diagonal sweep */}
      <span aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg]
                       bg-gradient-to-br from-transparent via-primary/25 to-transparent
                       transition-transform duration-[900ms] ease-out
                       group-hover:translate-x-full" />
    </>
  )}
</Link>
```

Eyebrow + microcopy use `group-hover:tracking-[0.34em]` and a sibling `group-hover:opacity-100` span.

## Out of scope

- Peek cards visuals, stacked-deck mechanics, dot indicators (already removed), other home sections.
