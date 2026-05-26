# Dark Mode

How dark mode is structured in this codebase, where each kind of fix belongs, and which pages have been audited.

---

## The three-layer model

Dark mode lives at three layers. When something looks wrong, identify which layer owns the fix before you change anything.

### Layer 1 — Color tokens (`src/index.css`)

The single source of truth for color values. Every brand color, surface, text shade, and border lives here, paired light + dark.

- `:root` block defines light-mode values.
- `.dark` block defines dark-mode overrides.
- Each light value has a `/* dark: ... */` comment showing its dark counterpart so the pair reads as a table.
- Tokens propagate via Tailwind classes: `bg-background`, `text-foreground`, `border-border`, etc. (mapping is in `tailwind.config.ts`).

**Fix a token once → it flips everywhere.**

### Layer 2 — Component overrides (`dark:` Tailwind variants)

Use only when a component legitimately needs a hardcoded color that doesn't map to a token. Common cases:

- Glass-morphism rings (`ring-white/10` → `dark:ring-white/5`)
- Gradient stops that aren't token-based
- Image overlays, decorative SVGs

**Rule:** If you're typing `dark:text-white` and the light-mode side is also a token (`text-foreground`), stop and fix the token instead. `dark:` should only appear next to a hardcoded color.

### Layer 3 — Theme-aware assets (`logoOnDark` pattern)

For images that don't render on a dark background (dark-on-white client logos, photos with white backgrounds), use the existing `logoOnDark` field on the `Customer` type in `src/content/site.ts`. The `LogoStrip` component picks the right variant via `useDarkMode()`.

If you add new images that need a dark variant, follow the same pattern:
1. Add a `xOnDark?: string` field to the relevant content type.
2. Drop the dark-friendly asset into `public/images/.../white/`.
3. Pick the right one in the component via `useDarkMode()`.

---

## Decision tree

Something looks wrong in dark mode. Which layer do I fix?

- **All text on the page is the wrong color** → Layer 1. A token (`--foreground`, `--secondary`, `--muted-foreground`) is misconfigured in `.dark`.
- **A specific button, card, or border looks off** → Check what classes it uses.
  - Uses semantic tokens (`bg-background`, `border-border`) → Layer 1. Token is wrong.
  - Uses a Tailwind palette color (`bg-slate-100`, `ring-white/10`) → Layer 2. Add `dark:` override.
- **An image (logo, photo) is invisible on dark background** → Layer 3. Use the `logoOnDark` pattern.
- **A gradient or backdrop blur looks broken** → Usually Layer 2. Add `dark:` variants for the gradient stops.
- **A 3D scene / particle field looks wrong** → Check `src/sections/**/_components/`. Most use brand cyan which works on both modes. If it doesn't, the fix is component-local (Layer 2 in spirit).

---

## Audit checklist

Track which routes have been verified in dark mode. Status legend: `[ ]` not audited · `[~]` issues found, in progress · `[x]` verified clean.

### Top-level

- [ ] `/` — Home
- [ ] `/contact` — Contact
- [ ] `404` — NotFound

### Solutions

- [ ] `/solutions/ai-generative`
- [ ] `/solutions/data-analytics`
- [ ] `/solutions/automation-finops`
- [ ] `/solutions/security-compliance`
- [ ] `/solutions/infrastructure`
- [ ] `/solutions/:practice/:product` — ProductDetail (verify with at least 2 products)

### Services

- [ ] `/services/advisory`
- [ ] `/services/implementation`
- [ ] `/services/managed-services`
- [ ] `/services/training`

### Industries

- [ ] `/industries/healthcare`
- [ ] `/industries/media-entertainment`
- [ ] `/industries/insurance`
- [ ] `/industries/energy-utilities`
- [ ] `/industries/higher-education`
- [ ] `/industries/public-sector`

### Resources

- [ ] `/resources/case-studies`
- [ ] `/resources/blog`
- [ ] `/resources/webinars`
- [ ] `/resources/events`

When you finish auditing a page, replace the `[ ]` with `[x]` and note anything you changed in the commit message.

---

## Verification

How to test dark mode locally:

1. **Build clean:** `npm run build` must succeed.
2. **Dev server:** `npm run dev`, open the site, click the Moon/Sun toggle in the header. The whole site should flip.
3. **Persistence:** Refresh the page. The chosen mode should persist (stored in `localStorage` under `theme`).
4. **System preference (first visit):** Clear `localStorage`, set the OS to dark mode, reload. Site should start in dark mode automatically.
5. **Mobile:** Resize the viewport below `lg`. The toggle stays accessible next to the hamburger menu.
6. **Toggle icon:** Moon icon in light mode, Sun icon in dark mode.
7. **Reduced motion:** With `prefers-reduced-motion: reduce`, the toggle should not animate aggressively.

---

## Related files

| File | Role |
|---|---|
| `src/index.css` | Layer 1 — all color tokens, paired light/dark. |
| `tailwind.config.ts` | Tailwind ↔ token mapping. `darkMode: ["class"]` enables `.dark` strategy. |
| `src/hooks/use-dark-mode.ts` | Hook that toggles `.dark` on `<html>`, persists to `localStorage`, respects `prefers-color-scheme`. |
| `src/components/shared/DarkModeToggle.tsx` | Reusable Moon/Sun icon button. |
| `src/components/layout/Header.tsx` | Renders `<DarkModeToggle />` in the navbar. |
| `src/components/shared/LogoStrip.tsx` | Uses `logoOnDark` per partner when dark mode is active. |
| `src/content/site.ts` | `Customer.logoOnDark` field + asset paths for dark variants. |
