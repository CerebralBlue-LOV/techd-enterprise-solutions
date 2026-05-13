# Managed Services

## 1. Extracted & Verified Data

There is no legacy page content to extract. The `/services/techd-managed-services/` URL returned a 404 on the legacy site; no managed services page was ever published.

The only usable baselines are:

1. The forward-looking copy already in `src/content/services.ts`:
   - Promise: "Run with predictable economics."
   - Description: "24×7 operations for AI, data, and security platforms. SLAs that map to business KPIs, not ticket counts."
   - Highlights: "Platform operations," "Security operations," "FinOps & optimization."

2. A single undocumented mention on the Quick Start Advisory page: "Offer Managed Service for CP4D 3.0" — confirms TechD has operational history managing Cloud Pak for Data environments. That operational experience informs the page even though no legacy content exists to migrate.

These three highlights are the correct structural anchors for this service page.

## 2. Legacy Data Discarded

- **"CP4D 3.0" managed service reference** — Cloud Pak for Data 3.0 is multiple major versions behind (current release is 5.x). Do not surface this version reference in any customer-facing copy.
- **"IBM Software Hub"** — TechD's confirmed product name is Cloud Pak for Data.
- **watsonx.governance** — Not in TechD's confirmed portfolio. Remove from managed services coverage.
- **No additional legacy content exists.** All page content is net-new.

## 3. 2026 IBM Alignment

Managed services for IBM platforms in 2026 operate across three confirmed pillars plus one emerging area:

**Platform Operations**
- Cloud Pak for Data (v5.x on OpenShift) — cluster health monitoring, service cartridge upgrade management, backup and restore, certificate rotation, capacity planning, namespace resource governance
- watsonx.ai — model deployment pipeline monitoring, inference endpoint health checks, token consumption tracking, model version lifecycle management
- watsonx.data — Iceberg table compaction scheduling, Presto engine performance monitoring, ingestion pipeline health
- watsonx.data intelligence / integration — pipeline availability monitoring, data freshness SLAs
- IBM DataStage — job schedule governance, pipeline failure alerting, metadata lineage maintenance
- Cognos Analytics 12 — scheduled report delivery monitoring, version upgrade lifecycle management
- Planning Analytics — TM1 cube load monitoring, Workspace availability, model refresh governance
- IBM Db2 — database availability monitoring, backup validation, performance baseline tracking
- IBM Netezza Performance Server — query performance monitoring, storage capacity management

**Security Operations**
- IBM Guardium — continuous database activity monitoring policy review, alert triage, compliance reporting (SOX, PCI-DSS, HIPAA, NERC-CIP), vulnerability assessment scheduling
- IBM QRadar — SIEM alert monitoring and triage, detection rule tuning, threat intelligence feed management, escalation to client security team
- IBM Resilient (QRadar SOAR) — playbook execution monitoring, automated response health checks, incident ticket lifecycle management

**FinOps & Optimization**
- IBM Apptio — monthly IT financial reporting, cost allocation model maintenance, variance analysis, license utilization dashboards
- IBM Instana — application performance baseline tracking, alert threshold tuning, rightsizing recommendations for monitored services
- IBM Turbonomic — workload placement optimization execution, cloud cost reduction action review and approval, monthly savings reporting

Platform licensing for Cloud Pak for Data and watsonx.ai is consumption-based for some cartridges. Managed FinOps includes license utilization dashboards and right-sizing recommendations on a defined monthly or quarterly cadence.

**Agentic AI Operations (Emerging)**
IBM watsonx Orchestrate entered private preview at IBM Think 2026 (May 2026). As organizations move multi-agent AI systems toward production, managed operations requires a new control model: monitoring agent decision chains, enforcing policy at runtime, tracking costs by agent and workflow, handling agent failures and fallbacks. TechD is building this operations practice ahead of GA to be ready when clients need it.

## 4. Content to Update

**In `src/content/services.ts`:**
- The `managed` entry requires no changes. Existing copy is accurate, voice-compliant, and aligned to 2026 IBM positioning. Retain entirely.

**On the Managed Services page component (net-new build):**
- Use the three `services.ts` highlights as H2 section anchors: Platform Operations, Security Operations, FinOps & Optimization.
- Add a fourth forward-looking section: Agentic AI Operations.
- Do not reference CP4D 3.0 or specific version numbers in hero or lede copy. Use product family names.
- Do not invent SLA numbers or MTTR statistics. Describe SLA structure qualitatively: outcomes tied to pipeline availability, report delivery, model inference latency, and security alert triage time — not ticket counts.
- Use "IBM Guardium," not "IBM Guardium Data Security Center," in all copy.
- Add IBM QRadar and IBM Resilient (QRadar SOAR) to security operations coverage.
- Add the full Automation & FinOps practice (Apptio, Instana, Turbonomic) to FinOps section — this practice was absent from all legacy service content.
- Add watsonx Orchestrate agentic operations as a named emerging practice.
- Remove "IBM Software Hub" — use Cloud Pak for Data.

## 5. Proposed New Sections

**SLA Architecture Section**
Replace generic "24×7 monitoring" language with outcome-based SLA framing that a CIO recognizes: pipeline availability (DataStage job completion rates), BI report freshness (Cognos scheduled delivery), model inference availability (watsonx.ai endpoint uptime), data security alert response time (Guardium and QRadar triage SLA). Contrast explicitly with ticket-count SLAs: "We do not measure ourselves by how many tickets we closed. We measure by whether your pipelines ran, your reports delivered, and your security alerts were triaged."

**Platform Coverage Table**
Two-column table: IBM Product / What TechD Manages. Rows covering all confirmed portfolio products relevant to ongoing operations. Gives a procurement-stage architect a quick scope reference.

**FinOps Methodology Block**
A short section on how TechD governs IBM platform economics: Apptio cost allocation reviews, Turbonomic workload optimization action reviews, watsonx.ai consumption tracking, and Cloud Pak for Data cartridge right-sizing. Structured as a recurring monthly or quarterly deliverable, not a one-time activity.

**Agentic AI Operations (Emerging Practice)**
"As organizations move IBM watsonx Orchestrate agents from private preview to production, operations teams need a new control model — monitoring agent decision chains, enforcing policy at runtime, attributing costs by agent and workflow, and handling failures. We are building this practice now so we are ready when your agents go live." Positions TechD as ahead of the curve without overclaiming existing capability.

**Onboarding and Transition**
A short practical block: discovery and documentation sprint to baseline the environment, a defined hyper-care period post-transition, and a steady-state handoff. Answers the CIO question "how do we get in?" upfront without requiring a sales call to find out.

**IBM Platinum Partner Escalation Advantage**
"When an IBM platform issue requires IBM Engineering involvement, our Platinum Business Partner relationship provides a direct escalation path — not the standard support queue." Factual, verifiable, and relevant to a managed services buyer evaluating partner tiers.
