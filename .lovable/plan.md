# Chat widget polish + new ChatFigure

Three changes, all visual/presentational. No backend or chat logic changes.

## 1. Reshape the chat widget

Today the chat opens as a full-height right-side `Sheet` (420px on desktop, full screen on mobile). It feels like a system panel, not a chat.

Switch desktop to a floating **rounded square card** anchored above the launcher button.

- Replace the `Sheet` in `ChatWidget.tsx` with a custom floating panel positioned `fixed bottom-24 right-6` (above the launcher).
- Default size: **`w-[420px] h-[600px]`**, `rounded-2xl`, `border border-border`, `shadow-2xl`, `bg-background`, `overflow-hidden`.
- Keep the launcher button as-is (it already toggles open/close).
- Add subtle open/close animation: fade + 8px translate-y, 200ms, respect `prefers-reduced-motion`.
- Mobile (`< 640px`): fall back to full-screen overlay (rounded only at top corners) so the keyboard doesn't fight the panel.
- Close on `Escape` and on outside click (keep current behavior parity).
- `ChatPanel` internals (`SheetHeader` / `SheetTitle`) get swapped for plain `div` + `h2` since we're dropping `Sheet`.

## 2. Make the chat resizable

Add a drag handle in the **top-left corner** of the panel that resizes width + height simultaneously (anchored to bottom-right, so it grows toward the top-left — natural for a bottom-right widget).

- Min: `320 x 480`. Max: `min(720, viewport-48) x min(840, viewport-120)`.
- Implementation: small `useState` for `{ width, height }`, pointer-down on the handle starts a `pointermove` listener that updates size deltas. No new dependency.
- Persist size to `localStorage` (`techd.chat.size`) so it survives reloads.
- Handle visual: 14x14 corner grip with two diagonal lines, `text-muted-foreground hover:text-primary`, `cursor-nwse-resize`, `aria-label="Resize chat"`.
- Hidden on mobile (panel is full-screen there).

## 3. New ChatFigure in Figure Lab

Add a wireframe figure in the same r3f language as the other solution figures (cyan edges, additive vertex points, slow rotation), themed as a chat bubble.

- New file: `src/components/shared/heroFigures/ChatFigure.tsx`.
- Geometry: a rounded chat-bubble shape — extruded rounded rectangle (`THREE.Shape` + `ExtrudeGeometry`) with a small triangular tail on the bottom-left. Rendered with `LineSegments` over `EdgesGeometry` (cyan `--primary`) and `Points` at the vertices (blue accent).
- Background tile in Figure Lab uses the existing grid; the user asked for cyan background + blue figure, so this tile overrides `GRID_STYLE` with a `bg-primary/10` (cyan tint) wrapper and the wireframe lines render in a deeper blue (`#1e40af` via a new token if needed — or reuse `--secondary`-adjacent blue).
- Add to `FigureLab.tsx` as a new card in a new "Chat" subsection (or appended to the main grid) labeled "Chat", code `ChatFigure`.
- Slow Y-axis rotation (~0.15 rad/s), matches the other figures' motion language. Respects `prefers-reduced-motion`.

## Technical notes

- Files touched:
  - `src/components/chat/ChatWidget.tsx` — replace `Sheet` with floating panel + resize state
  - `src/components/chat/ChatPanel.tsx` — swap `SheetHeader`/`SheetTitle` for plain markup
  - `src/components/shared/heroFigures/ChatFigure.tsx` — new
  - `src/pages/FigureLab.tsx` — add ChatFigure tile
- No new dependencies. Resize uses native pointer events.
- All colors via tokens (`bg-primary`, `border-border`, etc.) — no raw hex except inside the r3f figure where existing figures already use literal cyan.
- Keep all existing chat logic (`useChat`, `ChatComposer`, `ChatMessage`, starter prompts) unchanged.

## Out of scope

- No changes to chat behavior, prompts, citations, or NeuralSeek wiring.
- No dark mode, no new color tokens beyond what's already in the palette.
- No drag-to-move (only resize). Position stays anchored bottom-right.

Confirm and I'll implement.
