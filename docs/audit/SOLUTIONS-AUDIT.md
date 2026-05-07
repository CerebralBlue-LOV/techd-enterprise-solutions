# TechD — Data Solutions Audit
**Source:** https://techd.com/data-solutions/
**Audited:** 2026-05-05
**Purpose:** Catalog every product and sub-page listed under the live techd.com Data Solutions navigation. Used to decide what pages to build in the new site. Products flagged as deprecated or renamed should not be included without verification with TechD.

---

> **How to use this document**
> Each section matches one item in the Data Solutions navigation menu on techd.com.
> Sections with sub-pages (arrow icon in nav) are broken out into tables.
> Sections without sub-pages (flat nav item) are noted inline.
>
> **Status legend:**
> - ✅ Active in 2026 — confirmed current IBM product, safe to include
> - ⚠️ Verify — product exists but may have been rebranded, absorbed, or repositioned since this site was written
> - ❌ Deprecated / Discontinued — evidence the product or brand no longer exists as listed
> - 🔄 Rebranded — product still exists but IBM now sells it under a different name; use new name in new site

---

## 1. Automation
**Section URL:** https://techd.com/data-solutions/automation/

> **Note:** This entire practice area (FinOps, observability, resource management) has zero representation in our current placeholder solutions. These are 3 distinct, active IBM products — each with its own TechD delivery page. Decision needed: do we add Automation as a standalone practice section, or fold these into Hybrid Cloud?

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| IBM Apptio | Apptio Setup & Implementation Services | https://techd.com/apptio-setup-implementation-services/ | ✅ Active in 2026 — IBM acquired Apptio (2019), actively sold. Covers IT financial management, cloud cost allocation, FinOps. |
| IBM Instana | Real-Time Observability with IBM Instana | https://techd.com/real-time-observability-with-ibm-instana/ | ✅ Active in 2026 — IBM acquired Instana (2020). Full-stack observability, distributed tracing, AI-powered alerting. Current product. |
| IBM Turbonomics | IBM Turbonomic Cloud Cost Optimization | https://techd.com/ibm-turbonomic-cloud-cost-optimization/ | ✅ Active in 2026 — IBM acquired Turbonomic (2021). Application Resource Management (ARM), Kubernetes workload optimization. Current product. |

---

## 2. Enterprise Insights
**Section URL:** https://techd.com/data-solutions/enterprise-insights/

> **Note:** Cloud Pak for Data is the underlying platform that now hosts IBM's watsonx components. IBM marketing emphasis has shifted toward "watsonx" branding, but CP4D is not deprecated — it's the deployment vehicle. Worth naming both (CP4D + watsonx) in the new site to cover clients who know either name. DataStage is also available as a standalone SaaS offering.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| IBM Cloud Pak for Data | IBM Cloud Pak for Data | https://techd.com/data-solutions/enterprise-insights/ibm-cloud-pak-data/ | ⚠️ Verify — product is active and is the foundation for watsonx platform. IBM has been shifting marketing to "watsonx" branding since 2023. The CP4D name is still used commercially but new site should reference both. |
| IBM Cloud Pak for Data System with IBM Performance Server | IBM Cloud Pak for Data System with IBM Performance Server | https://techd.com/data-solutions/enterprise-insights/cloud-pak-data-system-with-ibm-performance-server/ | ⚠️ Verify — this is a hardware appliance (hyper-converged infrastructure). Still sold but niche. Confirm with TechD if they still actively deliver this or if it was a legacy offering. |
| IBM DataStage | IBM DataStage Integration | https://techd.com/data-solutions/enterprise-insights/ibm-datastage-integration/ | ✅ Active in 2026 — DataStage is current and available as SaaS on IBM Cloud and as part of CP4D/watsonx.data. Core ETL/data integration product. Actively sold. |

---

## 3. IBM Business Intelligence
**Section URL:** https://techd.com/data-solutions/ibm-business-intelligence/

> **Note:** All three products in this section are active and verified for 2026. Cognos Analytics and Planning Analytics are the two TechD has the deepest history with (15+ years). Cognos Controller is a financial close product — narrower audience than the other two but still a real TechD offering. All three should be included in the new site.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| Cognos Analytics | IBM Cognos Analytics — Business Intelligence | https://techd.com/data-solutions/ibm-business-intelligence-and-analytics/cognos-analytics/ | ✅ Active in 2026 — AI-powered BI and dashboarding. Core TechD offering. Current IBM product. |
| Planning Analytics | IBM Planning Analytics | https://techd.com/data-solutions/ibm-business-intelligence-and-analytics/ibm-planning-analytics/ | ✅ Active in 2026 — TM1 engine underneath. Budgeting, forecasting, planning. Core TechD offering with deep delivery history. |
| Cognos Controller | IBM Cognos Controller | https://techd.com/data-solutions/ibm-business-intelligence-and-analytics/cognos-controller/ | ✅ Active in 2026 — Financial close, consolidation, GAAP/IFRS reporting automation. Narrower audience (CFO/Finance). Confirm with TechD if still actively delivered. |

---

## 4. Watson Assistant
**Section URL:** https://techd.com/data-solutions/ai-chatbot/ *(returns 404 — page likely removed or restructured)*

> **Note:** The nav item exists but the sub-page is gone (404). This strongly suggests the "AI & Chatbot" section was reorganized or the content was absorbed elsewhere. Watson Assistant itself is NOT deprecated — IBM rebranded it to **watsonx Assistant** in 2023. The product is active and central to TechD's AI practice. However, because TechD also works with **NeuralSeek** (a RAG layer on top of watsonx Assistant, built by Cerebral Blue), these two are best presented together. No standalone "Watson Assistant" page needed — fold into the AI & Generative Solutions practice.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| Watson Assistant | AI & Chatbot (section page) | https://techd.com/data-solutions/ai-chatbot/ | 🔄 Rebranded — "Watson Assistant" is now **watsonx Assistant**. Use new IBM name. Sub-page returns 404 — content removed. Do not recreate as standalone page; fold into AI practice. |

---

## 5. Data Science
**Section URL:** https://techd.com/data-solutions/ibm-data-science-platform/

> **Note:** IBM has consolidated its "Watson" data science products into the **watsonx.ai** platform. Watson Studio is now the IDE inside watsonx.ai — it exists but as a component, not a standalone product. Watson AI Applications and SPSS sub-pages both return 404. Treat this entire section as folded into the AI & Generative Solutions practice under the watsonx.ai umbrella.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| Data Science — Watson Studio | Data Science — IBM Watson Studio | https://techd.com/data-solutions/ibm-data-science-platform/data-science-ibm-watson-studio/ | 🔄 Rebranded — Watson Studio now lives inside **watsonx.ai**. Not a standalone product anymore. Use "watsonx.ai" in new site. Do not create a "Watson Studio" page. |
| Watson AI Applications | Watson AI Applications | https://techd.com/data-solutions/ibm-data-science-platform/watson-ai-applications/ | ❌ Deprecated — sub-page returns 404. These were pre-built IBM AI apps that have since been discontinued or absorbed into watsonx. Do not include. |
| Predictive SPSS | IBM SPSS Predictive Analytics | https://techd.com/data-solutions/ibm-data-science-platform/predictive-spss/ | ❌ Deprecated — sub-page returns 404. IBM still sells SPSS Statistics and SPSS Modeler but TechD's offering page is gone. Verify with TechD if they still actively deliver SPSS engagements before including. |

---

## 6. Unified Governance and Integration
**Section URL:** https://techd.com/data-solutions/unified-governance-and-integration/

> **Note:** IBM has been retiring the "InfoSphere" brand. The products underneath it still exist (MDM, Data Replication) but are being repositioned as part of IBM's data fabric and watsonx.governance strategy. Watson Knowledge Catalog was rebranded to **IBM Knowledge Catalog** and is now part of the watsonx.governance product. Information Server is the most at risk — it has largely been superseded by DataStage + CP4D. Verify each with TechD before building pages.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| Information Server | IBM InfoSphere Information Server | https://techd.com/data-solutions/unified-governance-and-integration/information-server/ | ⚠️ Verify — IBM is retiring the InfoSphere brand. Information Server's ETL functions have largely moved into DataStage. Confirm with TechD if still actively delivering this or if it's been replaced by DataStage in their practice. |
| Data Replication | IBM InfoSphere Data Replication (IIDR) | https://techd.com/data-solutions/unified-governance-and-integration/data-replication/ | ✅ Active in 2026 — Log-based CDC, zero-downtime migrations. Still sold by IBM. Useful for hybrid/mainframe environments. Confirm TechD still delivers it. |
| Master Data Management | IBM InfoSphere Master Data Management | https://techd.com/data-solutions/unified-governance-and-integration/master-data-management/ | ✅ Active in 2026 — MDM is still an active IBM product (multi-domain, graph-based, cloud variants). "InfoSphere" brand is legacy but the MDM product line continues. Use "IBM MDM" not "InfoSphere MDM" in new site. |
| Watson Knowledge Catalog | IBM Watson Knowledge Catalog | https://techd.com/data-solutions/unified-governance-and-integration/watson-knowledge-catalog/ | 🔄 Rebranded — Now called **IBM Knowledge Catalog**, part of **watsonx.governance**. "Watson" branding removed. Use new name in new site. Product is active and central to data governance practice. |

---

## 7. Hybrid Data Management
**Section URL:** https://techd.com/data-solutions/hybrid-data-management/

> **Note:** Hadoop as a standalone IBM offering (IBM BigInsights) was discontinued. IBM now routes Hadoop-type workloads through watsonx.data (open lakehouse on object storage with Presto/Hive). The Hadoop page on techd.com is outdated framing. Db2 products are all active and current. Industry Data Models are a real niche offering — verify if TechD still delivers them.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| Hadoop — Data Lakes | Apache Hadoop / Data Lakes | https://techd.com/data-solutions/hybrid-data-management/hadoop-data-lakes/ | ⚠️ Verify — IBM's own Hadoop product (BigInsights) was discontinued. IBM now routes these workloads through **watsonx.data** (open lakehouse). Do not create a "Hadoop" page — fold into Data Platforms under watsonx.data / lakehouse framing. |
| DB2 Warehouse | IBM Db2 Warehouse Enterprise Edition | https://techd.com/data-solutions/hybrid-data-management/db2-warehouse/ | ✅ Active in 2026 — Available on-prem and cloud. BLU Acceleration, in-database Spark, containerized deployment. Core IBM data warehouse product. |
| Industry Data Models | IBM Industry Data Models | https://techd.com/data-solutions/hybrid-data-management/industry-data-models/ | ⚠️ Verify — Pre-built sector data schemas (Banking, Insurance, Energy, Healthcare). Still referenced by IBM but niche. Confirm with TechD if actively delivered before creating a dedicated page. |
| DB2 Database | IBM Db2 (Database) | https://techd.com/data-solutions/hybrid-data-management/db2-database/ | ✅ Active in 2026 — Db2 on Cloud, Db2 Warehouse on Cloud, Db2 Big SQL all active. Core relational database across TechD's entire portfolio. |

---

## 8. Security Intelligence
**Section URL:** https://techd.com/data-solutions/security-intelligence/

> **Note — IMPORTANT:** IBM sold its QRadar SaaS business to **Palo Alto Networks in 2024**. IBM retained the on-premises QRadar product and continues to support existing customers, but the strategic direction is unclear. This is the most significant status risk in this entire catalog. Guardium is safe. Resilient SOAR has been absorbed into the IBM QRadar Suite and may no longer be sold standalone. Verify all three with TechD before building pages.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| Security QRadar | IBM QRadar (SIEM) | https://techd.com/data-solutions/security-intelligence/security-qradar/ | ⚠️ Verify — IBM sold QRadar SaaS to Palo Alto Networks (2024). On-prem QRadar is still supported but IBM's future security platform is shifting. Confirm with TechD if they still actively sell/deliver QRadar engagements in 2026. |
| Security Guardium | IBM Security Guardium | https://techd.com/data-solutions/security-intelligence/security-guardium/ | ✅ Active in 2026 — Data protection, encryption, compliance monitoring. Still a core IBM security product. Safe to include. |
| Security Resilient | IBM Resilient SOAR | https://techd.com/data-solutions/security-intelligence/security-resilient/ | ⚠️ Verify — IBM Resilient has been absorbed into the IBM QRadar Suite. It may not be sold as a standalone product anymore. Confirm with TechD if they still deliver Resilient implementations separately. |

---

## 9. TechD CogSuite
**Nav type:** Flat page (no sub-pages)
**Page URL:** *(no dedicated sub-page found in crawl — likely described within the main data-solutions page)*

> **Note — IMPORTANT:** CogSuite is **NOT an IBM product**. It is a proprietary tool built by TechD for administering IBM Cognos Analytics environments. This is TechD's own IP. It should be treated separately from the IBM product catalog — it's a differentiator/add-on, not a solutions practice. Consider featuring it as a "TechD Tools" callout on the Analytics page rather than a top-level solutions section.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| TechD CogSuite | TechD CogSuite — Cognos Administration Tool | *(no dedicated URL — referenced inline on main data-solutions page)* | ✅ Active — TechD proprietary product. Not IBM. Verify current feature set and whether TechD still actively markets/sells it in 2026. |

---

## 10. IBM Cloud
**Nav type:** Flat page (no sub-pages)
**Page URL:** https://techd.com/data-solutions/cloud/

> **Note:** The techd.com Cloud page primarily describes IBM Cloud Pak for Data System (which already appears under Enterprise Insights). It also references "IBM Cloud Private for Data" — a predecessor product name that is now deprecated. The IBM Cloud platform itself is very much active (2026). For the new site, IBM Cloud should appear as a capability within the Hybrid Cloud practice rather than a standalone section, unless TechD specifically does IBM Cloud infrastructure delivery as a separate practice.

| Sub Menu Name | Page Name | Link | Status |
|---|---|---|---|
| IBM Cloud | IBM Cloud / IBM Cloud Pak for Data System | https://techd.com/data-solutions/cloud/ | ⚠️ Verify — IBM Cloud is active in 2026. However the page content references "IBM Cloud Private for Data" which is a deprecated term. Page content needs refresh. Confirm scope: is this IBM Cloud infrastructure delivery, or just CP4D deployment context? |

---

## Quick Reference — Products to Skip (Do Not Build Pages For)

| Product | Reason |
|---|---|
| Watson AI Applications | 404 — page removed, product discontinued/absorbed |
| Predictive SPSS (as listed) | 404 — page removed. SPSS still exists but TechD doesn't appear to actively offer it. Verify. |
| Hadoop / IBM BigInsights | IBM's Hadoop product discontinued. Use watsonx.data / lakehouse framing instead. |
| IBM Cloud Private for Data | Deprecated product name — predecessor to Cloud Pak for Data. Do not use this name anywhere. |
| InfoSphere (brand) | IBM retiring the InfoSphere brand. Products underneath still exist — use current IBM names (e.g. "IBM MDM" not "IBM InfoSphere MDM"). |
| Watson [anything] | "Watson" brand being phased out across IBM portfolio. Use watsonx equivalents: Watson Assistant → watsonx Assistant, Watson Studio → watsonx.ai, Watson Knowledge Catalog → IBM Knowledge Catalog. |

---

## Products to Double-Check with TechD Before Building

These products are technically active but have significant strategic changes or are niche enough that a page without TechD confirmation would be risky:

1. **IBM QRadar** — IBM sold the SaaS business to Palo Alto Networks (2024). On-prem still alive but direction uncertain.
2. **IBM Resilient SOAR** — absorbed into QRadar Suite, may not be standalone.
3. **IBM Cloud Pak for Data System with IBM Performance Server** — hardware appliance, niche. Confirm active delivery.
4. **IBM Industry Data Models** — niche, confirm TechD actively sells this.
5. **IBM Cognos Controller** — narrower audience, confirm active delivery.
6. **IBM InfoSphere Information Server** — largely superseded by DataStage. Confirm or skip.
7. **TechD CogSuite** — proprietary tool, confirm still marketed/sold in 2026.
