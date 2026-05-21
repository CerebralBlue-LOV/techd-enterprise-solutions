## Goal

Replace the right-side `Sheet` that hosts the assistant with a **floating chat popover** anchored to the launcher button — similar to Intercom / Crisp / Drift. Smaller footprint, doesn't cover the page, feels conversational instead of dashboard-like.

## What changes

### 1. `ChatWidget.tsx` — drop the Sheet, render a floating panel

- Remove `Sheet`, `SheetContent`, the drag-to-resize logic, and `MIN_WIDTH/MAX_WIDTH/DEFAULT_WIDTH` width state.
- Render the panel as a `fixed` positioned card directly in the widget, anchored bottom-right above the launcher:
  - Desktop: `width: 400px`, `height: min(640px, calc(100vh - 7rem))`, positioned `bottom-24 right-6`.
  - Mobile (`useIsMobile`): full-width with a small inset (`left-3 right-3 bottom-20`), height `calc(100vh - 6rem)` — still floating, not a Sheet takeover.
- Keep open/close state and `ChatCta` / `ChatLauncher` exactly as today.
- Add a subtle enter/exit: scale `0.96 → 1`, opacity `0 → 1`, translate-y `8px → 0`, 200ms ease-out; respect `prefers-reduced-motion`.
- Close on `Escape`. Click-outside stays **disabled** (matches Intercom — user closes via the launcher X or header close button).
- Use the existing brand shadow vocabulary: `rounded-2xl`, `border border-border/60`, `shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.35),0_8px_24px_-12px_rgba(0,0,0,0.12)]`.

### 2. `ChatPanel.tsx` — tighten for the smaller frame

- Header stays gradient but slimmer: `py-3.5`, `text-base` title, `text-xs` subtitle. Add a small close button (X) on the right next to the reset button (since we no longer get one from `SheetContent`).
- Reduce intro card padding (`p-4`), starter prompts collapse to **single column always** (the panel is narrow now).
- Composer keeps current styling.
- Add `rounded-2xl overflow-hidden` to the root so the gradient header clips cleanly to the floating card's corners.

### 3. `ChatLauncher.tsx` — no logic change

- Keep position, size, sheen animation. The launcher continues to toggle `open`.

### 4. Cleanup

- Remove unused `Sheet` import path from the chat folder.
- No changes to `useChat`, `useChatCta`, `ChatMessage`, `ChatComposer`, `ChatCta`, or `types.ts`.

## Layout reference

```text
                          ┌─────────────────────────┐
                          │ TechD Assistant     ↺ × │  ← slim gradient header
                          ├─────────────────────────┤
                          │                         │
                          │   messages / intro      │  ← 400 × 640 max
                          │                         │
                          ├─────────────────────────┤
                          │ [ composer ........  →] │
                          └─────────────────────────┘
                                              ●        ← launcher (unchanged)
```

## Out of scope

- No copy changes, no new starter prompts, no model/API changes.
- Resize handle is removed (the floating chat is a fixed size — matches the pattern). If you want resize back later we can add a corner grabber.
- Desktop "dock to side" toggle not included; can be added as a follow-up if needed.

## Files touched

- `src/components/chat/ChatWidget.tsx` — rewrite render block, remove resize state.
- `src/components/chat/ChatPanel.tsx` — tighten header, add close button prop, single-column prompts, rounded clipping.
- (No other files.)
