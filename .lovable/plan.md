# Project Structure Refactor

Goal: turn the growing flat `src/components/` folder into a predictable, React-idiomatic structure that scales as we add pages and sections. Aligns with React docs guidance of "thinking in components" + colocation by feature, while keeping truly shared pieces in one obvious place.

---

## 1. New folder structure

```text
src/
  app/
    App.tsx                 # moved from src/App.tsx
    routes.tsx              # route table (extracted from App.tsx)
    providers.tsx           # QueryClient, Tooltip, Toaster wrappers
  pages/                    # route entrypoints — thin, compose sections
    Home.tsx                # renamed from Index.tsx for clarity
    Solutions.tsx
    Industries.tsx
    Services.tsx
    Resources.tsx
    Contact.tsx
    NotFound.tsx
  sections/                 # page-specific composed blocks (one file per section)
    home/
      HeroSection.tsx
      LogoStripSection.tsx
      SolutionsGridSection.tsx
      IndustriesGridSection.tsx
      FeaturedCaseStudySection.tsx
      WhyTechDSection.tsx
      FinalCtaSection.tsx
      _shared/              # decorative pieces only used on Home
        HeroBackdrop.tsx
        HeroParticleField.tsx
        ParticleGlobe.tsx
        CaseStudyCardBackdrop.tsx
    solutions/
      SolutionsHeroSection.tsx
      PracticesListSection.tsx
    industries/ services/ resources/ contact/   # same pattern
  layout/                   # chrome shared across every page
    Layout.tsx
    Header.tsx
    Footer.tsx
    NavLink.tsx
  shared/                   # cross-page reusable building blocks
    SectionHeading.tsx
    SectionBackdrop.tsx
    SectionMarker.tsx
    Reveal.tsx
    LogoStrip.tsx
    GeometricAccent.tsx
  seo/
    SEO.tsx
  ui/                       # shadcn primitives — untouched
  content/                  # typed data modules — unchanged
  hooks/  lib/              # unchanged
```

Rules:
- `pages/` never holds JSX longer than ~40 lines — it imports and composes sections.
- `sections/<page>/` is the home for anything used on exactly one page.
- Promote a component to `shared/` only when a second page imports it.
- `_shared/` inside a section folder = decorative/sub-pieces private to that page.

---

## 2. Section components (one file per block)

`pages/Home.tsx` becomes a thin composition:

```tsx
/** Page: Home — marketing landing, primary entry point. */
const Home = () => (
  <Layout>
    <SEO title="..." description="..." />
    <HeroSection />
    <LogoStripSection />
    <SolutionsGridSection />
    <IndustriesGridSection />
    <FeaturedCaseStudySection />
    <WhyTechDSection />
    <FinalCtaSection />
  </Layout>
);
```

Each section file owns its markup, local sub-components, and the `SectionMarker` (kept for the in-preview dev overlay).

---

## 3. Documentation pattern (replaces `data-section="home:why-techd"`)

Every section file starts with a JSDoc block. The `data-section` attribute is removed from JSX (it was a stringly-typed dev hint; the filename + JSDoc + `<SectionMarker>` cover the same purpose better).

```tsx
/**
 * Section: Home / Why TechD
 * Purpose: Build trust by stacking IBM Platinum credential + four
 *          differentiator cards (people, regulators, outcomes, multi-cloud).
 * Order:   6 of 7 on the Home page.
 * Data:    Inline (4 hardcoded cards). No CMS dependency.
 * Notes:   Background uses bg-muted/40 to break visual rhythm before the
 *          final CTA. Keep the IBM credential card prominent on the left.
 */
export const WhyTechDSection = () => { ... };
```

Inside the section, smaller JSDoc comments mark sub-blocks:

```tsx
{/* Credential card — IBM Platinum badge, do not restyle without brand sign-off */}
{/* Differentiator grid — 2x2 on sm+, single column on mobile */}
```

This gives me (the AI) and any future contributor explicit, greppable instructions instead of the cryptic `home:why-techd` slug.

---

## 4. Path aliases

Update `tsconfig.app.json`, `tsconfig.json`, and `vite.config.ts`:

```json
"paths": {
  "@/*":         ["./src/*"],
  "@app/*":      ["./src/app/*"],
  "@pages/*":    ["./src/pages/*"],
  "@sections/*": ["./src/sections/*"],
  "@layout/*":   ["./src/layout/*"],
  "@shared/*":   ["./src/shared/*"],
  "@ui/*":       ["./src/ui/*"],
  "@content/*":  ["./src/content/*"],
  "@hooks/*":    ["./src/hooks/*"],
  "@lib/*":      ["./src/lib/*"],
  "@seo/*":      ["./src/seo/*"]
}
```

Imports become self-documenting:

```tsx
import { Layout } from "@layout/Layout";
import { SectionHeading } from "@shared/SectionHeading";
import { Button } from "@ui/button";
import { SOLUTIONS } from "@content/solutions";
import { HeroSection } from "@sections/home/HeroSection";
```

---

## 5. Conventions enforced going forward

- **Named exports** for all section/shared components (default export only for page components, since react-router examples use them).
- **PascalCase filenames** match the export name.
- **One component per file** (sub-components used only inside that file are fine to colocate).
- **Sections end with `Section`**, backdrops with `Backdrop`, layout chrome lives in `layout/`.
- **Decorative-only** components (no logic, just visuals) live in `sections/<page>/_shared/` or, if reused, `shared/`.
- **No raw hex / no UI rewrites**: brand tokens and `ui/` primitives untouched.

---

## 6. Execution steps

1. Create new folders (`app/`, `sections/`, `layout/`, `shared/`, `seo/`).
2. Move existing files (no logic changes):
   - `App.tsx` → `app/App.tsx`; extract `routes.tsx` + `providers.tsx`.
   - `Layout/Header/Footer/NavLink` → `layout/`.
   - `SectionHeading/SectionBackdrop/SectionMarker/Reveal/LogoStrip/GeometricAccent` → `shared/`.
   - `SEO` → `seo/`.
   - `HeroBackdrop/HeroParticleField/ParticleGlobe/CaseStudyCardBackdrop` → `sections/home/_shared/`.
3. Update `tsconfig.*` and `vite.config.ts` aliases.
4. Split `pages/Index.tsx` into 7 files under `sections/home/`, then rewrite as thin composition + rename to `Home.tsx`. Update route in `routes.tsx`.
5. Repeat split for `Solutions.tsx` (2 sections) — leave the other 4 pages as-is for now since they're scaffolds; refactor when content lands.
6. Add JSDoc headers to every section + page file using the template above. Remove all `data-section="..."` attributes (keep `<SectionMarker>` calls).
7. Sweep imports project-wide to use the new aliases.
8. Verify dev preview renders identically and `npm test` still passes.

No new dependencies. No visual changes. Pure restructure + documentation pass.

---

## 7. Out of scope (intentional)

- No CMS/MDX migration.
- No splitting of `ui/` (shadcn convention is flat).
- No refactor of `Industries/Services/Resources/Contact` page bodies — they're still scaffolds; we'll section-split them when real content lands.
- No changes to `content/`, `hooks/`, `lib/`, or brand tokens.
