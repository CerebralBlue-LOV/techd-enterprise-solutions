## Make dark mode the default

Flip the site so first-time visitors land in dark mode, while keeping the existing toggle and respecting users who have already chosen a theme.

### Changes

1. **`src/hooks/use-dark-mode.ts`** — change the initial-state fallback so when there is no stored preference, default to `true` (dark) instead of reading `prefers-color-scheme`. Stored user choice still wins.

2. **`index.html`** — add a tiny inline script in `<head>` (before the app mounts) that reads `localStorage.theme` and adds the `dark` class to `<html>` immediately, defaulting to dark when nothing is stored. This prevents a white flash on first paint before React hydrates.

3. **`index.html` `<meta name="theme-color">`** — keep `#00B3E3` (it's the brand cyan, works on both themes), no change needed.

### Out of scope

- Not removing the toggle — users can still switch to light.
- Not changing any tokens in `src/index.css` — dark palette is already defined and tested.
- No content, layout, or component changes.
