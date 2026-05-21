
## Goal

Add a dismissible "Ask me" speech bubble next to the chat launcher that nudges first-time visitors without becoming annoying — desktop only, route-aware, with smart cooldown logic.

## What gets built

### 1. New component: `src/components/chat/ChatCta.tsx`

A small speech-bubble card rendered to the left of the launcher.

- Copy: **"Not sure where to start? Ask me."** (heading) + tiny subline **"Senior practitioner, 1 business day."**
- Dismiss `×` in the top-right corner.
- Click the body → opens the chat (same handler as the launcher).
- Visual: rounded-2xl, `bg-background border border-border shadow-lg`, primary-tinted left edge, little tail/triangle pointing at the launcher.
- Mount animation: fade + 4px slide-up, 250ms. Respects `prefers-reduced-motion`.
- Position: `fixed bottom-24 right-6` (sits above the 56px launcher with 12px gap).
- Mobile (`<768px`): component returns `null`.

### 2. New hook: `src/components/chat/useChatCta.ts`

Encapsulates all visibility logic so `ChatWidget` stays simple.

State shape persisted in `localStorage` under key `techd:chat-cta:v1`:

```ts
{ dismissedAt: number | null, opened: boolean }
```

Inputs: `{ open: boolean, isMobile: boolean }` (the current chat state + viewport).
Output: `{ visible: boolean, dismiss: () => void, markOpened: () => void }`.

Show rules (all must be true):
1. Not mobile.
2. Chat is not currently open.
3. `opened` flag is false (never opened the chat on this device).
4. `dismissedAt` is null or older than 7 days.
5. Current route is not `/contact`.
6. Trigger fired: **scrolled past 60% of viewport height** OR **12s of idle** (no scroll/mousemove/keydown), whichever comes first.

Cleanup: trigger listeners detach as soon as `visible` flips true. Route change resets the trigger (so it re-arms on the next page) but never resets the persistence flags.

### 3. Wire into `ChatWidget.tsx`

- Call `useChatCta({ open, isMobile })`.
- Call `markOpened()` inside the existing `setOpen(true)` path (both via launcher click and via the CTA bubble click).
- Render `<ChatCta visible={visible} onOpen={() => { markOpened(); setOpen(true); }} onDismiss={dismiss} />` next to `<ChatLauncher />`.

### 4. No changes to `ChatLauncher`, `ChatPanel`, content files, or routing.

## Technical notes

- All colors via Tailwind tokens (`bg-background`, `border-border`, `text-secondary`, `text-primary`).
- Roboto Condensed (inherited).
- `localStorage` access wrapped in try/catch (Safari private mode, SSR safety — although this app is client-only).
- Route detection: `useLocation()` from `react-router-dom`.
- No new dependencies.

## Out of scope

- Analytics events for "shown / dismissed / clicked" (no analytics layer wired yet).
- A/B testing different copy.
- Server-side personalization.
