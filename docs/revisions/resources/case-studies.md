# Case Studies — Revision Analysis

**Source audit:** `docs/audit/resources/success-stories.md`
**Scraped:** 2026-05-13 from `techd.com/resources-big-data-solutions/success-stories/`
**Current content file:** `src/content/resources.ts`

---

## 1. Extracted & Verified Data

Five legacy items from the "Success Stories" feed are genuine case studies and use products that remain current in 2026. All are anonymized (no client names), and no verified metrics exist on file.

| Legacy Title | Product(s) Referenced | 2026 Product Status | Practice | Vertical |
|---|---|---|---|---|
| Business Analytics for Big Pharma Sales and Marketing | IBM Cognos Analytics | Current (v12.1.2) | Data & Analytics | Healthcare |
| Data Warehouse for Large Hospital | Data warehouse (unspecified IBM stack) | Maps to Db2 + watsonx.data (both current) | Data & Analytics | Healthcare |
| Business Intelligence for Healthcare / Cancer Treatment Center | IBM Cognos Analytics | Current (v12.1.2) | Data & Analytics | Healthcare |
| Cognos Solution for Large University System | IBM Cognos Analytics | Current (v12.1.2) | Data & Analytics | Higher Education |
| Cognos TM1 BI for Major Communications Firm | IBM Cognos TM1 | Renamed → Planning Analytics v2.1.x (current) | Data & Analytics | Media & Entertainment (adjacent) |

**Already in `resources.ts` and verified:**
- "US retailer rebuilds on Db2, watsonx, NeuralSeek" (IBM-published, 2025) — the only fully sourced case study. No changes needed; keep `draft: false`.

---

## 2. Legacy Data Discarded

Items in the "Success Stories" feed that are not case studies, or reference deprecated products:

- **"IBM DataStage on Cloud Pak for Data – IBM & TechD Webinar July 22nd"** — mislabeled as a success story; this is a webinar announcement. Product is current but entry is not a case study.
- **"Making Data Ready for AI: IBM Cloud Pak for Data – Whitepaper"** — mislabeled as a success story; this is a whitepaper. Product is current but entry is not a case study.
- **"What's New with IBM Cognos Analytics 11.1.6? – Live Webinar May 7th"** — mislabeled as a success story; this is a version-update webinar. Version 11.1.6 is outdated (current: 12.1.2).
- Any entry referencing Watson Analytics as a standalone product — brand discontinued; merged into watsonx suite.
- Any entry referencing IBM BigInsights or Hadoop on Cloud — deprecated 2017–2018; no successor in `solutions.ts`.
- QRadar SaaS references — divested to Palo Alto Networks; SaaS EOL April–August 2026.

---

## 3. Solution Alignment

All five salvageable legacy case studies map to a single practice:

| Practice | Coverage |
|---|---|
| Data & Analytics | 5 of 5 legacy case studies |
| AI & Generative | None |
| Automation & FinOps | None |
| Security & Compliance | None |
| Hybrid Cloud | None |

**Vertical coverage from legacy:**
- Healthcare: 2 items (hospital data warehouse, cancer treatment center BI)
- Higher Education: 1 item (large university system)
- Media & Entertainment (adjacent): 1 item (major communications firm)
- Insurance, Public Sector, Energy & Utilities: no legacy coverage

The IBM-published retail case study (already in `resources.ts`) partially covers the retail vertical, which is not one of TechD's six target verticals. It is valid because it is IBM-sourced and references current products (Db2, watsonx, NeuralSeek).

---

## 4. Content to Update in `resources.ts`

The five legacy case studies can serve as structural placeholders but cannot be published verbatim because:
- Client names are absent (anonymized on techd.com)
- No verified metrics exist — do not invent or round up
- Product version references must be updated (Cognos 11.x → Cognos Analytics 12.x; TM1 → Planning Analytics 2.1.x)

**Required data structure for each placeholder entry:**

```ts
{
  type: "case-studies",
  title: string,           // practitioner-to-practitioner, no superlatives
  client: string,          // anonymized description (e.g., "Fortune 500 pharma company")
  vertical: string,        // one of TechD's six verticals
  products: string[],      // current IBM product names only
  outcome: string,         // ≤30 words, no invented metrics
  stats: [],               // empty until legal-approved metrics are provided — never invent
  slug: string,
  draft: true,
}
```

**Immediate action:** Add the five legacy case studies as `draft: true` placeholder entries in `resources.ts` using the structure above. They will not render on the site until `draft` is set to `false` after legal review.

**Version name corrections to apply:**
- "IBM Cognos TM1" → "IBM Planning Analytics"
- "Cognos 11.x" → "IBM Cognos Analytics" (drop version number unless 12.x is confirmed)
- "Data Warehouse" platform references → "IBM Db2" or "IBM watsonx.data" where context supports it

---

## 5. Gaps & Recommendations

Filtering the legacy data leaves three practices with zero case study coverage. When the six legal-approved case studies are written, prioritize these gaps in order:

**Priority 1 — AI & Generative (no coverage at all):**
- Healthcare or Higher Education: watsonx.ai + NeuralSeek RAG for institutional knowledge retrieval — demonstrate governed generative AI on sensitive data (HIPAA / FERPA angle)

**Priority 2 — Security & Compliance (no coverage at all):**
- Healthcare: IBM Guardium DDR deployment at a hospital network — data activity monitoring, breach detection, HIPAA audit trail
- Public Sector: IBM QRadar on-prem SIEM + IBM Resilient SOAR at a federal agency — incident response, FedRAMP compliance

**Priority 3 — Automation & FinOps (no coverage at all):**
- Insurance: IBM Turbonomic workload optimization reducing cloud spend — FinOps governance, PCI-DSS cost visibility
- Energy & Utilities: IBM Instana full-stack observability for grid operations — real-time APM, NERC-CIP compliance framing

**Note on the "6 approved case studies" scope item:** This is deferred per `docs/PROJECT-SCOPE.md` (legal review in progress). The data structures above define what is needed when that work resumes. Do not generate content to fill these gaps — wait for client-approved copy.
