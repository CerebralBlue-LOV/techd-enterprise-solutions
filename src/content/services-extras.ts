/**
 * Per-service extras for the 4 services landing pages.
 * Keyed by `Service.id` from `src/content/services.ts`.
 *
 * Source of truth: `docs/revisions/services/{advisory,implementation,
 * managed-services,training}.md` — verified, voice-compliant, IBM 2026
 * aligned. Do not reintroduce: "Premier"/"Gold" partner tier,
 * IBM BigInsights, IBM Streams, PureData, Watson Studio (standalone),
 * IBM Watson Assistant (standalone), watsonx.governance, IBM Cognos
 * Controller, IBM SPSS Statistics, "IBM DB2" all-caps, Cloud Pak for
 * Data System (appliance), or "IBM Software Hub". TechD is an
 * IBM Platinum Business Partner under IBM Partner Plus.
 */

export type WhyPoint = { title: string; body: string };
export type ApproachStep = { step: string; detail: string };
export type Engagement = { name: string; duration: string; summary: string };
export type SolutionProof = { id: string; proof: string };
export type IndustryProof = { id: string; proof: string };
export type Deliverable = { title: string; body: string };
export type StatCallout = { value: string; label: string };

/** Per-service hero block sitting under Why TechD — names a flagship offer or differentiator. */
export type Spotlight = {
  eyebrow: string;
  title: string;
  lede: string;
  bullets: { label: string; body: string }[];
  /** Optional 3-step "what happens next" rail. */
  next?: { step: string; body: string }[];
};

/** Service-specific methodology block (replaces the generic Approach for service pages). */
export type Methodology = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: { name: string; body: string }[];
};

/** A row in the IBM practice coverage grid. */
export type CoverageRow = {
  practice: "AI & Generative" | "Data & Analytics" | "Automation & FinOps" | "Security & Compliance";
  /** Short product names (already corrected to current IBM 2026 nomenclature). */
  products: string[];
};

export type CrossLink =
  | { kind: "solution"; id: string; label: string; blurb: string }
  | { kind: "service"; id: string; label: string; blurb: string };

export type ServiceExtras = {
  /** Short editorial headline used in the hero (overrides service.promise). */
  headline: string;
  /** Short paragraph lede used in the hero. */
  lede: string;
  whyPoints: WhyPoint[];
  /** Per-service flagship offer / differentiator block. */
  spotlight: Spotlight;
  /** Named, scoped offerings clients can actually buy. */
  engagements: Engagement[];
  /** Service-specific methodology (named phases / SLA model / role tracks / etc). */
  methodology: Methodology;
  /** 4-row IBM practice coverage grid. */
  productCoverage: { verb: string; rows: CoverageRow[] };
  /** Lightweight cross-links to /solutions and other services. */
  crossLinks: CrossLink[];
  /** Expanded form of services.ts deliverables (kept for legacy components if referenced). */
  deliverables: Deliverable[];
  approach: ApproachStep[];
  /** Solution practices this service most often delivers against. */
  solutions: SolutionProof[];
  /** Industries with proof points for this service. */
  industries: IndustryProof[];
  stats?: StatCallout[];
};

// ---------- Approach archetypes (kept for any legacy component that still reads them) ----------

const APPROACH_ADVISORY: ApproachStep[] = [
  { step: "Frame",     detail: "Workshop with executive sponsors and the teams who own the data — surface the real business question behind the tech ask." },
  { step: "Assess",    detail: "TechD IBM Platform Assessment: a structured one-day evaluation across architecture, configuration, security posture, licensing, and upgrade paths." },
  { step: "Recommend", detail: "Architecture options, sequencing, and an investment case scoped to your P&L — with an opinion, not a vendor catalog." },
  { step: "Roadmap",   detail: "A delivery plan your CIO can defend at the board and your engineering team can execute on Monday." },
];

const APPROACH_IMPLEMENTATION: ApproachStep[] = [
  { step: "Design",    detail: "Solution architecture blueprint, infrastructure sizing, integration map, security and access design — pinned to your compliance tier and the systems already in flight." },
  { step: "Build",     detail: "Platform provisioning, pipeline and model deployment, integration wiring, data connection setup — by the same IBM-certified practitioners who designed it." },
  { step: "Validate",  detail: "Load testing, user acceptance, security review, performance baseline — sign-off before anything goes live." },
  { step: "Stabilize", detail: "30-day post-go-live support, runbook documentation, knowledge transfer, and handoff to operations or Managed Services." },
];

const APPROACH_MANAGED: ApproachStep[] = [
  { step: "Onboard",  detail: "Discovery and documentation sprint to baseline the environment in scope — performance, cost, integrations, escalation paths, and compliance posture." },
  { step: "Operate",  detail: "24×7 monitoring, patching, backup/restore, and incident response across watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, Planning Analytics, Guardium, and QRadar — by the people who built it." },
  { step: "Optimize", detail: "FinOps reviews, performance tuning, and capacity planning on the cadence of your cloud bill — Apptio, Instana, and Turbonomic actions implemented, not just reported." },
  { step: "Evolve",   detail: "Quarterly business reviews, IBM platform release alignment, and capability planning with senior practitioners — Managed Services that compound, not stagnate." },
];

const APPROACH_TRAINING: ApproachStep[] = [
  { step: "Scope",     detail: "Audience analysis: executives, architects, data engineers, analysts — different curricula, different formats, one outcome." },
  { step: "Tailor",    detail: "Use your data and your use cases. Customer-data labs available for IBM-certified curricula across watsonx, Db2, Cognos, Planning Analytics, DataStage, SPSS Modeler, and Guardium." },
  { step: "Deliver",   detail: "Online self-paced, instructor-led virtual, or instructor-led on-site — including hands-on labs your team keeps after the class ends." },
  { step: "Reinforce", detail: "Office hours, follow-up workshops, and certification pathways so capability sticks past the closing slide." },
];

// ---------- Service extras ----------

export const SERVICES_EXTRAS: Record<string, ServiceExtras> = {
  advisory: {
    headline: "Strategy that survives the boardroom.",
    lede:
      "Executive-grade roadmaps for AI, data, automation, and security — built around your P&L and your compliance tier, not a vendor's catalog. Short, opinionated engagements that produce a decision, not a deck.",
    whyPoints: [
      { title: "TechD IBM Platform Assessment", body: "A structured one-day evaluation that produces a written findings report covering architecture, configuration, security posture, licensing, and upgrade paths — not a sales discovery call." },
      { title: "An opinion, not options",       body: "We name the recommended architecture and sequence. Optionality is fine in slideware; useless when payroll is due Friday." },
      { title: "Anchored in IBM, open to the rest", body: "IBM Platinum Business Partner with certified practitioners across watsonx, Cloud Pak for Data, Db2, Cognos, Planning Analytics, DataStage, Apptio, Instana, Turbonomic, Guardium, and QRadar — paired with realism about AWS, Azure, Snowflake, and the systems you already own." },
      { title: "Senior practitioners only",     body: "Architects who have shipped in healthcare, insurance, media, energy, higher education, and the public sector — not generalists learning on your dime." },
    ],
    spotlight: {
      eyebrow: "Flagship engagement",
      title: "TechD IBM Platform Assessment",
      lede:
        "A structured one-day engagement, on-site or remote, that produces a written report your CIO can take to the board and your architects can execute against on Monday.",
      bullets: [
        { label: "What we review", body: "Architecture, hardware specifications, software configuration, security posture, user-role design, licensing position, and upgrade paths — across the IBM platforms in scope." },
        { label: "What we deliver", body: "A written comprehensive report: findings summary, best-practice recommendations, patching and maintenance requirements, licensing summary, expansion and upgrade recommendations, and complementary solution recommendations." },
        { label: "What happens next", body: "An optional Quick Start Advisory package: pre-implementation solution design, installation and configuration, data connection setup, model and template creation, knowledge transfer, customized training, and post-implementation support." },
      ],
      next: [
        { step: "Discovery", body: "Stakeholder session on goals, constraints, and the regulatory tier in play." },
        { step: "Review",    body: "Architecture, configuration, security, and licensing walk-through across the platforms in scope." },
        { step: "Report",    body: "Written findings, prioritized recommendations, and a sequenced roadmap — delivered, not pitched." },
      ],
    },
    engagements: [
      { name: "TechD IBM Platform Assessment", duration: "1 day",     summary: "Structured one-day evaluation across architecture, configuration, security, licensing, and upgrade paths. Output: written findings report." },
      { name: "Solution Design",               duration: "2–4 weeks", summary: "Reference architecture, sequencing, and an investment case for a named initiative — ready to fund and staff." },
      { name: "AI Readiness Assessment",       duration: "2–3 weeks", summary: "watsonx-aligned readiness review across data foundations, governance, MLOps, and use-case viability." },
      { name: "Quick Start Advisory Package",  duration: "Project-based", summary: "Pre-implementation design, installation and configuration, data connections, model and template creation, knowledge transfer, training, and post-implementation support." },
    ],
    methodology: {
      eyebrow: "Engagement framework",
      title: "Mapped to IBM's AI Operating Model",
      subtitle:
        "We structure assessments around IBM's Govern · Integrate · Orchestrate · Automate framework — a shared vocabulary with your IBM account team, and a defensible maturity model for your board.",
      items: [
        { name: "Govern",     body: "Data, model, and access governance posture across the IBM platforms in scope. Compliance tier (HIPAA, FedRAMP, PCI-DSS, NERC-CIP) drives the gap analysis." },
        { name: "Integrate",  body: "Data foundations and integration patterns: Db2, watsonx.data, DataStage, and the connector layer to non-IBM systems already in your estate." },
        { name: "Orchestrate", body: "Workflow and AI orchestration readiness: watsonx.ai, watsonx Orchestrate, and the policy controls required to move agents toward production." },
        { name: "Automate",   body: "Operational and FinOps maturity: Instana, Apptio, and Turbonomic posture against the platform economics your CFO has to defend." },
      ],
    },
    productCoverage: {
      verb: "What we assess",
      rows: [
        { practice: "AI & Generative",    products: ["watsonx.ai", "watsonx (platform)", "watsonx Orchestrate", "IBM Bob", "NeuralSeek", "IBM SPSS Modeler"] },
        { practice: "Data & Analytics",   products: ["IBM Db2", "watsonx.data", "watsonx.data intelligence", "watsonx.data integration", "Cloud Pak for Data", "IBM DataStage", "IBM Netezza Performance Server", "Cognos Analytics 12", "Planning Analytics"] },
        { practice: "Automation & FinOps", products: ["IBM Apptio", "IBM Instana", "IBM Turbonomic"] },
        { practice: "Security & Compliance", products: ["IBM Guardium", "IBM QRadar", "IBM Resilient (QRadar SOAR)"] },
      ],
    },
    crossLinks: [
      { kind: "service",  id: "implementation", label: "Implementation",   blurb: "The architecture we recommend is the architecture we build — same practitioners, no handoff." },
      { kind: "service",  id: "managed",        label: "Managed Services", blurb: "Run the platform we designed with SLAs tied to outcomes, not ticket counts." },
      { kind: "solution", id: "ai-generative",  label: "AI & Generative",  blurb: "watsonx-grounded use-case selection and AI readiness reviews." },
      { kind: "solution", id: "data-analytics", label: "Data & Analytics", blurb: "Lakehouse, Cognos, and Planning Analytics roadmaps for regulated enterprises." },
    ],
    deliverables: [
      { title: "Platform assessment report", body: "Written findings across architecture, configuration, security, licensing, and upgrade paths — the deliverable from the one-day engagement." },
      { title: "AI readiness assessments",   body: "Use-case viability, data foundation gaps, governance posture, and a sequenced delivery plan grounded in watsonx." },
      { title: "Investment cases",           body: "Cost, value, and risk modeled in terms your CFO and CIO read the same way." },
    ],
    approach: APPROACH_ADVISORY,
    solutions: [
      { id: "ai-generative",       proof: "AI readiness reviews and watsonx-grounded use-case selection." },
      { id: "data-analytics",      proof: "Lakehouse, Cognos, and Planning Analytics roadmaps for regulated enterprises." },
      { id: "security-compliance", proof: "Guardium and QRadar posture assessments against HIPAA, FedRAMP, NAIC, and NERC-CIP." },
    ],
    industries: [
      { id: "healthcare",       proof: "HIPAA-aligned data and AI roadmaps for major U.S. health systems." },
      { id: "insurance",        proof: "Underwriting and claims modernization roadmaps for P&C and specialty carriers." },
      { id: "public-sector",    proof: "FedRAMP-aligned advisory for federal agencies and defense technology organizations." },
      { id: "energy-utilities", proof: "NERC-CIP-aligned grid and OT/IT advisory for regulated utilities and ISOs." },
    ],
    stats: [
      { value: "1 day",    label: "TechD IBM Platform Assessment" },
      { value: "Platinum", label: "IBM Business Partner" },
    ],
  },

  implementation: {
    headline: "From PowerPoint to production.",
    lede:
      "Engineering teams that ship. Reference architectures, accelerators, and senior IBM-certified practitioners on every engagement — across watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, Planning Analytics, DataStage, Apptio, Instana, Turbonomic, Guardium, and QRadar.",
    whyPoints: [
      { title: "We build what we design",      body: "Advisory and implementation are staffed by the same certified practitioners. The architecture we recommend in an assessment is the architecture we deliver — there is no handoff to a separate delivery organization." },
      { title: "Reference architectures",      body: "Patterns we have shipped across healthcare, insurance, media, energy, higher education, and the public sector — not slideware drawn for your engagement." },
      { title: "Integration, not just install", body: "Wired into your IAM, ITSM, observability, CI/CD, CRM, and ERP from day one — production-ready, not lab-ready." },
      { title: "Stabilize, then hand off",     body: "30-day post-go-live stabilization with documented runbooks and a trained operations team — so you own it the day after the cutover, not six months later." },
    ],
    spotlight: {
      eyebrow: "Differentiator",
      title: "We build what we design — and we integrate beyond IBM",
      lede:
        "Our scope is the connector layer and the data contract, not just the IBM stack in isolation. We name the systems we integrate with, and we deliver across IBM Cloud, AWS, Azure, Oracle Cloud, and on-premises.",
      bullets: [
        { label: "Same team, end to end", body: "The architects who designed it install, configure, and tune it. No bait-and-switch from sales pitch to delivery, no handoff to a separate delivery organization." },
        { label: "Named integration scope", body: "Salesforce, ServiceNow, Azure Data Factory, Informatica, enterprise ERP, and the systems of record AI needs to ground on — including z/OS Connect and IBM Data Replication for mainframe estates." },
        { label: "Hybrid and multi-cloud", body: "Cloud Pak for Data and the watsonx suite implemented across IBM Cloud, AWS, Azure, Oracle Cloud, and on-premises OpenShift — chosen for your latency, sovereignty, and economics." },
        { label: "Reusable accelerators", body: "Reference architectures, DataStage migration patterns, Cognos content migration tooling, and Guardium policy baselines we bring to every engagement — not invented on your clock." },
      ],
    },
    engagements: [
      { name: "Greenfield build",          duration: "Project-based", summary: "Net-new platform stand-up: watsonx.ai, watsonx.data, Cloud Pak for Data, OpenShift, Cognos, or Planning Analytics — designed, deployed, validated." },
      { name: "Migration & replatform",    duration: "Project-based", summary: "Legacy ETL, BI, or warehouse migrations onto the modern IBM stack — Informatica/SSIS to DataStage, Teradata/Sybase IQ to Netezza Performance Server, Hadoop to watsonx.data." },
      { name: "Integration delivery",      duration: "Project-based", summary: "Connect IBM platforms to the rest of your estate: Salesforce, ServiceNow, Azure Data Factory, Informatica, ERP, IAM, ITSM, observability, and CI/CD." },
      { name: "Performance & tuning",      duration: "2–6 weeks",     summary: "Targeted engagement on a struggling Db2, Netezza Performance Server, Cognos, or Planning Analytics environment — diagnose, remediate, document." },
    ],
    methodology: {
      eyebrow: "Delivery methodology",
      title: "Four phases, one accountable team",
      subtitle:
        "Every engagement follows the same four phases. Each phase has a named TechD accountability — not generic project management language.",
      items: [
        { name: "Design",    body: "Solution architecture blueprint, infrastructure sizing, integration map, security and access design — pinned to your compliance tier and the systems already in flight." },
        { name: "Build",     body: "Platform provisioning, pipeline and model deployment, integration wiring, data connection setup — installed from a verified reference architecture baseline, not vendor defaults." },
        { name: "Validate",  body: "Load testing, user acceptance, security review, performance baseline. Compliance reports signed off before anything goes live." },
        { name: "Stabilize", body: "30-day post-go-live support, runbook documentation, knowledge transfer, and handoff to your operations team or to TechD Managed Services." },
      ],
    },
    productCoverage: {
      verb: "What we implement",
      rows: [
        { practice: "AI & Generative",    products: ["watsonx.ai (RAG, fine-tuning, deployment)", "watsonx (platform)", "watsonx Orchestrate", "IBM Bob", "NeuralSeek", "IBM SPSS Modeler"] },
        { practice: "Data & Analytics",   products: ["IBM Db2 12.1 (install, migrate, tune)", "watsonx.data (lakehouse, Iceberg, Presto)", "watsonx.data intelligence", "watsonx.data integration", "Cloud Pak for Data on OpenShift", "IBM DataStage (ETL/ELT, streaming)", "IBM Netezza Performance Server", "Cognos Analytics 12 (build, migration, AI Assistant)", "Planning Analytics (TM1, Workspace)"] },
        { practice: "Automation & FinOps", products: ["IBM Apptio (TBM build, cost allocation, ITSM integration)", "IBM Instana (agent rollout, dashboards, alerting)", "IBM Turbonomic (optimization policy, hybrid cloud)"] },
        { practice: "Security & Compliance", products: ["IBM Guardium (DAM policy, vulnerability scanning, compliance reporting)", "IBM QRadar (SIEM build, detection rules, source integration)", "IBM Resilient / QRadar SOAR (playbook deployment, ticketing wiring)"] },
      ],
    },
    crossLinks: [
      { kind: "service",  id: "advisory", label: "Advisory",         blurb: "Start with a one-day platform assessment before scoping a build." },
      { kind: "service",  id: "managed",  label: "Managed Services", blurb: "Hand off the platform we built to the team that built it — no learning curve." },
      { kind: "solution", id: "data-analytics",      label: "Data & Analytics",      blurb: "Db2, DataStage, Netezza, watsonx.data, Cognos, and Planning Analytics builds and migrations." },
      { kind: "solution", id: "security-compliance", label: "Security & Compliance", blurb: "Guardium, QRadar, and Resilient deployments with compliance report validation." },
    ],
    deliverables: [
      { title: "Greenfield builds",            body: "Net-new IBM platforms — watsonx.ai, watsonx.data, Cloud Pak for Data, OpenShift, Cognos, Planning Analytics — delivered to production." },
      { title: "Migrations and replatforming", body: "Legacy ETL, BI, warehouse, and security platforms migrated onto the modern IBM stack with zero-downtime patterns where it matters." },
      { title: "Integration delivery",         body: "API, event, and data integration across IBM and non-IBM systems — including z/OS Connect and IBM Data Replication for mainframe estates." },
    ],
    approach: APPROACH_IMPLEMENTATION,
    solutions: [
      { id: "ai-generative",       proof: "watsonx.ai builds — RAG pipelines, vector store design, prompt governance, and MLOps in production." },
      { id: "data-analytics",      proof: "Db2, DataStage, Netezza Performance Server, watsonx.data, Cognos, and Planning Analytics builds and migrations." },
      { id: "security-compliance", proof: "Guardium, QRadar, and Resilient deployments — use-case rule development and compliance report validation." },
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
      "24×7 operations for AI, data, automation, and security platforms — staffed by the IBM-certified practitioners who build them. SLAs that map to business KPIs, not ticket counts; FinOps that show up in the cloud bill, not the slide deck.",
    whyPoints: [
      { title: "Built and run by the same team", body: "The architects who deployed it operate it. No tier-1 call center triaging a platform they have never seen." },
      { title: "SLAs tied to outcomes",          body: "Pipeline availability, report freshness, model inference uptime, and security alert triage time — not ticket counts and CSAT theater." },
      { title: "FinOps that compounds",          body: "Continuous right-sizing on watsonx, Cloud Pak for Data, OpenShift, and your hyperscaler spend — measured in invoice lines, with Apptio and Turbonomic actions implemented, not just reported." },
      { title: "Platinum escalation path",       body: "When an IBM platform issue requires IBM Engineering involvement, our Platinum Business Partner relationship provides a direct escalation path — not the standard support queue." },
    ],
    spotlight: {
      eyebrow: "How we measure ourselves",
      title: "SLAs tied to outcomes, not ticket counts",
      lede:
        "We do not measure ourselves by how many tickets we closed. We measure by whether your pipelines ran, your reports delivered, your models stayed available, and your security alerts were triaged.",
      bullets: [
        { label: "Pipeline availability",     body: "DataStage and watsonx.data pipeline completion rates — measured against the schedules your business depends on, not against a generic uptime number." },
        { label: "Report and model freshness", body: "Cognos scheduled report delivery and watsonx.ai inference endpoint availability — the metrics your analysts and applications actually feel." },
        { label: "Security alert triage time", body: "Guardium and QRadar alert response time against your regulatory tier (SOX, PCI-DSS, HIPAA, NERC-CIP) — not a generic ticket-resolution SLA." },
        { label: "Platform economics",         body: "Apptio cost allocation and Turbonomic optimization actions reviewed monthly — savings reported in invoice lines, not slide decks." },
      ],
    },
    engagements: [
      { name: "Platform operations",   duration: "Annual contract", summary: "24×7 monitoring, patching, backup/restore, and incident response across watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, Planning Analytics, DataStage, and Netezza Performance Server." },
      { name: "Security operations",   duration: "Annual contract", summary: "Guardium and QRadar tuning, rule development, threat-intel updates, SOAR playbook execution, and incident-response support." },
      { name: "FinOps & optimization", duration: "Quarterly cycle", summary: "Apptio cost allocation reviews, Turbonomic optimization actions, watsonx.ai consumption tracking, and Cloud Pak for Data cartridge right-sizing." },
      { name: "Customer Success",      duration: "Ongoing",         summary: "Quarterly business reviews, IBM platform release alignment, and capability planning with senior practitioners — not an account manager reading a script." },
    ],
    methodology: {
      eyebrow: "Onboarding & operating model",
      title: "From cutover to steady state — and what's coming next",
      subtitle:
        "A defined transition path from day-one onboarding to long-run operations, with an emerging practice for agentic AI built ahead of GA.",
      items: [
        { name: "Discovery",        body: "Documentation sprint to baseline the environment in scope: performance, cost, integrations, escalation paths, compliance posture." },
        { name: "Hyper-care",       body: "Defined post-transition window with elevated coverage, daily syncs, and joint runbook validation before steady-state handoff." },
        { name: "Steady state",     body: "24×7 operations against outcome SLAs, with monthly FinOps reviews and quarterly business reviews tied to IBM platform releases and your business priorities." },
        { name: "Agentic AI ops",   body: "Emerging practice: as watsonx Orchestrate moves toward GA, we are building the control model — agent decision-chain monitoring, runtime policy enforcement, cost attribution by agent and workflow, and failure handling." },
      ],
    },
    productCoverage: {
      verb: "What we manage",
      rows: [
        { practice: "AI & Generative",    products: ["watsonx.ai (model deployment, inference, token consumption)", "watsonx (platform)", "watsonx Orchestrate (emerging — agent operations ahead of GA)", "NeuralSeek", "IBM SPSS Modeler"] },
        { practice: "Data & Analytics",   products: ["Cloud Pak for Data 5.x on OpenShift", "watsonx.data (Iceberg, Presto, ingestion health)", "watsonx.data intelligence / integration", "IBM DataStage (job schedules, lineage)", "IBM Db2 (availability, backup validation)", "IBM Netezza Performance Server", "Cognos Analytics 12 (delivery monitoring, lifecycle)", "Planning Analytics (TM1 cubes, Workspace)"] },
        { practice: "Automation & FinOps", products: ["IBM Apptio (monthly IT financial reporting, license utilization)", "IBM Instana (baseline tracking, threshold tuning)", "IBM Turbonomic (workload placement, monthly savings reporting)"] },
        { practice: "Security & Compliance", products: ["IBM Guardium (DAM policy review, alert triage, compliance reporting)", "IBM QRadar (alert triage, rule tuning, threat intel)", "IBM Resilient / QRadar SOAR (playbook execution, incident lifecycle)"] },
      ],
    },
    crossLinks: [
      { kind: "service",  id: "advisory",       label: "Advisory",       blurb: "Right-size your operations contract with a one-day platform assessment first." },
      { kind: "service",  id: "implementation", label: "Implementation", blurb: "We can build the platform we operate — same team, no transition loss." },
      { kind: "solution", id: "security-compliance", label: "Security & Compliance", blurb: "Guardium and QRadar SOC operations and rule tuning for regulated estates." },
      { kind: "solution", id: "automation-finops",   label: "Automation & FinOps",   blurb: "Continuous Apptio, Instana, and Turbonomic operations with cost actions implemented." },
    ],
    deliverables: [
      { title: "Platform operations",       body: "24×7 operations for watsonx, Cloud Pak for Data, Db2, OpenShift, Cognos, Planning Analytics, and DataStage — monitored, patched, backed up, and tuned." },
      { title: "Security operations",       body: "Guardium and QRadar tuning, rule development, threat intelligence updates, SOAR playbook execution, and incident-response support." },
      { title: "FinOps and optimization",   body: "Continuous right-sizing across IBM Cloud, AWS, Azure, and on-prem — with Apptio and Turbonomic actions implemented, not just reports filed." },
    ],
    approach: APPROACH_MANAGED,
    solutions: [
      { id: "data-analytics",      proof: "Cognos, Planning Analytics, Db2, DataStage, and watsonx.data administration in production." },
      { id: "ai-generative",       proof: "watsonx.ai operations — model drift monitoring, prompt library updates, RAG pipeline health." },
      { id: "security-compliance", proof: "Guardium and QRadar SOC operations and rule tuning for regulated estates." },
      { id: "automation-finops",   proof: "Instana, Apptio, and Turbonomic operations with continuous cost optimization." },
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
      "Role-based enablement for executives, architects, and engineering teams — IBM-certified curricula across watsonx, Cloud Pak for Data, Db2, Cognos Analytics 12, Planning Analytics, DataStage, SPSS Modeler, Apptio, Instana, Turbonomic, Guardium, and QRadar. Hands-on labs run on your data when you want them to.",
    whyPoints: [
      { title: "IBM-certified curricula",      body: "Official IBM training across the data, AI, automation, and security portfolio — delivered by Platinum-tier practitioners with active IBM certifications on the platforms they teach." },
      { title: "Your data, your use cases",    body: "Bring-your-own-data labs available — train against your schemas, your dashboards, your security policies, and your deployment environment, not a generic IBM sample database." },
      { title: "Role-based, not one-size",     body: "Executive briefings, architect bootcamps, and engineering labs — three tracks, three audiences, three different formats." },
      { title: "Modern stack only",            body: "Cognos Analytics 12 and Planning Analytics Workspace — legacy Cognos 10 modules (Query Studio, Workspace Advanced, Cognos Connection) dropped from the catalog." },
    ],
    spotlight: {
      eyebrow: "How the catalog is organized",
      title: "Three role-based tracks, four delivery formats",
      lede:
        "The catalog is organized by who needs to learn what — not by product family. Pick the track that matches the audience, then pick the format that matches your team's geography and tools.",
      bullets: [
        { label: "Executive Briefings",   body: "Half-day or full-day sessions for CIOs and business leaders: IBM AI Operating Model overview, watsonx platform capabilities, and ROI framing for the four practice areas." },
        { label: "Architect Bootcamps",   body: "2–5 day deep dives for solution architects: platform design, reference architectures, and integration patterns across AI & Generative, Data & Analytics, Automation & FinOps, and Security & Compliance." },
        { label: "Engineering Labs",      body: "Hands-on configuration courses for data engineers, developers, and administrators — platform-specific, instructor-led, and run on your data when you want them to." },
        { label: "Custom curriculum",     body: "Bespoke programs scoped from a discovery session: skills-gap mapping, your platform configuration, your governance model, and your use cases." },
      ],
    },
    engagements: [
      { name: "Executive briefings",   duration: "Half-day to full-day", summary: "Strategy-level briefings on watsonx, IBM AI Operating Model, hybrid cloud, and security for leadership teams — outcomes, not feature tours." },
      { name: "Architect bootcamps",   duration: "2–5 days",       summary: "Deep architectural training on watsonx.ai, watsonx.data, Cloud Pak for Data, OpenShift, Apptio, and Guardium for senior technical staff." },
      { name: "Engineering labs",      duration: "1–5 days",       summary: "Hands-on labs across Cognos Analytics 12, Planning Analytics, DataStage, Db2, SPSS Modeler, Instana, Turbonomic, Guardium, and QRadar — instructor-led, your data optional." },
      { name: "Custom curriculum",     duration: "Project-based",  summary: "Bespoke programs blending IBM-certified content with your platform configuration, governance model, and use cases." },
    ],
    methodology: {
      eyebrow: "Delivery formats",
      title: "Pick the format that matches your team",
      subtitle:
        "All four tracks are available in all four formats. Custom engagements use your data and your environments.",
      items: [
        { name: "Online / web-based", body: "Self-paced for individual contributors and asynchronous teams — IBM-certified content delivered on-demand." },
        { name: "Instructor-led online", body: "Cohort learning for distributed teams with live Q&A — pairs well with executive briefings and architect bootcamps." },
        { name: "Instructor-led on-site", body: "Hands-on labs requiring on-premises platform access or team-cohesion goals — TechD instructors travel to you." },
        { name: "Custom",            body: "Bespoke curriculum using your data, your environments, and your team's role context — scoped from a discovery session, not picked from a catalog." },
      ],
    },
    productCoverage: {
      verb: "What we train on",
      rows: [
        { practice: "AI & Generative",    products: ["watsonx.ai (Studio, prompting, fine-tuning, RAG, deployment)", "watsonx Orchestrate (emerging — tracking GA)", "IBM Bob (IDE integration, governance)", "NeuralSeek (knowledge bases, conversational AI)", "IBM SPSS Modeler (visual model design, deployment)"] },
        { practice: "Data & Analytics",   products: ["IBM Db2 12.1 (administration, AI query optimization, performance)", "watsonx.data (lakehouse, Iceberg, Presto)", "watsonx.data intelligence", "Cloud Pak for Data Platform Operations (OpenShift, services, IAM)", "IBM DataStage (job design, parallel framework, monitoring)", "Cognos Analytics 12 (foundational + advanced — Framework Manager, AI Assistant, administration)", "Planning Analytics (TM1, Workspace, budgeting & forecasting)"] },
        { practice: "Automation & FinOps", products: ["IBM Apptio (TBM orientation, cost allocation, reporting)", "IBM Instana (APM navigation, alerting, baselines)", "IBM Turbonomic (optimization actions, policy, cloud cost reporting)"] },
        { practice: "Security & Compliance", products: ["IBM Guardium (DAM policy, compliance reporting, vulnerability assessment)", "IBM QRadar (SIEM fundamentals, use-case configuration, alert triage)", "IBM Resilient / QRadar SOAR (playbook design, incident lifecycle)"] },
      ],
    },
    crossLinks: [
      { kind: "service",  id: "advisory",       label: "Advisory",       blurb: "Pair an executive briefing with a one-day platform assessment for a full leadership read-out." },
      { kind: "service",  id: "implementation", label: "Implementation", blurb: "Every implementation includes structured knowledge transfer — training built into the engagement." },
      { kind: "solution", id: "ai-generative",  label: "AI & Generative", blurb: "watsonx.ai, watsonx Orchestrate, and SPSS Modeler enablement for data science and platform teams." },
      { kind: "solution", id: "data-analytics", label: "Data & Analytics", blurb: "Cognos Analytics 12, Planning Analytics, Db2, and DataStage training across analyst, developer, and admin tracks." },
    ],
    deliverables: [
      { title: "Executive briefings",     body: "Strategy-level sessions for leadership — what the platform makes possible, what it costs, what the next decision is." },
      { title: "Architect bootcamps",     body: "Multi-day deep dives on watsonx, Cloud Pak for Data, OpenShift, Apptio, and Guardium for senior technical teams." },
      { title: "Hands-on engineering labs", body: "Instructor-led labs across Cognos Analytics 12, Planning Analytics, DataStage, Db2, SPSS Modeler, Instana, Turbonomic, Guardium, and QRadar — online or on-site." },
    ],
    approach: APPROACH_TRAINING,
    solutions: [
      { id: "ai-generative",       proof: "watsonx, watsonx.ai, watsonx Orchestrate, NeuralSeek, and SPSS Modeler enablement for data science and platform teams." },
      { id: "data-analytics",      proof: "Cognos Analytics 12, Planning Analytics, Db2, and DataStage training across analyst, developer, and admin tracks." },
      { id: "automation-finops",   proof: "Apptio, Instana, and Turbonomic enablement for FinOps practitioners and platform operations teams." },
      { id: "security-compliance", proof: "Guardium, QRadar, and Resilient training for security operations teams." },
    ],
    industries: [
      { id: "healthcare",       proof: "Cognos and Planning Analytics enablement for clinical and operational analytics teams." },
      { id: "higher-education", proof: "Analytics and BI enablement for institutional research and finance teams." },
      { id: "insurance",        proof: "SPSS Modeler and Cognos training for actuarial and analytics teams." },
      { id: "public-sector",    proof: "Cloud Pak for Data, watsonx, and Guardium enablement for federal teams." },
    ],
    stats: [
      { value: "IBM-certified",     label: "Curricula" },
      { value: "On-site or online", label: "Delivery modes" },
    ],
  },
};
