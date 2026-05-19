# Chat launcher refresh

Scope: `src/components/chat/ChatLauncher.tsx` only. No other files.

## Changes

1. **Shape** — Swap `rounded-full` for `rounded-2xl` (16px radius) so the button reads as a soft square at 56×56.
2. **Hover animation** — Replace the current `-translate-y-0.5` lift with a richer, on-brand interaction:
   - Idle: `rounded-2xl`, primary cyan fill, soft shadow.
   - Hover: scale to 1.05, shadow deepens, icon rotates ~12°, subtle cyan glow ring (`ring-2 ring-primary/30`).
   - Transition: 250ms ease-out on transform/shadow/ring; icon rotation 300ms.
   - Active (pressed): scale 0.96 for tactile feedback.
3. **Reduced motion** — Keep `motion-reduce:transition-none` and disable transform/rotation under `motion-reduce`.
4. **Accessibility** — Keep existing `aria-label`, `aria-expanded`, focus ring, and sr-only label untouched.

## Out of scope

- ChatWidget, ChatPanel, ChatComposer — unchanged.
- No new icons, no color token changes, no size change.
