# Site link, redirect, and section-ID audit

Read-only audit. No source files were modified. Use this report to plan the follow-up implementation PRs.

Sources of truth:
- Route table: `src/app/routes.tsx`
- Nav + footer data: `src/content/site.ts`
- Section components: `src/sections/**`
- Shared page sections: `src/components/shared/page/*`

---

## 1. Summary

| Area | Result |
|---|---|
| Routes defined | 47 (incl. 19 `Navigate` redirects, 5 lab routes) |
| Routes audited | 42 (lab routes excluded) |
| Broken internal links | **1** (`#talk` anchor on product pages) |
| Redirects landing on wrong/missing page | 0 |
| External `target="_blank"` missing `noopener` | **1** (`IBMPartnership.tsx`, rel="noreferrer" only) |
| "Talk to an expert" CTAs not following `btn-glow → /contact` standard | **2** (1 anchor link, 1 plain text link — see §4) |
| Section components total | 42 |
| Section components with explicit `id` | 27 |
| Section components missing `id` | **15** (but 4 of those render inside shared sections that already set `id` — net real misses: see §5) |

Bottom line: the link graph is healthy. Cleanup work is small and bounded. Section-ID coverage is the larger backlog.

---

## 2. Redirect map check

Every `<Navigate>` in `routes.tsx`, source → destination, with verification that the destination is a real route.

| Source | Destination | OK? |
|---|---|---|
| `/solutions` | `/solutions/ai-generative` | ✓ |
| `/solutions/ai` | `/solutions/ai-generative` | ✓ |
| `/solutions/automation` | `/solutions/automation-finops` | ✓ |
| `/solutions/security` | `/solutions/security-compliance` | ✓ |
| `/solutions/ai-generative/watsonx-assistant` | `/solutions/ai-generative` | ✓ |
| `/solutions/ai-generative/ibm-knowledge-catalog` | `/solutions/ai-generative` | ✓ |
| `/solutions/data-analytics/cognos-controller` | `/solutions/data-analytics` | ✓ |
| `/solutions/data-analytics/ibm-mdm` | `/solutions/data-analytics` | ✓ |
| `/solutions/security-compliance/ibm-mdm` | `/solutions/security-compliance` | ✓ |
| `/solutions/security-compliance/ibm-data-replication` | `/solutions/security-compliance` | ✓ |
| `/solutions/ai/:product` | `/solutions/ai-generative/:product` (dynamic via `LegacyProductRedirect`) | ✓ — lands on `ProductDetail`; `ProductDetail` returns `NotFound` if slug unknown, which is correct |
| `/solutions/automation/:product` | `/solutions/automation-finops/:product` | ✓ same |
| `/solutions/security/:product` | `/solutions/security-compliance/:product` | ✓ same |
| `/services` | `/services/advisory` | ✓ |
| `/industries` | `/industries/financial-services` | ✓ |
| `/industries/insurance` | `/industries/financial-services` | ✓ (intentional consolidation) |
| `/resources` | `/resources/case-studies` | ✓ |
| `/company` | `/company/about` | ✓ |
| `/company/customers` | `/company/about` | ✓ |

All 19 redirects land on real, rendering pages.

---

## 3. Route inventory

| Route | Component | Status |
|---|---|---|
| `/` | `Home` | OK |
| `/solutions/ai-generative` | `AIGenerative` | OK |
| `/solutions/data-analytics` | `DataAnalytics` | OK |
| `/solutions/automation-finops` | `AutomationFinOps` | OK |
| `/solutions/security-compliance` | `SecurityCompliance` | OK |
| `/solutions/:practice/:product` | `ProductDetail` | OK (unknown slug → `NotFound` inline) |
| `/services/advisory` | `Advisory` | OK |
| `/services/implementation` | `Implementation` | OK |
| `/services/managed-services` | `ManagedServices` | OK |
| `/services/training` | `Training` | OK |
| `/industries/healthcare` | `Healthcare` | OK |
| `/industries/media-entertainment` | `MediaEntertainment` | OK |
| `/industries/energy-utilities` | `EnergyUtilities` | OK |
| `/industries/higher-education` | `HigherEducation` | OK |
| `/industries/public-sector` | `PublicSector` | OK |
| `/industries/financial-services` | `FinancialServices` | OK |
| `/industries/manufacturing` | `Manufacturing` | OK |
| `/resources/case-studies` | `CaseStudies` | OK |
| `/resources/case-studies/:slug` | `CaseStudyDetail` | OK |
| `/resources/blog` | `Blog` | OK |
| `/resources/blog/:slug` | `BlogDetail` | OK |
| `/resources/webinars` | `Webinars` | OK |
| `/resources/webinars/:slug` | `WebinarDetail` | OK |
| `/resources/events` | `Events` | OK |
| `/resources/events/:slug` | `EventDetail` | OK |
| `/company/about` | `About` | OK |
| `/company/ibm-partnership` | `IBMPartnership` | OK |
| `/company/delivery-methodology` | `DeliveryMethodology` | OK |
| `/contact` | `Contact` | OK |
| `*` | `NotFound` | OK |

Nav (`site.ts`) and footer (built from `NAV`) reference these routes only — no orphan links.

---

## 4. Link issues found

### 4.1 BROKEN — `#talk` anchor (1 occurrence)

`src/sections/products/ProductHeroSection.tsx` defines a sticky in-page anchor list that includes:

```ts
{ href: "#talk", label: "Talk to an expert" }
```

No section on the product page renders `id="talk"`. The final CTA on product pages comes from the shared `PageFinalCtaSection`, which defaults to `id="cta"`. Clicking the chip is a no-op.

**Fix options** (pick one in a follow-up PR):
- Change the anchor to `#cta`.
- Or rename `PageFinalCtaSection`'s default `id` to `"talk"` site-wide (cleaner copy, but breaks any future external anchors built on `#cta`).
- Or replace the anchor chip with a `<Link to="/contact">` button so it follows the standard CTA route.

### 4.2 DEVIATION — "Talk to an expert" copy outside the `btn-glow` standard

The site memory rule: **every "Talk to an expert" CTA uses `<Button asChild className="btn-glow">` → `/contact`.** Two callsites deviate:

| File | Pattern | Notes |
|---|---|---|
| `src/sections/products/ProductHeroSection.tsx:28` | Sticky anchor chip `href="#talk"` | See §4.1 — also the wrong link kind for this copy |
| `src/sections/resources/ResourcesQuickLinksSection.tsx:46` | Plain inline text `<Link to="/contact" className="text-xs uppercase">Talk to an expert</Link>` | Visually intentional (small hairline header), but the copy reuses the standard CTA label. Either change the copy ("Contact us" / "Reach out") or promote to a `btn-glow` button. |

All other 9 callsites are compliant (`Header.tsx` desktop + mobile, `HeroSection.tsx`, `NotFound.tsx`, `PageFinalCtaSection.tsx` default, `ProductsGridSection.tsx`, `IndustryClientsSection.tsx`, `IndustryFederalCredentialsSection.tsx`, `IBMPartnership.tsx`, `ContactForm.tsx` submit).

### 4.3 MISSING `noopener` on `target="_blank"` (1 occurrence)

`src/pages/company/IBMPartnership.tsx:113` — IBM Partner Directory link uses `rel="noreferrer"` only. Should be `rel="noopener noreferrer"`. Every other external link in the codebase is correct.

### 4.4 In-page anchors — coverage check

All other `#anchor` link targets resolve to a section that exists:

| Anchor used | Where | Target id exists? |
|---|---|---|
| `/#solutions` | `Home.tsx` final CTA `secondary.to` | ✓ (`SolutionsGridSection` → `id="solutions"`) |
| `#overview` | `ProductHeroSection` | ✓ (`ProductOverviewSection`) |
| `#capabilities` | `ProductHeroSection` (AI only) | ✓ (`ProductCapabilitiesSection`) |
| `#use-cases` | `ProductHeroSection` | ✓ (`ProductUseCasesSection`) |
| `#why-techd` | `ProductHeroSection` | ✓ (`ProductWhyTechDSection`) |
| `#talk` | `ProductHeroSection` | ✗ — see §4.1 |

---

## 5. Section ID inventory

`id` values found on the root `<section>` element of each section component (or set via the `id` prop on a shared wrapper such as `DarkSection`). Shared sections that set a default `id` are listed as "renders with id (default)".

### 5.1 Home — `src/pages/Home.tsx`

| Render order | Component | id | Action |
|---|---|---|---|
| 1 | `HeroSection` | `hero` | keep |
| 2 | `LogoStripSection` | MISSING | **add** `logos` |
| 3 | `SolutionsGridSection` | `solutions` | keep |
| 4 | `EngineeredFieldSection` | `industries` | keep (note: the home grid for industries; not confused with `/industries` route) |
| 5 | `WhyTechDSection` | `why-techd` | keep |
| 6 | `PageFinalCtaSection` | `cta` (default) | keep |

### 5.2 Solutions practice pages — `src/pages/solutions/_PracticePage.tsx`

Applies to `/solutions/ai-generative`, `/solutions/data-analytics`, `/solutions/automation-finops`, `/solutions/security-compliance`.

| Render order | Component | id | Action |
|---|---|---|---|
| 1 | `PracticeHeroSection` | MISSING | **add** `hero` |
| 2 | `WhyPracticeSection` | MISSING | **add** `why-practice` |
| 3 | `ProductsGridSection` | MISSING | **add** `products` |
| 4 | `IndustriesServedSection` | `industries` | keep |
| 5 | `ApproachSection` | MISSING | **add** `approach` |
| 6 | `PracticeCtaSection` | MISSING | **add** `cta` (or wire through `PageFinalCtaSection`) |

### 5.3 Services pages — `src/pages/services/_ServicePage.tsx`

Applies to `/services/advisory`, `/services/implementation`, `/services/managed-services`, `/services/training`.

| Render order | Component | id | Action |
|---|---|---|---|
| 1 | `ServiceHeroSection` | MISSING | **add** `hero` |
| 2 | `ServiceWhySection` | MISSING | **add** `why-service` |
| 3 | `ServiceSpotlightSection` | MISSING | **add** `spotlight` |
| 4 | `ServiceOfferingsSection` | `offerings` | keep |
| 5 | `ServiceMethodologySection` | MISSING | **add** `methodology` |
| 6 | `ServiceProductCoverageSection` | `coverage` | keep |
| 7 | `ServiceCrossLinksSection` | MISSING | **add** `cross-links` |
| 8 | `ServiceCtaSection` | MISSING | **add** `cta` |

### 5.4 Industries pages — `src/pages/industries/_IndustryPage.tsx`

Applies to all 7 industries (incl. `financial-services`, `manufacturing`).

| Render order | Component | id | Action |
|---|---|---|---|
| 1 | `IndustryHeroSection` | MISSING | **add** `hero` |
| 2 | `WhyIndustrySection` | MISSING | **add** `why-industry` |
| 3 | `IndustryFederalCredentialsSection` (public-sector only) | `credentials` | keep |
| 4 | `IndustryClientsSection` | `clients` | keep |
| 5 | `SolutionsForIndustrySection` | `solutions` | keep |
| 6 | `IndustryApproachSection` | MISSING | **add** `approach` |
| 7 | `IndustryOutcomesSection` | `outcomes` | keep |
| 8 | `IndustryCrossLinksSection` | MISSING | **add** `cross-links` |
| 9 | `IndustryCtaSection` | MISSING | **add** `cta` |

### 5.5 Product detail — `src/pages/ProductDetail.tsx`

| Render order | Component | id | Action |
|---|---|---|---|
| 1 | `ProductHeroSection` | MISSING | **add** `hero` |
| 2 | `ProductOverviewSection` | `overview` | keep |
| 3 | `ProductCapabilitiesSection` (AI only) | `capabilities` | keep |
| 4 | `ProductUseCasesSection` | `use-cases` | keep |
| 5 | `ProductWhyTechDSection` | `why-techd` | keep |
| 6 | `ProductRelatedSection` | MISSING | **add** `related` |
| 7 | `ProductCtaSection` | `cta` (default via `PageFinalCtaSection`) | keep |

### 5.6 Resources hub pages — `CaseStudies`, `Blog`, `Webinars`, `Events`

Each page composes its own list section locally (no shared section component) plus:

| Component | id | Action |
|---|---|---|
| Local list/grid `<section>` on each page | MISSING (all 4) | **add** `list` (or named: `case-studies`, `articles`, `webinars`, `events`) |
| `ResourcesQuickLinksSection` | `more` | keep |
| `PageFinalCtaSection` | `cta` (default) | keep |

Detail pages (`CaseStudyDetail`, `BlogDetail`, `WebinarDetail`, `EventDetail`) are composed of `PageHero` + a content `<section>` + `PageFinalCtaSection`. The body content sections are inline and lack ids; recommended **add** `body`.

### 5.7 Company pages

`/company/about` (`About.tsx`) renders multiple inline `<section>` and `DarkSection` blocks. Current ids found: `practices` (line 128), `methodology` (via `PageApproachSection` id prop). Others (hero, leadership, story, footer cta) are MISSING. Recommended:
- `hero`, `story`, `leadership`, `practices` (keep), `methodology` (keep), `cta` (already default on `PageFinalCtaSection`).

`/company/ibm-partnership` (`IBMPartnership.tsx`) renders many inline `<section>` blocks. None of the body sections have ids today; the final CTA is `cta` (default). Recommended ids in render order: `hero`, `credentials`, `practices`, `quick-start`, `cta`.

`/company/delivery-methodology` has `stages` (line 45) and `commitment` (line 218) plus `cta` default. Hero section MISSING. Recommended **add** `hero`.

### 5.8 Contact — `src/pages/Contact.tsx`

| Render order | Component | id | Action |
|---|---|---|---|
| 1 | `ContactHero` | MISSING | **add** `hero` |
| 2 | `ContactForm` | MISSING | **add** `contact-form` |
| 3 | `ContactInfo` | MISSING | **add** `contact-info` |
| 4 | `ContactMap` | MISSING | **add** `map` |
| 5 | `ContactLocationSection` | MISSING | **add** `locations` |

### 5.9 NotFound

Single inline `<section>`. Recommended **add** `not-found` (low value but completes the rule).

---

## 6. Naming convention (recommended, for approval)

If approved, this becomes the rule going forward and is enforced in the follow-up PR:

| Section kind | Canonical id |
|---|---|
| Page hero | `hero` |
| Customer logo strip | `logos` |
| Why TechD / Why <practice/industry/service> | `why-techd`, `why-practice`, `why-industry`, `why-service` |
| Capabilities / offerings | `capabilities`, `offerings` |
| Products / solutions grid | `products`, `solutions` |
| Industries served (on a solution page) | `industries` |
| Solutions for industry (on an industry page) | `solutions` |
| Approach / methodology | `approach`, `methodology` |
| Case study spotlight | `spotlight` |
| Clients / credentials | `clients`, `credentials` |
| Cross-links / related | `cross-links`, `related` |
| Final CTA | `cta` |
| Contact form / info / map / locations | `contact-form`, `contact-info`, `map`, `locations` |
| Resources list page body | `list` |
| Resources detail body | `body` |

Rule: ids are page-local unique, kebab-case, semantic (describe what the section is, not where it sits).

---

## 7. Recommended follow-up PRs

Each is small, independent, and safe to ship on its own.

1. **Fix the 3 link issues (one PR).** Repoint `#talk` to `#cta` (or to `/contact`), fix the `rel="noopener noreferrer"` on `IBMPartnership.tsx`, decide what to do with the Resources quick-link "Talk to an expert" copy.
2. **Add `id` to the 4 hero sections that are missing them** — `PracticeHeroSection`, `ServiceHeroSection`, `IndustryHeroSection`, `ProductHeroSection`. Highest leverage: enables `#hero` deep-links everywhere and makes the sticky nav idiom consistent.
3. **Add `id` to the 4 final/cta sections that don't go through the shared component** — `PracticeCtaSection`, `ServiceCtaSection`, `IndustryCtaSection`. (Product CTA already covered via `PageFinalCtaSection` default.)
4. **Add `id` to the remaining body sections** per §5 — methodology/approach/cross-links/why-* across solutions, services, industries.
5. **Add `id` to Contact sections** — small, isolated, useful for deep-links from email templates.
6. **Add `id` to company body sections** (About, IBMPartnership, DeliveryMethodology) — most inline `<section>` blocks here.

No source files were modified in this audit. Approve the naming convention in §6 and the follow-up PR list in §7 to proceed.
