# About Us — Raw Page Content Audit

Verbatim scrape of every page in the legacy site's "About Us" mega-menu (per the dropdown screenshot from techd.com). Boilerplate "Featured Clients" logo grid and the global "TechD is dedicated to helping organizations gain truth from their data." CTA bar are stripped from each page file — they are identical across all pages and already captured in the services audit.

**Scraped:** 2026-05-13

## Pages

| # | Menu label | URL | File | Status |
|---|---|---|---|---|
| 1 | About Us | `/about-us/` | [about-us.md](./about-us.md) | 200 |
| 2 | Our Story | `/our-story/` | [our-story.md](./our-story.md) | 200 |
| 3 | IBM Business Partner | `/ibm-business-partner/` | [ibm-business-partner.md](./ibm-business-partner.md) | 200 |
| 4 | News and Events | `/news-and-events/` | [news-and-events.md](./news-and-events.md) | 200 |
| 5 | Our Customers | `/our-customers/` | [our-customers.md](./our-customers.md) | 200 |
| 6 | Contact Us | `/contact-us/` | [contact-us.md](./contact-us.md) | 200 |
| 7 | Depth of Experience | `/depth-of-experience/` | [depth-of-experience.md](./depth-of-experience.md) | 200 |

## Findings

- **`/about-us/`** returns 200 but the article body is empty — only the global tagline + Contact CTA + Featured Clients carousel render. There is no real "About" copy on this URL. The substantive About content lives on `/our-story/` and `/depth-of-experience/`.
- **`/our-story/`** contains the canonical company description, mission, and a long client list. Note the **internal contradiction**: the opening paragraph says "IBM Platinum Business Partner" but a later "Solutions" section still says "Premier IBM Business Partner" (a tier IBM has retired — current correct term is **Platinum**).
- **`/our-story/`** product references are pre-watsonx throughout: Watson Assistant / Discovery / NLU / Knowledge Catalog / "Watson Applications" / Tivoli / Hadoop / BigInsights — all need to become watsonx.* / Db2 Warehouse / etc. in any reused copy.
- **`/ibm-business-partner/`** also lists pre-watsonx product names (Watson Assistant, Discovery, NLU, Knowledge Catalog) and references "DB2 Warehouse" rather than current Db2 Warehouse on Cloud Pak / watsonx.data lakehouse.
- **`/our-customers/`** is essentially a logo gallery + brief Success Stories section; no narrative client case studies.
- **`/contact-us/`** lists the HQ location as "Miami, FL 33132" (no street address). Phone: `888-98-TECHD (83243)`. Emails: `info@techd.com` (general/technical), `sales@techd.com` (sales). Form fields: Name, Business Email, Company, Phone, Business Interest (dropdown), How did you hear about us? (dropdown), Message.
- **`/depth-of-experience/`** includes named **Management Team** profiles (President + VP of AI / Managing Partner) with headshots, tenures, prior employers, alma maters, and locations — captured verbatim per request.
- **`/depth-of-experience/`** also links a "Modern Slavery & Anti Human Trafficking Statement" PDF dated 2022.
- **`/news-and-events/`** is a long index of news/event/webinar/press-release tiles. The fetch was truncated by the preview tool's response-size limit; what was captured covers events back through ~2015. The full list is browseable on the live site if needed.
- One historical news item still surfaces an old HQ address (489 Devon Park Drive, Suite 318, Wayne PA 19087) — superseded by the current Miami HQ.
- **Legacy Claude/CLAUDE.md "no PII in commits" rule was explicitly waived for this audit per user instruction** so leadership names, emails, and phone numbers are present in the scraped files.
