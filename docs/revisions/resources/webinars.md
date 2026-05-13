# Webinars — Revision Analysis

**Source audits:** `docs/audit/resources/events-and-webinars.md`, `docs/audit/resources/blogs-and-insights.md`, `docs/audit/resources/past-events.md`
**Scraped:** 2026-05-13 from `techd.com/resources-big-data-solutions/`
**Current content file:** `src/content/resources.ts`

---

## 1. Extracted & Verified Data

Legacy webinars where the core topic remains valid in 2026 because the underlying product is current. None can be re-hosted as-is — all require rewritten titles and descriptions with current product names and versions.

| Legacy Title | Salvageable Topic | Product Update | Practice |
|---|---|---|---|
| "Protecting Critical Data with IBM Security Guardium Solutions" (March 2019) | Data activity monitoring, compliance audit trails, insider threat detection | IBM Guardium Data Protection v12.2.x (current) | Security & Compliance |
| "Improving Business Foresight and Performance with IBM Planning Analytics" (March 2022) | FP&A modernization, rolling forecasts, budget cycle automation | Planning Analytics v2.1.x (current; IDC MarketScape Leader 2026) | Data & Analytics |
| "Business Foresight & Performance with IBM Planning Analytics" (Nov 2018, March 2019) | Same FP&A topic; two prior instances validate audience demand for this format | Planning Analytics v2.1.x | Data & Analytics |
| "IBM Cognos Analytics for IBM Cloud Pak for Data" | Governed BI on containerized OpenShift infrastructure | Cognos Analytics 12 + Cloud Pak for Data v5.3 (both current) | Data & Analytics |
| "IBM DataStage on Cloud Pak for Data" (July 2020) | ETL/ELT pipeline modernization on hybrid cloud | DataStage → now watsonx.data integration v2.1.x (current, GA April 2025) | Data & Analytics |
| "Improving Organizational Performance & Patient Outcomes with IBM Advanced Analytics" (April 2019) | Clinical analytics, healthcare BI, regulated data environments | Reframe around Cognos Analytics 12 + watsonx.data; drop "Advanced Analytics" brand name | Data & Analytics + Healthcare |

**Already in `resources.ts` and correctly scoped (`draft: true`):**
- "AI Agents in the Audit: watsonx Orchestrate for Finance Controls" — keep, correctly targets AI & Generative + Finance vertical
- "From Data Lake to Data Product: watsonx.data in 90 Minutes" — keep, correctly targets Data & Analytics

---

## 2. Legacy Data Discarded

| Discarded Item | Reason |
|---|---|
| "What's New with IBM Cognos Analytics 11.2.3 / 11.2.0 / 11.1.6 / 11.1" (all version webinars) | Version-specific product announcements. All versions (11.1.x–11.2.x) are outdated; current is 12.1.2. Format has no on-demand value in 2026. |
| "What's New in IBM Cloud Pak for Data v4.0 / 3.5" | Version-specific announcements. Outdated (current: v5.3). No practitioner value in 2026. |
| "Run Analytics Faster with IIAS: IBM Next Generation Analytics Warehouse" (Feb 2019) | IIAS (Integrated Analytics System) is not in `solutions.ts` and is not verifiable as a current IBM product offering. |
| "On-Demand: The Future of Healthcare and the Transition to Big Data" | "Big Data" framing is 2015-era positioning language. No current product anchor; not practitioner-to-practitioner. |
| "On-Demand: Transform Retail with IBM Big Data Solutions" | Same "Big Data" framing issue. Retail is also not one of TechD's six target verticals. |
| "On-Demand: What Universities are Doing for Competitive Advantage" | Generic IBM marketing piece with no TechD delivery angle or product specificity. |
| "On-Demand: Big Data – What It Means To You" | Technology-era branding. No product anchor. |
| "On-Demand: A Practical Guide to Upgrading to Cognos 11" | Obsolete migration path (Cognos 10 → 11). The relevant migration path in 2026 is Cognos 11.2.x → 12. |
| "TechD Virtual Lunch and Learn: IBM vs. AWS Competitive Analysis" (April 2022) | Competitive deck format, not a practitioner webinar. Content would need a full rebuild for 2026 (watsonx vs. SageMaker/Bedrock framing). |
| "Webinar: Cognos Analytics and Power BI Comparison" | Competitive comparison format. Content is outdated for 2026 feature sets; requires full rebuild. Can re-approach as a net-new webinar. |
| "Star Analytics" on-demand webinar | Star Analytics is a third-party Cognos add-on not in `solutions.ts`. Discard. |
| "Emerge with Resiliency 2020" IBM virtual event | Past IBM-organized community event. Not a TechD-produced webinar. |
| All Watson Analytics webinars | Watson Analytics brand discontinued; product merged into watsonx suite. |
| QRadar SaaS webinars (if any) | QRadar SaaS divested to Palo Alto Networks; SaaS EOL April–August 2026. Any new QRadar webinar must target on-prem deployment only. |

---

## 3. Solution Alignment

Salvageable legacy webinars cover two practices:

| Practice | Coverage from Legacy |
|---|---|
| Data & Analytics | Planning Analytics (FP&A), Cognos + Cloud Pak for Data (BI), DataStage/watsonx.data (ETL), Healthcare BI — 5 topics |
| Security & Compliance | Guardium (data protection) — 1 topic |
| AI & Generative | None |
| Automation & FinOps | None |
| Hybrid Cloud | Cloud Pak for Data (tangential) — 1 topic |

The two `draft: true` entries already in `resources.ts` partially address AI & Generative (watsonx Orchestrate, watsonx.data) but leave Automation & FinOps (Instana, Turbonomic, Apptio) with zero webinar coverage.

---

## 4. Content to Update in `resources.ts`

The six salvageable legacy webinar topics should be added as **new** entries with `draft: true`. Do not port original titles, descriptions, or registration URLs — those events are past and the techd.com URLs will not survive migration.

**Required data structure for each webinar entry:**

```ts
{
  type: "webinars",
  title: string,             // practitioner framing, ≤12 words, no superlatives
  description: string,       // ≤50 words, lead with the operational problem the webinar solves
  products: string[],        // current IBM product names only
  date: string | null,       // ISO date if scheduled; null for on-demand
  registrationUrl: string | null,  // null until event is confirmed and registered
  draft: true,
}
```

**Product name corrections to apply in all new titles/descriptions:**
- "IBM Cognos TM1" → "IBM Planning Analytics"
- "IBM DataStage" → "IBM watsonx.data integration"
- "IBM Advanced Analytics" → remove; replace with the specific product (Cognos Analytics, SPSS Modeler, etc.)
- "IBM Cloud Pak for Data v3.5 / v4.0" → "IBM Cloud Pak for Data v5.3"
- "Watson Analytics" → "watsonx" (with the appropriate pillar suffix)

---

## 5. Gaps & Recommendations

After filtering, Automation & FinOps and AI & Generative are underserved. Proposed net-new webinar topics in priority order:

1. **"Deploying NeuralSeek on watsonx: RAG Architecture for Regulated Industries"**
   Format: 60-minute technical deep-dive + live Q&A. Targets solution architects and data engineers at healthcare and public sector organizations. Covers multi-LLM RAG pipeline, citation governance, and HIPAA / FedRAMP deployment constraints.
   Practice: AI & Generative | Products: NeuralSeek, watsonx.ai

2. **"Turbonomic + Instana: From APM Alert to Cloud Cost Reduction in One Workflow"**
   Format: 45-minute demo with live environment. Connects Instana's 100% trace capture to Turbonomic's AI-driven workload optimization — showing the full Automation & FinOps chain end-to-end. No legacy equivalent.
   Practice: Automation & FinOps | Products: IBM Instana, IBM Turbonomic

3. **"Planning Analytics 2.1 Migration: Moving Your TM1 Models to SaaS"**
   Format: 60-minute hands-on lab. Targets FP&A teams and finance systems leads on Planning Analytics on-prem who need a migration decision framework. Covers the 2025–2026 release, SaaS deployment, and IBM's IDC MarketScape Leader positioning.
   Practice: Data & Analytics | Products: IBM Planning Analytics

4. **"Guardium DDR in Practice: Detecting Insider Threats in Hybrid Multi-Cloud"**
   Format: 45-minute demo. Covers IBM Guardium Data Detection & Response (DDR) — discovery, classification, real-time threat detection across on-prem, AWS, and Azure. Anchored to HIPAA and PCI-DSS compliance scenarios.
   Practice: Security & Compliance | Products: IBM Guardium

5. **"Cognos Analytics 12: Agentic AI Agents for Self-Service BI"**
   Format: 45-minute product walkthrough. Covers the 2026 AI agent features in Cognos Analytics 12.1.2 — natural language query, automated insight generation, governance controls. Targets Cognos administrators managing the 11.2.x → 12 migration.
   Practice: Data & Analytics | Products: IBM Cognos Analytics
