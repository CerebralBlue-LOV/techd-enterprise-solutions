export type ResourceType = "case-studies" | "blog" | "webinars" | "events";

export type EventFormat = "virtual" | "in-person" | "conference" | "roundtable";

export type Resource = {
  id: string;
  slug: string;
  type: ResourceType;
  title: string;
  summary: string;
  /** Display date string, e.g. "2025", "May 2026", or "On-demand". */
  date: string;
  /** Industry or vertical label shown as an eyebrow on cards and detail pages. */
  industry?: string;
  /** Byline for blog posts. */
  author?: string;
  /** Body paragraphs rendered on the detail page. */
  body?: string[];
  /** Link to the original external source (e.g. IBM case study page). */
  externalUrl?: string;
  /** When true, the entry is hidden from list pages and detail pages return 404. */
  draft?: boolean;

  // ── Extended fields (all optional; per docs/revisions/resources/*.md) ──

  /** Current IBM product names referenced. Rendered as chip row on cards. */
  products?: string[];
  /** Topical tags for blog/webinars. */
  tags?: string[];
  /** Practice slug, e.g. "data-analytics". */
  practice?:
    | "ai-generative"
    | "data-analytics"
    | "automation-finops"
    | "security-compliance";
  /** Event format (Events page only). */
  format?: EventFormat;
  /** Event location, e.g. "New York" or "Virtual". */
  location?: string | null;
  /** Registration URL for events / webinars. */
  registrationUrl?: string | null;
  /** ISO date string for blog publishing / event scheduling. */
  publishedAt?: string;
};

export const RESOURCES: Resource[] = [
  // ─── Case Studies ────────────────────────────────────────────────────────────

  {
    id: "cs-1",
    slug: "retail-ai-platform-watsonx-neuroseek",
    type: "case-studies",
    title:
      "US retailer rebuilds its customer platform on Db2, watsonx Assistant, and NeuralSeek",
    summary:
      "Personalized product descriptions via RAG, call-center efficiency, and real-time shopper analytics — co-delivered with IBM and Cerebral Blue.",
    date: "2025",
    industry: "Retail",
    practice: "ai-generative",
    products: ["IBM Db2", "watsonx Assistant", "NeuralSeek"],
    externalUrl:
      "https://www.ibm.com/case-studies/blog/ibm-and-techd-partner-to-securely-share-data-and-power-insights-with-gen-ai",
    body: [
      "A prominent US family-owned retail enterprise was running a fragmented data environment that made personalized customer experiences and real-time analytics impossible to deliver at scale. Their product catalog spanned thousands of SKUs with inconsistent descriptions, and contact center teams spent significant time searching for accurate product information without a reliable way to surface it quickly.",
      "TechD, IBM, and Cerebral Blue co-delivered an AI data platform built on IBM Db2, watsonx Assistant, and NeuralSeek. The platform applies retrieval-augmented generation to the retailer's existing product knowledge base — generating accurate, personalized product descriptions at scale and enabling contact center staff to surface precise answers grounded in verified catalog content. A real-time analytics layer built on Db2 gives the business clear visibility into shopper behavior across channels.",
      "This engagement is an IBM-published reference and represents TechD's current production AI reference architecture. It demonstrates the practical playbook for data-intensive enterprises that need generative AI outputs to be accurate, sourced, and explainable — without sacrificing the speed that real business use cases require.",
    ],
  },

  {
    id: "cs-gaming-lottery",
    slug: "lottery-gaming-watsonx-neuralseek",
    type: "case-studies",
    title: "North American lottery operator cuts player support workload with NeuralSeek and watsonx",
    summary:
      "A multi-state lottery and gaming enterprise deployed a NeuralSeek + watsonx Assistant virtual agent — jurisdiction-aware, PII-compliant, available 24/7.",
    date: "2024",
    industry: "Public Sector",
    practice: "ai-generative",
    products: ["NeuralSeek", "watsonx Assistant", "IBM Cloud"],
    externalUrl: "https://www.ibm.com/case-studies/techd",
    body: [
      "A North American lottery and digital gaming enterprise serving players across multiple states and jurisdictions was handling a high volume of player queries — each requiring jurisdiction-specific, game-specific answers. Response time lagged because of the precision each answer demanded: the rules for one state's lottery didn't apply in another, and the support team couldn't scale to match query volume.",
      "TechD designed and deployed a virtual agent built on NeuralSeek, IBM watsonx Assistant, and IBM Cloud. NeuralSeek's RAG architecture grounds every response in the enterprise's own knowledge base — pulling accurate, jurisdiction-specific content without surfacing out-of-jurisdiction rules or exposing player PII. The solution handles multi-state, multi-platform query volume without requiring manual triage.",
      "Players now receive accurate answers in seconds, 24 hours a day, regardless of query complexity or jurisdiction. The virtual agent reduced the customer support team's workload by 40–60%, redirecting staff toward higher-value player services. The architecture enforces PII protections for thousands of players across all state platforms — an explicit design requirement for multi-jurisdiction gaming operations.",
    ],
    draft: false,
  },

  // Legacy placeholders — sourced from published TechD case studies (techd.com/our-customers).
  {
    id: "cs-pharma-bi",
    slug: "pharma-sales-marketing-cognos",
    type: "case-studies",
    title: "Sales and marketing analytics for a Fortune 500 pharma company",
    summary:
      "Governed Cognos Analytics environment for commercial reporting across brand, region, and channel.",
    date: "TBD",
    industry: "Healthcare",
    practice: "data-analytics",
    products: ["IBM Cognos Analytics"],
    body: [
      "A Fortune 500 pharmaceutical company was running commercial analytics across a fragmented stack — multiple tools, no standard, data scattered across formats and locations. Sales and marketing teams across brands, regions, and channels had no single view for reporting, and a significant portion of report development was outsourced to external vendors.",
      "TechD structured the company's commercial data into a single IBM Cognos Analytics environment, establishing a governed data mart for reporting across brands, regions, and channels. External vendor dependencies for data manipulation and report development were replaced with internally managed Cognos workflows.",
      "The engagement delivered a uniform analytics platform across divisions and gave commercial teams a single source for operational and performance data. IBM Cognos Analytics became the company's standard business intelligence tool across all divisions, reducing reliance on external vendors for routine reporting.",
    ],
    draft: false,
  },
  {
    id: "cs-hospital-dw",
    slug: "hospital-data-warehouse",
    type: "case-studies",
    title: "Enterprise data warehouse for a leading pediatric health system",
    summary:
      "Unified clinical and financial data from two separate ERP environments into a single IBM Netezza warehouse — nightly reporting dropped from five hours to 45 seconds.",
    date: "TBD",
    industry: "Healthcare",
    practice: "data-analytics",
    products: ["IBM Netezza Performance Server"],
    body: [
      "A pediatric health system was running two separate ERP environments — Oracle for patient records and Lawson for financial data — with no shared warehouse connecting them. The gap made cross-functional reporting impossible. Nightly end-of-day processing ran five hours, leaving the operations team waiting each morning for numbers that were already hours old.",
      "TechD integrated both ERP sources into a unified data warehouse built on IBM Pure Data System for Analytics (now IBM Netezza Performance Server), creating a single governed layer for patient and financial data. The architecture eliminated the redundant tables each system had previously maintained independently.",
      "Nightly end-of-day reporting dropped from five hours to 45 seconds. The unified warehouse gave operations a reliable, joined view of clinical and financial data — and removed the manual reconciliation work the two-system environment had required.",
    ],
    draft: false,
  },
  {
    id: "cs-cancer-bi",
    slug: "cancer-treatment-center-bi",
    type: "case-studies",
    title: "Planning Analytics upgrade for the nation's largest private cancer center",
    summary:
      "A system-wide TM1 upgrade — with a full-time on-site TechD consultant — brought system utilization from 30% to 70% and streamlined billing, payroll, budgeting, and forecasting.",
    date: "TBD",
    industry: "Healthcare",
    practice: "data-analytics",
    products: ["IBM Planning Analytics", "IBM DataStage", "IBM Db2"],
    body: [
      "The nation's largest private cancer center had IBM DataStage and IBM Db2 deployed for ETL and warehousing, but its financial IT team was running a legacy version of Cognos TM1 — utilizing roughly 30% of what the platform was capable of. Custom budgeting tools were written in an unsupported language, and the pace of new feature releases was widening the gap.",
      "TechD assigned a full-time on-site consultant to run a system-wide upgrade to IBM Planning Analytics. The engagement covered migration of existing models to the current version, custom SDK development to ease deployment, and hands-on training for department heads and financial analysts on dashboard features, reporting, and forecasting tools.",
      "IBM Planning Analytics now governs billing, payroll, budgeting, and forecasting across the organization. Integrated reporting tools — including SPSS analytics — allow analysts to detect potential fraud patterns. System utilization improved from 30% to 70%, and real-time reporting is accessible to thousands of users across departments.",
    ],
    draft: false,
  },
  {
    id: "cs-university-cognos",
    slug: "university-cognos-analytics",
    type: "case-studies",
    title: "IBM Cognos Analytics rollout for a Philadelphia public research university",
    summary:
      "TechD replaced siloed legacy reporting tools across four divisions — on a hard decommission deadline — and trained 100+ team members on a unified Cognos platform.",
    date: "TBD",
    industry: "Higher Education",
    practice: "data-analytics",
    products: ["IBM Cognos Analytics"],
    body: [
      "A comprehensive public research university in Philadelphia was running siloed legacy reporting tools across institutional advancement, finance, human resources, and student records — four divisions, no common platform. The university faced a hard deadline to decommission those tools, and meeting it would produce immediate savings on licensing, maintenance, and support.",
      "TechD audited the university's reporting environment and identified redundant reports being triggered at sub-optimal times. They implemented IBM Cognos Analytics reporting and dashboards across all four divisions and connected the pipeline to a unified enterprise scheduler that fires reporting jobs after each nightly database refresh. TechD also audited license and usage models, identifying unused and underused seats across the environment.",
      "The university now runs reporting on optimized computing cycles instead of on-demand. Over a six-month engagement, TechD eliminated redundant reports, right-sized the license model, and removed unused accounts. Customized Cognos training delivered to over 100 team members reduced long-term training costs and lessened dependence on central IT for routine reporting.",
    ],
    draft: false,
  },
  {
    id: "cs-comms-planning-analytics",
    slug: "communications-firm-planning-analytics",
    type: "case-studies",
    title: "Planning Analytics upgrade for a major military and commercial communications supplier",
    summary:
      "TechD migrated a legacy TM1 environment onto IBM Planning Analytics — report generation dropped from hours to minutes and financial analysts gained real-time data access.",
    date: "TBD",
    industry: "Media & Entertainment",
    practice: "data-analytics",
    products: ["IBM Planning Analytics"],
    body: [
      "A major military and commercial communications supplier was running an outdated Cognos BI and Enterprise Planning environment. Financial analysts lacked the data granularity they needed for active planning, report generation was taking hours, and the legacy TM1 models couldn't support integrated rolling forecasts or scenario analysis.",
      "TechD installed the current version of IBM Planning Analytics, migrated existing TM1 models to the updated platform, and built a workspace dashboard for integrated financial reporting. The engagement covered data migration, environment configuration, and hands-on training on planning, budgeting, and forecasting capabilities.",
      "Report generation time dropped from hours to minutes. Financial analysts gained direct, real-time access to planning and budgeting data — without the manual preparation steps the legacy environment had required. The updated platform now supports rolling forecasts and scenario modeling that weren't possible before.",
    ],
    draft: false,
  },

  // Original draft entries kept for parity.
  {
    id: "cs-2",
    slug: "insurance-claims-modernization",
    type: "case-studies",
    title: "Tier-1 carrier modernizes claims at scale",
    summary:
      "A modular claims platform replaced a 30-year-old mainframe path — without a single missed cycle.",
    date: "2025",
    industry: "Insurance",
    draft: true,
  },
  {
    id: "cs-3",
    slug: "university-research-cloud",
    type: "case-studies",
    title: "R1 university stands up secure research cloud",
    summary:
      "Identity, governance, and FinOps for grant-funded research workloads across three campuses.",
    date: "2025",
    industry: "Higher Education",
    draft: true,
  },

  // ─── Blog ────────────────────────────────────────────────────────────────────

  {
    id: "bl-1",
    slug: "agentic-ai-operating-model",
    type: "blog",
    title: "Agentic AI is an operating model, not a feature",
    summary: "Why the org chart matters more than the model size.",
    date: "May 2026",
    practice: "ai-generative",
    tags: ["AI & Generative", "Operating model"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-2",
    slug: "watsonx-enterprise-governance",
    type: "blog",
    title: "What watsonx gets right that the hyperscalers miss",
    summary: "Governance, lineage, and the boring parts that make AI auditable.",
    date: "April 2026",
    practice: "ai-generative",
    products: ["watsonx.governance"],
    tags: ["Governance", "watsonx"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-3",
    slug: "zero-trust-regulated-enterprises",
    type: "blog",
    title: "Zero-trust without slowing the business",
    summary: "A pragmatic sequence for regulated enterprises.",
    date: "March 2026",
    practice: "security-compliance",
    products: ["IBM Guardium", "IBM QRadar"],
    tags: ["Zero trust", "Security & Compliance"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },

  // Net-new draft topics from docs/revisions/resources/blog.md §5.
  {
    id: "bl-datastage-watsonx",
    slug: "datastage-to-watsonx-data-integration",
    type: "blog",
    title:
      "From DataStage to watsonx.data integration: what the rebrand means for your pipelines",
    summary:
      "A migration decision framework for data engineers running active DataStage deployments — covers watsonx.data integration v2.1.x and the path off legacy ETL jobs.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM watsonx.data"],
    tags: ["Data integration", "Migration"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-cognos-12-cutoff",
    slug: "cognos-analytics-12-vs-11-2-support-cutoff",
    type: "blog",
    title:
      "Cognos Analytics 12 vs. 11.2.x: what the April 2026 support cutoff means",
    summary:
      "A decision-forcing read for Cognos administrators on 11.2.x. What changes operationally, what to test first, and how to sequence a low-risk upgrade.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM Cognos Analytics"],
    tags: ["Cognos", "Migration"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-finops-loop",
    slug: "finops-apptio-turbonomic-instana",
    type: "blog",
    title:
      "FinOps is not a tool problem: closing the loop between observability and budgets",
    summary:
      "How Apptio, Turbonomic, and Instana connect into a single workflow — for IT finance leads and cloud ops engineers who own the spend.",
    date: "TBD",
    practice: "automation-finops",
    products: ["IBM Apptio", "IBM Turbonomic", "IBM Instana"],
    tags: ["FinOps", "Observability"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-orchestrate-erp",
    slug: "watsonx-orchestrate-erp-without-integration-project",
    type: "blog",
    title:
      "Agentic AI in the enterprise: connecting watsonx Orchestrate to your ERP without an integration project",
    summary:
      "What watsonx Orchestrate's connectors and agentic control plane actually do — and where TechD's implementation work picks up beyond the out-of-box demo.",
    date: "TBD",
    practice: "ai-generative",
    products: ["watsonx Orchestrate"],
    tags: ["Agentic AI", "Automation"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-planning-analytics-21",
    slug: "planning-analytics-2-1-what-changed",
    type: "blog",
    title: "Planning Analytics 2.1: what actually changed for FP&A teams",
    summary:
      "The 2025–2026 release, IDC MarketScape Leader recognition, and SaaS deployment options — without the vendor-speak.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM Planning Analytics"],
    tags: ["FP&A", "Planning Analytics"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "bl-spss-automl",
    slug: "spss-modeler-automl",
    type: "blog",
    title: "IBM SPSS Modeler for AutoML when you don't have a data science team",
    summary:
      "A practitioner-relevant angle for analytics leads at mid-size healthcare and insurance organizations evaluating AutoML.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM SPSS Modeler"],
    tags: ["AutoML", "Analytics"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },

  // ─── Webinars ────────────────────────────────────────────────────────────────

  {
    id: "wb-1",
    slug: "ai-agents-that-pass-an-audit",
    type: "webinars",
    title: "Building AI agents that pass an audit",
    summary: "60-minute walkthrough with TechD and IBM principal engineers.",
    date: "On-demand",
    practice: "ai-generative",
    products: ["watsonx Orchestrate", "watsonx.governance"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "wb-2",
    slug: "data-lake-to-data-product",
    type: "webinars",
    title: "From data lake to data product",
    summary: "How to ship governed datasets the business will actually use.",
    date: "On-demand",
    practice: "data-analytics",
    products: ["IBM watsonx.data"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },

  // Net-new draft webinars from docs/revisions/resources/webinars.md §5.
  {
    id: "wb-neuralseek-rag",
    slug: "neuralseek-watsonx-rag-regulated-industries",
    type: "webinars",
    title:
      "Deploying NeuralSeek on watsonx: RAG architecture for regulated industries",
    summary:
      "60-minute technical deep-dive plus live Q&A. Multi-LLM RAG pipeline, citation governance, and HIPAA / FedRAMP deployment constraints.",
    date: "TBD",
    practice: "ai-generative",
    products: ["NeuralSeek", "watsonx.ai"],
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "wb-turbonomic-instana",
    slug: "turbonomic-instana-apm-to-cost-reduction",
    type: "webinars",
    title:
      "Turbonomic + Instana: from APM alert to cloud cost reduction in one workflow",
    summary:
      "45-minute demo connecting Instana's full-fidelity tracing to Turbonomic's AI-driven workload optimization — the full Automation & FinOps chain.",
    date: "TBD",
    practice: "automation-finops",
    products: ["IBM Instana", "IBM Turbonomic"],
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "wb-pa-21-migration",
    slug: "planning-analytics-21-tm1-to-saas",
    type: "webinars",
    title: "Planning Analytics 2.1 migration: moving your TM1 models to SaaS",
    summary:
      "60-minute hands-on lab for FP&A teams on Planning Analytics on-prem. Migration framework, SaaS deployment, and what changes operationally.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM Planning Analytics"],
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "wb-guardium-ddr",
    slug: "guardium-ddr-insider-threats-hybrid-cloud",
    type: "webinars",
    title:
      "Guardium DDR in practice: detecting insider threats in hybrid multi-cloud",
    summary:
      "45-minute demo of IBM Guardium Data Detection & Response — discovery, classification, and real-time threat detection across on-prem, AWS, and Azure.",
    date: "TBD",
    practice: "security-compliance",
    products: ["IBM Guardium"],
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "wb-cognos-12-agents",
    slug: "cognos-analytics-12-agentic-bi",
    type: "webinars",
    title: "Cognos Analytics 12: agentic AI agents for self-service BI",
    summary:
      "45-minute walkthrough of the 2026 AI agent features in Cognos Analytics 12.1.2 — natural language query, automated insight generation, governance controls.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM Cognos Analytics"],
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },

  // ─── Events ──────────────────────────────────────────────────────────────────

  {
    id: "ev-1",
    slug: "ibm-think-2026",
    type: "events",
    title: "IBM Think 2026 — TechD lounge",
    summary: "Meet our principals at the Partner Pavilion.",
    date: "May 2026",
    industry: "Boston",
    format: "conference",
    location: "Boston",
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "ev-2",
    slug: "enterprise-ai-roundtable-nyc",
    type: "events",
    title: "Enterprise AI roundtable, NYC",
    summary: "Closed-door session for CIOs and CDAOs.",
    date: "June 2026",
    industry: "New York",
    practice: "ai-generative",
    format: "roundtable",
    location: "New York",
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },

  // Net-new draft events from docs/revisions/resources/events.md §5.
  {
    id: "ev-lunch-watsonx",
    slug: "lunch-and-learn-watsonx-ai-real-vs-hype",
    type: "events",
    title:
      "TechD Virtual Lunch and Learn: watsonx.ai for the enterprise — what's real vs. the hype",
    summary:
      "60-minute virtual session for solution architects and data engineers. What watsonx.ai actually does in production, and where TechD's delivery work picks up.",
    date: "TBD",
    practice: "ai-generative",
    products: ["watsonx.ai", "NeuralSeek"],
    format: "virtual",
    location: "Virtual",
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "ev-workshop-governance",
    slug: "workshop-data-governance-ai-readiness",
    type: "events",
    title: "TechD Workshop: data governance and AI readiness — half-day hands-on",
    summary:
      "Half-day workshop for data platform leads at healthcare and insurance organizations. watsonx.data, Cloud Pak for Data, and governance anchored to HIPAA and PCI-DSS.",
    date: "TBD",
    practice: "data-analytics",
    products: ["IBM watsonx.data", "IBM Cloud Pak for Data"],
    format: "in-person",
    location: "TBD",
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "ev-roundtable-finops",
    slug: "roundtable-finops-spend-to-action",
    type: "events",
    title:
      "TechD Roundtable: FinOps in practice — closing the gap between spend visibility and action",
    summary:
      "Executive roundtable (≤20 attendees) for VP/CTO and IT finance leads. Apptio, Turbonomic, and Instana as a connected workflow rather than three separate tools.",
    date: "TBD",
    practice: "automation-finops",
    products: ["IBM Apptio", "IBM Turbonomic", "IBM Instana"],
    format: "roundtable",
    location: "TBD",
    registrationUrl: null,
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
];
