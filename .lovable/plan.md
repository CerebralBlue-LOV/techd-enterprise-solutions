# Add Children's Hospital of Philadelphia (CHOP)

## 1. Logo files
- Move `public/images/deprecated/chop.png` → `public/images/clients/light/chop.png`.
- Generate the white-on-transparent dark variant at `public/images/clients/dark/chop.png` via:
  `python3 scripts/generate-white-logos.py --src public/images/clients/light --out public/images/clients/dark --only chop`

## 2. Register in the single source of truth
Add a 14th entry to `CLIENTS` in `src/sections/clients-lab/clients-lab-data.ts`:

```ts
{
  name: "Children's Hospital of Philadelphia",
  url: "https://www.chop.edu",
  logo: L("chop.png"),
  currentLogo: L("chop.png"),
  currentLogoDark: D("chop"),
  defaultHeight: "h-10", // tuned later in /clients-lab if needed
}
```

This automatically propagates to the home `LogoStrip` (re-derived in `src/content/site.ts`).

## 3. Industry assignment — Healthcare only
In `src/content/industries-extras.ts`, add `"Children's Hospital of Philadelphia"` to the `healthcare.clients[]` array (must match the `name` exactly). No change to Higher Education.

## 4. Verify
- Visit `/` → confirm CHOP appears in the home carousel (light + dark mode).
- Visit `/industries/healthcare` → confirm CHOP appears in "Clients we serve" alongside MSK and Jefferson.
- Visit `/clients-lab` → confirm it renders cleanly in both Light and Dark panels; adjust `defaultHeight` if the optical size is off.

## Out of scope
- No copy, layout, or carousel UI changes.
- No edits to other industries.
- Deprecated `partners-2025/childrens-health.svg` (Children's Health Dallas) stays retired.
