# Logo links + active section highlighting

Two small UX fixes across header (desktop + mobile sheet) and footer.

## 1. Make TechD logo a link to home

**Footer (`src/components/layout/Footer.tsx`)**
- Wrap the `<img src={logo} ... />` in a `<Link to="/" aria-label="TechD home">`. Currently it's a plain img.

**Mobile nav sheet (`src/components/layout/Header.tsx`)**
- Inside `<SheetContent>`, the header logo is a bare `<img>`. Wrap it in `<Link to="/" aria-label="TechD home">` and trigger `setOpen(false)` on click so the sheet closes after navigation.
- Desktop header logo already links to `/` — no change.

## 2. Highlight the active section

Active = current pathname matches the link's section. For top-level nav groups (Solutions, Industries, Services, Resources, Company), active = pathname starts with that section's base (`/solutions`, `/industries`, etc.). For leaf links (footer columns, dropdown children, mobile sheet children), active = exact pathname match.

**Desktop header (`Header.tsx`)**
- Compute `isActiveSection(item)` from `useLocation().pathname`:
  - If `item.children`, active when pathname starts with the section root derived from the first child's href (e.g. `/solutions`).
  - If leaf (`Company` has direct href), exact match.
- Apply `text-primary` to the trigger button / NavLink when active (replaces only the idle `text-secondary`). Keep existing hover/open styles.
- Inside the open dropdown panel, mark the child whose `href === pathname` with `text-primary` and a subtle `bg-accent/50`.

**Mobile sheet (`Header.tsx`)**
- Same rules: group label gets `text-primary` when active; child link gets `text-primary` on exact match.

**Footer (`Footer.tsx`)**
- For each column's child links, apply `text-primary` when `href === pathname`. Column heading stays as-is (footer headings aren't links).

## Implementation notes

- Centralize the logic in one small helper inside `Header.tsx` (and reuse the pathname-match snippet in `Footer.tsx`) — no new shared file needed for two call sites.
- Use `useLocation()` from `react-router-dom` (already imported in Header; add to Footer).
- Use `cn()` from `@/lib/utils` to conditionally add `text-primary`. Do not introduce new colors.
- `ProductDetail` routes (`/solutions/:practice/:product`) should still light up the parent `Solutions` group and the matching practice child via `startsWith` on the practice base.
- Respect existing classes — only swap the idle color token when active; keep `hover:text-primary` so non-active items still react.

## Out of scope

- No changes to nav data structure in `site.ts`.
- No new aria-current beyond what's needed: add `aria-current="page"` on the active leaf links for accessibility.
- No restyling of the dropdown panel or sheet beyond the active-state token swap.

## Verification

- `/` → all groups idle in header; footer has no active leaf.
- `/solutions/data-analytics` → header "Solutions" trigger is cyan; opening dropdown shows "Data & Analytics" highlighted; footer "Data & Analytics" link is cyan.
- `/solutions/ai-generative/some-product` → "Solutions" group + "AI & Generative Solutions" child both highlight.
- Mobile sheet on `/contact` → "Contact" child under Company is cyan; tapping the logo closes the sheet and lands on `/`.
