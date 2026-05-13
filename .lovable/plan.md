# Refine Solutions Why section

Four small edits to `src/sections/solutions/WhyPracticeSection.tsx`:

1. **Remove the dot-grid backdrop** entirely (the masked `radial-gradient` div).
2. **Smoother quote swap.** Replace the current key-remount + `animate-fade-in` (which reads as an abrupt cut) with a true cross-fade:
   - Track an `outgoing` and `incoming` point in state. On click, fade the current quote out (opacity + 4px translate-y down, ~200ms), then fade the new one in (opacity + 4px translate-y up, ~250ms). Implemented with a single `useEffect` + a transition flag, or with an `AnimatePresence`-style two-pass render using plain Tailwind `transition-all duration-300 ease-out`.
   - Respect `prefers-reduced-motion` — instant swap when reduced.
3. **Remove the cyan top hairline** on each ledger note (the `absolute inset-x-0 top-0 ...` span and its inner `bg-primary` fill).
4. **Replace the "§ Next · Products" seam** with a single full-width hairline (`h-px bg-border`) — no label, no split.

No content, route, or other-file changes. Brand palette only.
