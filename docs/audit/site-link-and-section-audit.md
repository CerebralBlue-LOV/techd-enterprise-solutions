# Site link, redirect, and section-ID reference

This file is the canonical naming convention for section IDs and the verified inventory of the site's routes and redirects. Use it when adding new pages or sections.

Sources of truth:
- Route table: `src/app/routes.tsx`
- Nav + footer data: `src/content/site.ts`
- Section components: `src/sections/**`
- Shared page sections: `src/components/shared/page/*`

---

## 1. Redirect map

Every `<Navigate>` in `routes.tsx`, source → destination.

| Source | Destination |
|---|---|
| `/solutions` | `/solutions/ai-generative` |
| `/solutions/ai` | `/solutions/ai-generative` |
| `/solutions/automation` | `/solutions/automation-finops` |
| `/solutions/security` | `/solutions/security-compliance` |
| `/solutions/ai-generative/watsonx-assistant` | `/solutions/ai-generative` |
| `/solutions/ai-generative/ibm-knowledge-catalog` | `/solutions/ai-generative` |
| `/solutions/data-analytics/cognos-controller` | `/solutions/data-analytics` |
| `/solutions/data-analytics/ibm-mdm` | `/solutions/data-analytics` |
| `/solutions/security-compliance/ibm-mdm` | `/solutions/security-compliance` |
| `/solutions/security-compliance/ibm-data-replication` | `/solutions/security-compliance` |
| `/solutions/ai/:product` | `/solutions/ai-generative/:product` (dynamic via `LegacyProductRedirect`) |
| `/solutions/automation/:product` | `/solutions/automation-finops/:product` |
| `/solutions/security/:product` | `/solutions/security-compliance/:product` |
| `/services` | `/services/advisory` |
| `/industries` | `/industries/financial-services` |
| `/industries/insurance` | `/industries/financial-services` (intentional consolidation) |
| `/resources` | `/resources/case-studies` |
| `/company` | `/company/about` |
| `/company/customers` | `/company/about` |

All 19 redirects land on real, rendering pages.

---

## 2. Route inventory

| Route | Component |
|---|---|
| `/` | `Home` |
| `/solutions/ai-generative` | `AIGenerative` |
| `/solutions/data-analytics` | `DataAnalytics` |
| `/solutions/automation-finops` | `AutomationFinOps` |
| `/solutions/security-compliance` | `SecurityCompliance` |
| `/solutions/:practice/:product` | `ProductDetail` (unknown slug → inline `NotFound`) |
| `/services/advisory` | `Advisory` |
| `/services/implementation` | `Implementation` |
| `/services/managed-services` | `ManagedServices` |
| `/services/training` | `Training` |
| `/industries/healthcare` | `Healthcare` |
| `/industries/media-entertainment` | `MediaEntertainment` |
| `/industries/energy-utilities` | `EnergyUtilities` |
| `/industries/higher-education` | `HigherEducation` |
| `/industries/public-sector` | `PublicSector` |
| `/industries/financial-services` | `FinancialServices` |
| `/industries/manufacturing` | `Manufacturing` |
| `/resources/case-studies` | `CaseStudies` |
| `/resources/case-studies/:slug` | `CaseStudyDetail` |
| `/resources/blog` | `Blog` |
| `/resources/blog/:slug` | `BlogDetail` |
| `/resources/webinars` | `Webinars` |
| `/resources/webinars/:slug` | `WebinarDetail` |
| `/resources/events` | `Events` |
| `/resources/events/:slug` | `EventDetail` |
| `/company/about` | `About` |
| `/company/ibm-partnership` | `IBMPartnership` |
| `/company/delivery-methodology` | `DeliveryMethodology` |
| `/contact` | `Contact` |
| `*` | `NotFound` |

Nav (`site.ts`) and footer (built from `NAV`) reference these routes only — no orphan links.

---

## 3. Section ID naming convention

Rule: ids are page-local unique, kebab-case, semantic (describe what the section is, not where it sits). Add `scroll-mt-24` whenever a section is a deep-link target so it lands below the sticky header.

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
| 404 page body | `not-found` |

Shared wrappers (`PageHero`, `PageFinalCtaSection`, `PageApproachSection`) default to the canonical id for their kind. Only override when the page needs a non-standard anchor.
