# TechD Solutions — Rebuild Rationale & Content Map

**Date:** 2026-05-05
**Based on:** `docs/SOLUTIONS-AUDIT.md` (audited against live techd.com)
**Implements:** 5 outcome-based practices, 20 internal product detail pages, 1 external redirect

---

## Why outcome-based, not product-based

The original techd.com Data Solutions navigation had **10 product-family sections:**

1. Automation
2. Enterprise Insights
3. IBM Business Intelligence
4. Watson Assistant
5. Data Science
6. Unified Governance and Integration
7. Hybrid Data Management
8. Security Intelligence
9. TechD CogSuite
10. IBM Cloud

This structure is IBM's internal taxonomy, not a buyer's taxonomy. Enterprise buyers don't search for "Unified Governance and Integration" — they search for "we need to pass our HIPAA audit" or "our Cognos dashboards are too slow." Organizing by IBM product family forces visitors to already know which product family solves their problem.

**The new structure organizes by outcome:**

| Practice | Outcome |
|---|---|
| AI & Generative Solutions | Ship trustworthy gen AI on top of governed enterprise data |
| Data & Analytics | Make your data AI-ready, governed, and defensible |
| Automation & FinOps | Observe everything, optimize spend, and eliminate manual toil |
| Security & Compliance | Pass the audit. Protect the data. Respond to the breach. |
| Hybrid Cloud & Infrastructure | Run mission workloads where they belong — and move them when you need to |

This collapses 10 navigation sections → 5, removes 7+ stale/404 pages from the IA, and lets the product list underneath each practice serve as proof of capability rather than primary navigation.

Each product still gets its own full detail page at `/solutions/<practice>/<product>` — the information depth is preserved, but the entry point is the outcome, not the product family.

---

## What is included

### Practice 1 — AI & Generative Solutions (`/solutions#ai`)

| Product | Justification |
|---|---|
| **watsonx.ai** | Rebranded from Watson Studio (Watson brand phased out post-2023). IBM's enterprise AI/ML platform is the foundation of all new TechD AI practice work. Central product — must be included. |
| **watsonx Assistant** | Rebranded from Watson Assistant (Watson brand → watsonx brand, 2023). TechD has deep delivery history (healthcare, media, public sector). The old techd.com sub-page returned 404 but the product is active and central. Folded into AI practice per audit recommendation. |
| **NeuralSeek** | TechD/Cerebral Blue partner product. RAG layer that operates on top of watsonx Assistant. Actively deployed. External link to neuralseek.com — no internal detail page because TechD is not the vendor. |
| **IBM Knowledge Catalog** | Rebranded from Watson Knowledge Catalog (Watson brand → IBM Knowledge Catalog, part of watsonx.governance). Active data governance product. Classified under AI practice because it governs the data and model assets that AI depends on. |

### Practice 2 — Data & Analytics (`/solutions#data-analytics`)

| Product | Justification |
|---|---|
| **IBM Db2** | Core TechD relational database product. Active across on-prem, cloud, and containerized deployments. Foundational to most client data architectures. |
| **watsonx.data / Cloud Pak for Data** | CP4D is the active IBM deployment platform (not deprecated — IBM shifted marketing to "watsonx" branding but CP4D is still the product name). watsonx.data is the lakehouse layer. Combined because they are deployed together. |
| **IBM DataStage** | Active ETL/ELT platform. Available as SaaS on IBM Cloud and on CP4D. Core TechD data pipeline product. |
| **Cognos Analytics** | One of TechD's two deepest legacy practices (15+ years). AI-powered BI platform. Active and current IBM product. |
| **Planning Analytics** | TechD's second deepest legacy practice. TM1-engine FP&A platform. Active and current. |
| **Cognos Controller** | Financial close and consolidation product. Narrower audience (CFO/finance) but active IBM product and confirmed TechD delivery offering. Included because it was specifically listed in the agreed new structure. |

### Practice 3 — Automation & FinOps (`/solutions#automation`)

| Product | Justification |
|---|---|
| **IBM Apptio** | IBM-acquired (2019). IT financial management / TBM platform. Active 2026. Three standalone TechD delivery pages on techd.com confirmed its practice-level presence. |
| **IBM Instana** | IBM-acquired (2020). Full-stack observability. Active 2026. |
| **IBM Turbonomic** | IBM-acquired (2021). Application Resource Management. Active 2026. |

### Practice 4 — Security & Compliance (`/solutions#security`)

| Product | Justification |
|---|---|
| **IBM Guardium** | Core IBM data security product. Active 2026. HIPAA/PCI/SOX compliance audit trail generation. No strategic risk. |
| **IBM QRadar** | On-premises QRadar is active and IBM-supported in 2026. Note: IBM sold the QRadar SaaS business to Palo Alto Networks in 2024 — the SaaS line is out of scope, but on-prem QRadar deliveries continue. Included with on-prem framing. |
| **IBM Resilient** | Absorbed into IBM QRadar Suite in IBM's commercial packaging, but the SOAR functionality is still available and TechD delivers it. Included alongside QRadar for the complete detect-respond story. |
| **IBM MDM** | Master Data Management is an active IBM product (MDM multi-domain, graph-based, cloud variants). "InfoSphere MDM" brand retired — use "IBM MDM" only. Included under Security & Compliance because MDM is a governance and compliance control (patient identity, PII master records). |
| **IBM Data Replication** | Log-based CDC (IIDR). Active IBM product. Key for zero-downtime migrations and hybrid mainframe data access. Included under Security & Compliance because it powers the data movement pipelines that support compliance architectures (mainframe offload, HIPAA data flow). |

### Practice 5 — Hybrid Cloud & Infrastructure (`/solutions#hybrid-cloud`)

| Product | Justification |
|---|---|
| **IBM Cloud** | Active 2026. The deployment target for watsonx.ai, Db2 on Cloud, and CP4D SaaS. Note: the existing techd.com cloud page references "IBM Cloud Private for Data" (deprecated name) — new site uses current naming only. |
| **Red Hat OpenShift** | Active 2026. Required runtime for all on-premises CP4D and watsonx deployments. Deep TechD delivery history. |
| **Mainframe Integration** | Not an IBM product per se — TechD's practice area for connecting IBM Z systems to modern cloud, AI, and data architectures using Db2 IIDR, z/OS Connect, and watsonx.data federation. Included as a product card because TechD has unique capability here and several clients have Z environments. |

---

## What is excluded and why

| Product | Audit Finding | Decision |
|---|---|---|
| **Watson AI Applications** | Sub-page returns 404. Pre-built IBM AI applications discontinued / absorbed into watsonx. | Excluded — product gone. Not rebuilding a page for a discontinued offering. |
| **Predictive SPSS** | Sub-page returns 404. IBM SPSS Statistics/Modeler still exists commercially but TechD's offering page is removed, indicating they no longer actively deliver this. | Excluded — TechD does not appear to offer this. Verify with TechD before reconsidering. |
| **Hadoop / IBM BigInsights** | IBM's Hadoop product (BigInsights) was discontinued. IBM routes these workloads through watsonx.data (open lakehouse on object storage). | Excluded — replaced by watsonx.data which is included. Do not create a "Hadoop" page. |
| **IBM Cloud Private for Data** | Predecessor product name to Cloud Pak for Data. Deprecated terminology. | Excluded — use "Cloud Pak for Data" or "watsonx.data" only. This name must not appear anywhere on the new site. |
| **IBM InfoSphere Information Server** | IBM is retiring the InfoSphere brand. Information Server's ETL functions have largely been superseded by DataStage. Sub-page still live on techd.com but content is stale. | Excluded — DataStage covers this territory and is active. Clients who ask about Information Server can be redirected to DataStage. |
| **CP4D System with IBM Performance Server** | Hardware appliance (hyper-converged infrastructure). Still sold but niche, and TechD's delivery model is software/services-focused. | Excluded — niche hardware product outside TechD's primary delivery scope. |
| **IBM Industry Data Models** | Pre-built sector data schemas. Still referenced by IBM but niche. TechD's offering page indicates it was a minor ancillary offering. | Excluded — insufficient evidence of active delivery. Verify with TechD if this should be reinstated. |
| **TechD CogSuite** | TechD's own proprietary Cognos administration tool. Not an IBM product. | Not excluded from the website entirely, but not treated as a solutions practice product. CogSuite should be featured as a "TechD differentiator" callout on the Cognos Analytics detail page — a reason to choose TechD over another Cognos partner, not a nav item of its own. |
| **IBM Cloud Pak for Data System with Performance Server** | Hardware appliance, niche, and separate from the software platform. | Excluded for same reason as above. |

---

## IBM brand naming rules applied

These naming decisions were made during the audit and applied consistently across all content:

| Old name (techd.com) | New name (this site) |
|---|---|
| Watson Assistant | watsonx Assistant |
| Watson Studio | watsonx.ai |
| Watson Knowledge Catalog | IBM Knowledge Catalog |
| IBM InfoSphere MDM | IBM MDM |
| IBM InfoSphere Data Replication | IBM Data Replication |
| IBM Cloud Private for Data | *Removed* (use Cloud Pak for Data or watsonx.data) |
| Any "Watson [product]" | Corresponding watsonx or IBM equivalent |
| "InfoSphere [product]" | Drop InfoSphere brand prefix; use current IBM product name |

---

## Route structure

```
/solutions                              → Practice index (5 sections)
/solutions#ai                          → AI & Generative Solutions anchor
/solutions#data-analytics              → Data & Analytics anchor
/solutions#automation                  → Automation & FinOps anchor
/solutions#security                    → Security & Compliance anchor
/solutions#hybrid-cloud                → Hybrid Cloud & Infrastructure anchor

/solutions/ai/watsonx-ai               → watsonx.ai detail
/solutions/ai/watsonx-assistant        → watsonx Assistant detail
/solutions/ai/ibm-knowledge-catalog    → IBM Knowledge Catalog detail
(NeuralSeek → external: neuralseek.com)

/solutions/data-analytics/ibm-db2              → IBM Db2 detail
/solutions/data-analytics/watsonx-data         → watsonx.data / CP4D detail
/solutions/data-analytics/ibm-datastage        → IBM DataStage detail
/solutions/data-analytics/cognos-analytics     → Cognos Analytics detail
/solutions/data-analytics/planning-analytics   → Planning Analytics detail
/solutions/data-analytics/cognos-controller    → Cognos Controller detail

/solutions/automation/ibm-apptio       → IBM Apptio detail
/solutions/automation/ibm-instana      → IBM Instana detail
/solutions/automation/ibm-turbonomic   → IBM Turbonomic detail

/solutions/security/ibm-guardium           → IBM Guardium detail
/solutions/security/ibm-qradar             → IBM QRadar detail
/solutions/security/ibm-resilient          → IBM Resilient detail
/solutions/security/ibm-mdm                → IBM MDM detail
/solutions/security/ibm-data-replication   → IBM Data Replication detail

/solutions/hybrid-cloud/ibm-cloud              → IBM Cloud detail
/solutions/hybrid-cloud/red-hat-openshift      → Red Hat OpenShift detail
/solutions/hybrid-cloud/mainframe-integration  → Mainframe Integration detail
```
