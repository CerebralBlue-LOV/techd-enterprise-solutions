/**
 * Per-service extras for the 4 services landing pages.
 * Keyed by `Service.id` from `src/content/services.ts`.
 *
 * Source material:
 *  - docs/audit/SERVICES-AUDIT.md  (live techd.com Services audit, 2026-05-07)
 *  - docs/GRAND.md, docs/DECISIONS.md
 *  - src/content/solutions.ts, src/content/industries.ts (cross-refs)
 *
 * Verified rules carried in:
 *  - TechD is IBM Platinum Business Partner (NOT "Gold" or "Premier" — both
 *    appeared on the legacy site and must never be reproduced).
 *  - No fabricated client names. Cross-references reuse existing IDs only.
 *  - Cognos 10 legacy modules (Query Studio, Workspace Advanced,
 *    Cognos Connection) are dropped from the Training catalog.
 */

export type WhyPoint = { title: string; body: string };
export type ApproachStep = { step: string; detail: string };
export type Engagement = { name: string; duration: string; summary: string };
export type SolutionProof = { id: string; proof: string };
export type IndustryProof = { id: string; proof: string };
export type Deliverable = { title: string; body: string };
export type StatCallout = { value: string; label: string };

export type ServiceExtras = {
  /** Short editorial headline used in the hero (overrides service.promise). */
  headline: string;
  /** Short paragraph lede used in the hero. */
  lede: string;
  whyPoints: WhyPoint[];
  /** Named, scoped offerings clients can actually buy. */
  engagements: Engagement[];
  /** Expanded form of services.ts deliverables. */
  deliverables: Deliverable[];
  approach: ApproachStep[];
  /** Solution practices this service most often delivers against. */
  solutions: SolutionProof[];
  /** Industries with proof points for this service. */
  industries: IndustryProof[];
  stats?: StatCallout[];
};

// ---------- Approach archetypes ----------

const APPROACH_ADVISORY: ApproachStep[] = [
  { step: "Frame",     detail: "Workshop with executive sponsors and the teams who own the data — surface the real business question behind the tech ask." },
  { step: "Assess",    detail: "Free one-day TechD Advisor evaluation across data, analytics, or security: current-state inventory, gap analysis, and quick-win identification." },
  { step: "Recommend", detail: "Architecture options, sequencing, and an investment case scoped to your P&L — with an opinion, not a vendor catalog." },
  { step: "Roadmap",   detail: "A delivery plan your CIO can defend at the board and your engineering team can execute on Monday." },
];

const APPROACH_IMPLEMENTATION: ApproachStep[] = [
  { step: "Design",    detail: "Reference architecture pinned to your compliance tier, latency targets, and the systems already in flight — no greenfield fantasy." },
  { step: "Build",     detail: "IBM-certified senior practitioners ship the work — install, configure, integrate, and tune across the watsonx and Cloud Pak portfolio." },
  { step: "Validate",  detail: "Use-case testing, performance tuning, and compliance report sign-off before anything goes live." },
  { step: "Hand off",  detail: "Documented runbooks, your team trained on the platform, and a Day 2 operating model — not a black box." },
];

const APPROACH_MANAGED: ApproachStep[] = [
  { step: "Onboard",     detail: "Inventory the platforms in scope, baseline performance and cost, and align SLAs to the business KPIs that actually matter." },
  { step: "Operate",     detail: "24×7 monitoring, patching, and incident response across watsonx, Db2, Cognos, OpenShift, Guardium, and QRadar — by the people who built it." },
  { step: "Optimize",    detail: "FinOps reviews, performance tuning, and capacity planning on the cadence of your cloud bill, not a quarterly slide." },
  { step: "Evolve",      detail: "Roadmap reviews tied to IBM platform releases and your business priorities — Managed Services that compound, not stagnate." },
];

const APPROACH_TRAINING: ApproachStep[] = [
  { step: "Scope",     detail: "Audience analysis: executives, architects, data engineers, analysts — different curricula, different formats, one outcome." },
  { step: "Tailor",    detail: "Use your data and your use cases. Customer-data labs available for IBM-certified curricula across watsonx, Db2, Cognos, Planning Analytics, and Guardium." },
  { step: "Deliver",   detail: "Online self-paced, instructor-led virtual, or instructor-led on-site — including hands-on labs your team keeps after the class ends." },
  { step: "Reinforce", detail: "Office hours, follow-up workshops, and certification pathways so capability sticks past the closing slide." },
];

// ---------- Service extras ----------

export const SERVICES_EXTRAS: Record<string, ServiceExtras> = {
  advisory: {
    headline: "Strategy that survives the boardroom.",
    lede:
      "Executive-grade roadmaps for AI, data, security, and cloud — built around your P&L and your compliance tier, not a vendor's catalog. Short, opinionated engagements that produce a decision, not a deck.",
    whyPoints: [
      { title: "Free one-day evaluations", body: "TechD Advisor: a one-day deep-dive across your data estate, analytics platform, or security posture — current state, gaps, and the next three moves worth making." },
      { title: "An opinion, not options",  body: "We name the recommended architecture and sequence. Optionality is fine in slideware; useless when payroll is due Friday." },
      { title: "Anchored in IBM, open to the rest", body: "Platinum-tier knowledge of the IBM stack — paired with realism about AWS, Azure, Snowflake, Databricks, and the systems you already own." },
      { title: "Senior practitioners only", body: "Architects who have shipped in healthcare, insurance, media, energy, higher ed, and federal — not generalists learning on your dime." },
    ],
    engagements: [
      { name: "TechD Advisor — Data",      duration: "1 day",     summary: "Repositories, ETL, governance, and security intelligence across your data estate. Output: gap map and prioritized next moves." },
      { name: "TechD Advisor — Analytics", duration: "1 day",     summary: "Cognos Analytics and Planning Analytics evaluation — usage health, content debt, and modernization path." },
      { name: "TechD Advisor — Security",  duration: "1 day",     summary: "Guardium, QRadar, and data-protection posture against your regulatory tier (HIPAA, FedRAMP, NAIC, NERC-CIP)." },
      { name: "Solution Design",           duration: "2–4 weeks", summary: "Reference architecture, sequencing, and an investment case for a named initiative — ready to fund and staff." },
      { name: "AI Readiness Assessment",   duration: "2–3 weeks", summary: "watsonx-aligned readiness review across data foundations, governance, MLOps, and use-case viability." },
    ],
    deliverables: [
      { title: "AI readiness assessments", body: "Use-case viability, data foundation gaps, governance posture, and a sequenced delivery plan grounded in watsonx." },
      { title: "Architecture reviews",     body: "Independent assessment of an existing or proposed architecture — risks, alternatives, and the recommended path forward." },
      { title: "Investment cases",         body: "Cost, value, and risk modeled in terms your CFO and CIO read the same way." },
    ],
    approach: APPROACH_ADVISORY,
    solutions: [
      { id: "ai-generative",       proof: "AI readiness reviews and watsonx-grounded use-case selection." },
      { id: "data-analytics",      proof: "Lakehouse, Cognos, and Planning Analytics roadmaps for regulated enterprises." },
      { id: "security-compliance", proof: "Guardium and QRadar posture assessments against HIPAA, FedRAMP, NAIC, and NERC-CIP." },
      { id: "hybrid-cloud",        proof: "Workload-by-workload cloud strategy across IBM Cloud, AWS, Azure, and on-prem." },
    ],
    industries: [
      { id: "healthcare",      proof: "HIPAA-aligned data and AI roadmaps for major U.S. health systems." },
      { id: "insurance",       proof: "Underwriting and claims modernization roadmaps for P&C and specialty carriers." },
      { id: "public-sector",   proof: "FedRAMP-aligned advisory for federal agencies and defense technology organizations." },
      { id: "energy-utilities", proof: "NERC-CIP-aligned grid and OT/IT advisory for regulated utilities and ISOs." },
    ],
    stats: [
      { value: "1 day",    label: "TechD Advisor evaluations" },
      { value: "Platinum", label: "IBM Business Partner" },
    ],
  },

  implementation: {
    headline: "From PowerPoint to production.",
    lede:
      "Engineering teams that ship. Reference architectures, accelerators, and senior IBM-certified practitioners on every engagement — across watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, Planning Analytics, Guardium, and QRadar.",
    whyPoints: [
      { title: "Senior, hands-on engineers",   body: "The architects who designed it install, configure, and tune it. No bait-and-switch from sales pitch to delivery." },
      { title: "Reference architectures",      body: "Patterns we have shipped across healthcare, insurance, media, and federal — not slideware drawn for your engagement." },
      { title: "Integration, not just install", body: "Tied into your IAM, ITSM, observability, and CI/CD from day one — production-ready, not lab-ready." },
      { title: "Documented handoff",            body: "Runbooks, architecture diagrams, and trained operators — so your team owns it the day after go-live." },
    ],
    engagements: [
      { name: "Greenfield build",          duration: "Project-based", summary: "Net-new platform stand-up: watsonx.ai, watsonx.data, Cloud Pak for Data, OpenShift, Cognos, or Planning Analytics — designed, deployed, validated." },
      { name: "Migration & replatform",    duration: "Project-based", summary: "Legacy ETL, BI, or warehouse migrations onto the modern IBM stack — Informatica/SSIS to DataStage, Teradata/Sybase IQ to Netezza, Hadoop to watsonx.data." },
      { name: "Integration delivery",      duration: "Project-based", summary: "Connect IBM platforms to the rest of your estate: IAM, ITSM, observability, CI/CD, CRM, and the systems of record AI needs to ground on." },
      { name: "Performance & tuning",      duration: "2–6 weeks",     summary: "Targeted engagement on a struggling Db2, Netezza, Cognos, or Planning Analytics environment — diagnose, remediate, document." },
    ],
    deliverables: [
      { title: "Greenfield builds",            body: "Net-new IBM platforms — watsonx.ai, watsonx.data, Cloud Pak for Data, OpenShift, Cognos, Planning Analytics — delivered to production." },
      { title: "Migrations and replatforming", body: "Legacy ETL, BI, warehouse, and security platforms migrated onto the modern IBM stack with zero-downtime patterns where it matters." },
      { title: "Integration delivery",         body: "API, event, and data integration across IBM and non-IBM systems — including z/OS Connect and IBM Data Replication for mainframe estates." },
    ],
    approach: APPROACH_IMPLEMENTATION,
    solutions: [
      { id: "ai-generative",       proof: "watsonx.ai builds — RAG pipelines, vector store design, prompt governance, and MLOps in production." },
      { id: "data-analytics",      proof: "Db2, DataStage, Netezza, watsonx.data, Cognos, and Planning Analytics builds and migrations." },
      { id: "security-compliance", proof: "Guardium, QRadar, and Resilient deployments — use-case rule development and compliance report validation." },
      { id: "hybrid-cloud",        proof: "OpenShift cluster builds, Cloud Pak for Data deployments, and IBM Data Replication-led zero-downtime migrations." },
      { id: "automation-finops",   proof: "Instana, Apptio, and Turbonomic deployment and integration into your ITSM and CFO dashboards." },
    ],
    industries: [
      { id: "healthcare",          proof: "HIPAA-grade data platforms and clinical AI builds for major U.S. health systems." },
      { id: "media-entertainment", proof: "Audience and content intelligence builds for studios, networks, and streamers." },
      { id: "insurance",           proof: "Underwriting copilots and claims automation builds for P&C and specialty carriers." },
      { id: "public-sector",       proof: "FedRAMP-aligned hybrid platforms for federal agencies and defense technology organizations." },
    ],
    stats: [
      { value: "Platinum", label: "IBM Business Partner" },
      { value: "F500",     label: "Production deployments" },
    ],
  },

  managed: {
    headline: "Run with predictable economics.",
    lede:
      "24×7 operations for AI, data, and security platforms — staffed by the IBM-certified practitioners who build them. SLAs that map to business KPIs, not ticket counts; FinOps that show up in the cloud bill, not the slide deck.",
    whyPoints: [
      { title: "Built and run by the same team", body: "The architects who deployed it operate it. No tier-1 call center triaging a platform they have never seen." },
      { title: "SLAs tied to outcomes",          body: "Availability, performance, and compliance metrics — not ticket counts and CSAT theater." },
      { title: "FinOps that compounds",          body: "Continuous right-sizing on watsonx, Cloud Pak for Data, OpenShift, and your hyperscaler spend — measured in invoice lines, not slides." },
      { title: "Customer Success built in",      body: "Quarterly business reviews with senior practitioners who can answer the architecture question, not just the SLA question." },
    ],
    engagements: [
      { name: "Platform operations",   duration: "Annual contract", summary: "24×7 monitoring, patching, backup/restore, and incident response across watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, and Planning Analytics." },
      { name: "Security operations",   duration: "Annual contract", summary: "Guardium and QRadar tuning, rule development, threat-intel updates, and incident-response support." },
      { name: "FinOps & optimization", duration: "Quarterly cycle", summary: "Cloud cost reviews with Apptio and Turbonomic-driven recommendations — implemented, not just reported." },
      { name: "Customer Success",      duration: "Ongoing",         summary: "Quarterly business reviews, roadmap alignment to IBM platform releases, and capability planning with senior practitioners." },
    ],
    deliverables: [
      { title: "Platform operations",       body: "24×7 operations for watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, and Planning Analytics — monitored, patched, backed up, and tuned." },
      { title: "Security operations",       body: "Guardium and QRadar tuning, rule development, threat intelligence updates, and incident-response support." },
      { title: "FinOps and optimization",   body: "Continuous right-sizing across IBM Cloud, AWS, Azure, and on-prem — with action implemented, not just reports filed." },
    ],
    approach: APPROACH_MANAGED,
    solutions: [
      { id: "data-analytics",      proof: "Cognos, Planning Analytics, Db2, and watsonx.data administration in production." },
      { id: "ai-generative",       proof: "watsonx.ai operations — model drift monitoring, prompt library updates, RAG pipeline health." },
      { id: "security-compliance", proof: "Guardium and QRadar SOC operations and rule tuning for regulated estates." },
      { id: "automation-finops",   proof: "Instana, Apptio, and Turbonomic operations with continuous cost optimization." },
      { id: "hybrid-cloud",        proof: "OpenShift cluster operations and Day 2 platform engineering across hybrid estates." },
    ],
    industries: [
      { id: "healthcare",       proof: "HIPAA-grade managed operations for major U.S. health systems." },
      { id: "insurance",        proof: "Operations for underwriting, claims, and analytics platforms at P&C and specialty carriers." },
      { id: "energy-utilities", proof: "NERC-CIP-aligned operations for grid analytics and OT/IT security." },
      { id: "public-sector",    proof: "FedRAMP-aligned operations for federal agencies and defense technology organizations." },
    ],
    stats: [
      { value: "24×7",     label: "Operations coverage" },
      { value: "Platinum", label: "IBM Business Partner" },
    ],
  },

  training: {
    headline: "Lift the whole organization, not just the lab.",
    lede:
      "Role-based enablement for executives, architects, and engineering teams — IBM-certified curricula across watsonx, Cloud Pak for Data, Db2, Cognos Analytics, Planning Analytics, DataStage, SPSS Modeler, and Guardium. Hands-on labs run on your data when you want them to.",
    whyPoints: [
      { title: "IBM-certified curricula",      body: "Official IBM training across the data, AI, and security portfolio — delivered by Platinum-tier practitioners." },
      { title: "Your data, your use cases",    body: "Bring-your-own-data labs available — train against your schemas, your dashboards, your security policies." },
      { title: "Role-based, not one-size",     body: "Executive briefings, architect bootcamps, and engineer-grade labs — different audiences, different curricula." },
      { title: "Modern stack only",            body: "Cognos Analytics 11+ and Planning Analytics — legacy Cognos 10 modules dropped from the catalog." },
    ],
    engagements: [
      { name: "Executive briefings",   duration: "Half-day",       summary: "Strategy-level briefings on watsonx, hybrid cloud, and security for leadership teams — outcomes, not feature tours." },
      { name: "Architect bootcamps",   duration: "3–5 days",       summary: "Deep architectural training on watsonx.ai, watsonx.data, Cloud Pak for Data, OpenShift, and Guardium for senior technical staff." },
      { name: "Engineering labs",      duration: "1–5 days",       summary: "Hands-on labs across Cognos Analytics, Planning Analytics, DataStage, Db2, SPSS Modeler, and Guardium — instructor-led, your data optional." },
      { name: "Custom curriculum",     duration: "Project-based",  summary: "Bespoke programs blending IBM-certified content with your platform configuration, governance model, and use cases." },
    ],
    deliverables: [
      { title: "Executive briefings",     body: "Strategy-level sessions for leadership — what the platform makes possible, what it costs, what the next decision is." },
      { title: "Architect bootcamps",     body: "Multi-day deep dives on watsonx, Cloud Pak for Data, OpenShift, and Guardium for senior technical teams." },
      { title: "Hands-on engineering labs", body: "Instructor-led labs across Cognos Analytics, Planning Analytics, DataStage, Db2, SPSS Modeler, and Guardium — online or on-site." },
    ],
    approach: APPROACH_TRAINING,
    solutions: [
      { id: "ai-generative",       proof: "watsonx.ai, watsonx Assistant, and SPSS Modeler enablement for data science and platform teams." },
      { id: "data-analytics",      proof: "Cognos Analytics, Planning Analytics, Db2, and DataStage training across analyst, developer, and admin tracks." },
      { id: "security-compliance", proof: "Guardium administration and use-case development training for security operations teams." },
      { id: "hybrid-cloud",        proof: "Cloud Pak for Data and OpenShift training for platform engineering teams." },
    ],
    industries: [
      { id: "healthcare",       proof: "Cognos and Planning Analytics enablement for clinical and operational analytics teams." },
      { id: "higher-education", proof: "Analytics and BI enablement for institutional research and finance teams." },
      { id: "insurance",        proof: "SPSS Modeler and Cognos training for actuarial and analytics teams." },
      { id: "public-sector",    proof: "Cloud Pak for Data, watsonx, and Guardium enablement for federal teams." },
    ],
    stats: [
      { value: "IBM-certified", label: "Curricula" },
      { value: "On-site or online", label: "Delivery modes" },
    ],
  },
};
