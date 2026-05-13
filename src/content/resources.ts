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

  // Legacy placeholders — kept draft until legal-approved metrics + client names land.
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
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "cs-hospital-dw",
    slug: "hospital-data-warehouse",
    type: "case-studies",
    title: "Enterprise data warehouse for a large hospital network",
    summary:
      "Modernized clinical and operational reporting on Db2 and watsonx.data — a single governed source for downstream analytics.",
    date: "TBD",
    industry: "Healthcare",
    practice: "data-analytics",
    products: ["IBM Db2", "IBM watsonx.data"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "cs-cancer-bi",
    slug: "cancer-treatment-center-bi",
    type: "case-studies",
    title: "Business intelligence for a cancer treatment center",
    summary:
      "Cognos Analytics deployment supporting clinical operations, throughput, and oncology service-line reporting.",
    date: "TBD",
    industry: "Healthcare",
    practice: "data-analytics",
    products: ["IBM Cognos Analytics"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "cs-university-cognos",
    slug: "university-cognos-analytics",
    type: "case-studies",
    title: "Cognos Analytics rollout for a large university system",
    summary:
      "Self-service BI across academic, financial, and operational reporting for a multi-campus higher education system.",
    date: "TBD",
    industry: "Higher Education",
    practice: "data-analytics",
    products: ["IBM Cognos Analytics"],
    draft: false, /* PREVIEW ONLY — revert before publish */
  },
  {
    id: "cs-comms-planning-analytics",
    slug: "communications-firm-planning-analytics",
    type: "case-studies",
    title: "Planning Analytics for a major communications firm",
    summary:
      "Migration off legacy TM1 onto IBM Planning Analytics 2.1, supporting rolling forecasts and scenario modeling.",
    date: "TBD",
    industry: "Media & Entertainment",
    practice: "data-analytics",
    products: ["IBM Planning Analytics"],
    draft: false, /* PREVIEW ONLY — revert before publish */
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
    draft: false, /* PREVIEW ONLY — revert before publish */
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
    draft: false, /* PREVIEW ONLY — revert before publish */
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
