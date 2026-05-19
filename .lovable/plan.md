# Chat panel UI refresh

Stay on-brand: cyan/gray/white only, Roboto Condensed only. Push depth, hierarchy, and surface quality.

## Scope

- `src/components/chat/ChatPanel.tsx` — new gradient header, refined empty state
- `src/components/chat/ChatMessage.tsx` — richer bubbles, AI avatar
- `src/components/chat/ChatComposer.tsx` — elevated input, send button polish

No new dependencies. No font changes.

## Header — bold gradient

- Full-width cyan gradient bar (primary → primary/70), 64px tall
- Bot icon in a frosted white/15 rounded-xl tile, left-aligned
- Title "Ask TechD" in white, bold, larger (text-lg)
- Subtitle "Powered by NeuralSeek" with a small pulsing dot for "Online" status
- Soft inner shadow at bottom edge for depth

## Empty state

- Replace plain bullet list with a small intro card: bot icon, "Hi — I'm the TechD assistant" headline, one-line subhead
- Starter prompts as 4 lifted cards (2-col grid on wider widths, stacked on narrow), each with a faint cyan border-glow on hover, leading micro-icon (Sparkles / Building2 / Briefcase / FileSearch)

## Messages

- AI bubbles: soft layered surface — `bg-white` with `border-border/50` and a subtle `shadow-[0_1px_2px_rgba(0,0,0,0.04)]`, plus a tiny cyan accent dot on the bubble's top-left
- User bubbles: keep cyan, add a soft outer glow `shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.35)]`
- Add a small Bot avatar next to AI messages (cyan circle, white icon)
- Loading dots: cyan-tinted instead of muted gray
- Citation chips: slightly larger, hover lifts background to `bg-primary/5`

## Composer

- Wrap input + button in a single rounded-2xl container with `border-border` and `focus-within:border-primary` + cyan glow ring
- Send button: cyan with the same soft glow shadow used on the launcher hover state
- Subtle helper line below: "Press Enter to send · Shift+Enter for newline" in muted xs

## Tokens / animation

- All colors via existing tokens (primary, secondary, muted, border) — no raw hex
- Reuse the launcher's cyan glow recipe: `shadow-[0_0_24px_2px_hsl(var(--primary)/0.35)]`
- Status dot: 2s pulse, `motion-reduce:animate-none`
- All transitions ≤300ms, ease-out

## Out of scope

- ChatLauncher (already redesigned)
- ChatWidget resize logic (already shipped)
- Brand tokens, font family, site-wide styles
