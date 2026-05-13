# Blog — Revision Analysis

**Source audits:** `docs/audit/resources/blogs-and-insights.md`, `docs/audit/resources/white-papers.md`
**Scraped:** 2026-05-13 from `techd.com/resources-big-data-solutions/`
**Current content file:** `src/content/resources.ts`

---

## 1. Extracted & Verified Data

Legacy items with topic angles that survive to 2026 because the underlying products are current. None can be ported verbatim — all require a full rewrite with current product versions and practitioner-to-practitioner framing.

| Legacy Title | Salvageable Angle | 2026 Product Update | Practice |
|---|---|---|---|
| "Cognos Analytics: The Answers You Need in One Place" | Governed self-service BI for enterprise teams | IBM Cognos Analytics v12.1.2 (current) | Data & Analytics |
| "Making Data Ready for AI: IBM Cloud Pak for Data" | AI readiness and data governance pipeline | Cloud Pak for Data v5.3 + watsonx.data (both current) | Data & Analytics |
| "IBM Planning Analytics for Cloud Pak for Data" | FP&A modernization on containerized infrastructure | Planning Analytics v2.1.x + Cloud Pak for Data v5.3 | Data & Analytics |
| "Improving Patient Outcomes with IBM Advanced Analytics" | Clinical data analytics in regulated healthcare environments | Reframe around Cognos Analytics 12 + watsonx.data | Data & Analytics + Healthcare |
| "IBM vs. AWS Competitive Analysis" | Decision-forcing competitive positioning for enterprise buyers | Needs full 2026 rewrite: watsonx suite vs. AWS SageMaker/Bedrock | Data & Analytics + AI & Generative |
| "Protecting Critical Data with IBM Guardium" | Data activity monitoring, compliance audit trails | IBM Guardium Data Protection v12.2.x (current) | Security & Compliance |

**Already in `resources.ts` and correctly scoped (`draft: true`):**
- "Building an Agentic AI Operating Model" — keep, no changes needed
- "watsonx Governance in Regulated Industries" — keep, no changes needed
- "Zero-Trust Data Access with Guardium and QRadar" — keep; note QRadar on-prem is current, SaaS was divested to Palo Alto (EOL April 2026) — confirm framing targets on-prem deployment

---

## 2. Legacy Data Discarded

| Discarded Item | Reason |
|---|---|
| "What's New with IBM Cognos Analytics 11.2.3 / 11.2.0 / 11.1.6 / 11.1" (all version announcements) | Version-specific release notes. Versions 11.1.x–11.2.x are outdated (current: 12.1.2); this format is product changelog, not practitioner content |
| "Hadoop in the Cloud" whitepaper | IBM BigInsights on Cloud deprecated 2017–2018; entire product line retired. Topic is dead. |
| "IBM SPSS Smarter Campus" whitepaper | SPSS Modeler is current (v18.x, 2026), but "Smarter Campus" is 2015-era IBM campaign language. Cannot be salvaged without a full rewrite — treat as a net-new topic |
| "IBM Concert and IBM Cognos TM1 — Improving Performance" whitepaper | IBM Concert is not in `solutions.ts` and is unverifiable as a current product. Discard entirely. |
| "Top Five Ways to Get Started with Big Data" whitepaper | Generic "Big Data" framing is 2013-era. Not practitioner-to-practitioner. No current product anchor. |
| "Integrating and Governing Big Data" whitepaper | Same issue as above. |
| "Simple is STILL Better" whitepaper | Title and framing untraceable to a current product or topic. No salvageable angle. |
| "BI Forward: A Full View of Your Business" whitepaper | Generic BI marketing from early Cognos era. No version reference, no delivery angle. |
| "Five Reasons Why the Right BI is like the Right Partner" whitepaper | Marketing analogy format. Not practitioner-to-practitioner. |
| "Emerge with Resiliency 2020" (event-specific content) | Past IBM-organized virtual event. Content is event ephemera, not a blog post. |
| All Watson Analytics references | Watson Analytics as a standalone product was merged into the watsonx suite; brand is discontinued. |
| "IBM Cognos TM1 on Cloud Solution Scalability" whitepaper | TM1 branding is legacy (now Planning Analytics 2.1.x). The scalability/cloud angle is still valid but requires a full rewrite under the Planning Analytics name. Treat as a net-new topic. |

---

## 3. Solution Alignment

Salvageable legacy topics cover two practices only:

| Practice | Coverage from Legacy |
|---|---|
| Data & Analytics | Cognos Analytics, Planning Analytics, Cloud Pak for Data, watsonx.data — 4 topics |
| Security & Compliance | Guardium — 1 topic |
| AI & Generative | None |
| Automation & FinOps | None |
| Hybrid Cloud | None (Cloud Pak for Data touches this tangentially) |

The three `draft: true` entries already in `resources.ts` partially address AI & Generative and Security & Compliance but leave Automation & FinOps (Instana, Turbonomic, Apptio) with zero blog coverage.

---

## 4. Content to Update in `resources.ts`

The six salvageable legacy topics should be added as **new** entries with `draft: true`. Do not port the original titles or body copy — use the legacy items only as topic anchors.

**Required data structure for each blog entry:**

```ts
{
  type: "blog",
  title: string,         // practitioner framing, ≤10 words, no superlatives
  summary: string,       // ≤40 words, lead with a specific claim or question
  tags: string[],        // practice names and/or product names
  products: string[],    // current IBM product names only
  publishedAt: string,   // ISO date — leave empty until published
  slug: string,
  draft: true,
}
```

**Version corrections to apply in any rewrite:**
- "Cognos Analytics 11.x" → "IBM Cognos Analytics 12" (or "IBM Cognos Analytics" without version if date is uncertain)
- "IBM Cognos TM1" → "IBM Planning Analytics"
- "IBM DataStage" → "IBM watsonx.data integration" (DataStage is the legacy brand name; current product is watsonx.data integration v2.1.x)
- "Watson Analytics" → "watsonx" (specify pillar: watsonx.ai, watsonx.data, or watsonx.governance)
- "Cloud Pak for Data v3.5 / v4.0" → "IBM Cloud Pak for Data v5.3"

---

## 5. Gaps & Recommendations

After filtering legacy content, Automation & FinOps has zero blog coverage and AI & Generative has only one `draft` entry in progress. Proposed net-new topics in priority order:

**Unaddressed practices:**

1. **"From DataStage to watsonx.data Integration: What the Rebrand Means for Your Pipelines"**
   Audience: data engineers managing active DataStage deployments who need a migration decision framework. Covers watsonx.data integration v2.1.x, GPU acceleration announcement (May 2026), and the path from legacy ETL jobs.
   Practice: Data & Analytics

2. **"IBM Cognos Analytics 12 vs. 11.2.x: What the April 2026 Support Cutoff Means"**
   Audience: Cognos administrators and BI leads on 11.2.x who face a real deadline. IBM moved 11.2.x to tiered support (Extended/Sustained) as of April 30, 2026. Decision-forcing and time-sensitive.
   Practice: Data & Analytics

3. **"FinOps is Not a Tool Problem: How Apptio + Turbonomic Close the Loop Between Observability and Budgets"**
   Audience: IT finance leads and cloud ops engineers. Positions TechD's cross-product expertise across Apptio (TBM, Cloudability), Turbonomic (workload optimization), and Instana (APM). No legacy equivalent exists.
   Practice: Automation & FinOps

4. **"Agentic AI in the Enterprise: How watsonx Orchestrate Connects to Your ERP Without an Integration Project"**
   Audience: CIOs and enterprise architects evaluating AI automation. Covers watsonx Orchestrate's 80+ app connectors and agentic control plane; distinguishes TechD's implementation role from out-of-box demos.
   Practice: AI & Generative

5. **"Planning Analytics 2.1: What Actually Changed for FP&A Teams"**
   Audience: FP&A analysts and finance systems leads. Covers the 2025–2026 Planning Analytics v2.1.x release, IDC MarketScape Leader recognition, and SaaS deployment options. Avoids vendor-speak; focuses on what changes operationally.
   Practice: Data & Analytics

6. **"IBM SPSS Modeler for AutoML: When You Don't Have a Data Science Team"**
   Replaces the discarded "IBM SPSS Smarter Campus" whitepaper with a practitioner-relevant angle. Targets analytics leads at mid-size healthcare and insurance organizations.
   Practice: Data & Analytics
