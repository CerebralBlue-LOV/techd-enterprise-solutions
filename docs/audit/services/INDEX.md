# Services — Raw Page Content Audit

Verbatim scrape of every page under `https://techd.com/services/` (legacy WordPress site). Boilerplate "Featured Clients" logo grid and global footer are omitted from each page file — they are identical across all pages and not relevant to content migration.

**Scraped:** 2026-05-13

## Pages

| # | URL | File | Status |
|---|---|---|---|
| 1 | `/services/` | [services.md](./services.md) | 200 |
| 2 | `/services/strategy-and-consulting/` | [strategy-and-consulting.md](./strategy-and-consulting.md) | 200 |
| 3 | `/services/strategy-and-consulting/solution-design/` | [strategy-and-consulting--solution-design.md](./strategy-and-consulting--solution-design.md) | 200 |
| 4 | `/services/strategy-and-consulting/implementation/` | [strategy-and-consulting--implementation.md](./strategy-and-consulting--implementation.md) | 200 |
| 5 | `/services/strategy-and-consulting/field-services/` | [strategy-and-consulting--field-services.md](./strategy-and-consulting--field-services.md) | 200 (empty body) |
| 6 | `/services/strategy-and-consulting/lifecycle-services-and-customer-success/` | [strategy-and-consulting--lifecycle-services-and-customer-success.md](./strategy-and-consulting--lifecycle-services-and-customer-success.md) | 200 |
| 7 | `/services/advisory-assessment-services/` | [advisory-assessment-services.md](./advisory-assessment-services.md) | 200 |
| 8 | `/services/advisory-assessment-services/analytics/` | [advisory-assessment-services--analytics.md](./advisory-assessment-services--analytics.md) | 200 |
| 9 | `/services/advisory-assessment-services/data-assessment/` | [advisory-assessment-services--data-assessment.md](./advisory-assessment-services--data-assessment.md) | 200 |
| 10 | `/services/advisory-assessment-services/security/` | [advisory-assessment-services--security.md](./advisory-assessment-services--security.md) | 200 |
| 11 | `/services/training/` | [training.md](./training.md) | 200 |
| 12 | `/services/technology-expertise/` | [technology-expertise.md](./technology-expertise.md) | 200 |
| 13 | `/services/techd-managed-services/` | [techd-managed-services.md](./techd-managed-services.md) | **404** |
| 14 | `/services/techd-ibm-ai-data-quick-start-advisory-service/` (singular) | [techd-ibm-ai-data-quick-start-advisory-service.md](./techd-ibm-ai-data-quick-start-advisory-service.md) | 200 |
| 15 | `/services/techd-ibm-ai-data-quick-start-advisory-services/` (plural) | [techd-ibm-ai-data-quick-start-advisory-services.md](./techd-ibm-ai-data-quick-start-advisory-services.md) | **404** |
| A1 | `/data-solutions/techd-cogsuite/` (linked from /services/) | [appendix--techd-cogsuite.md](./appendix--techd-cogsuite.md) | **404** |

## Findings

- **3 of 16 URLs return 404** on the live site (techd-managed-services, techd-ibm-ai-data-quick-start-advisory-services plural duplicate, techd-cogsuite). The Services page still links to all three. The plural Quick Start URL is a known dead duplicate of the singular version.
- **Field Services** (`/strategy-and-consulting/field-services/`) returns 200 but the body is empty — only the global "dedicated to helping organizations gain truth from their data" CTA + clients grid render. There is no Field Services copy on the legacy site.
- **CogSuite** is listed on the Services page tile grid but lives under `/data-solutions/`, and currently 404s.
- The Training page still says **"Premier IBM Business Partner"** — IBM retired that tier; the correct current term is **Platinum**.
- The Advisory page hero title is **"AI & Data Assessment Services"** (not "Advisory and Assessment Services" as the tile on `/services/` says).
