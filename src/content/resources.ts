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
    body: [
      "The conversation about agentic AI inside large enterprises tends to focus on which model to use, how to connect it to internal data, and which vendor's agent framework is most mature. These are real questions. But organizations that treat agentic AI as a technology procurement decision — rather than an operating model decision — consistently hit the same wall six months in: agents that work in a demo and stall in production.",
      "The IBM AI Operating Model frames AI deployment across four disciplines: govern, integrate, orchestrate, and automate. The sequencing matters. Governance — establishing who is accountable for AI decisions, what data is permitted in which model, and how outputs are audited — has to come before orchestration. An agent that can take action in a production system without a governance layer attached to it is not an AI asset; it is a liability.",
      "The organizations that TechD sees moving fastest are not the ones with the largest AI budgets. They are the ones that assigned an AI operating model owner before they assigned an AI platform. That person typically sits between IT and the business unit — not fully in either camp — and their job is to define the lanes before agents start driving. Roles, data access policies, escalation paths, and audit trails need to exist as institutional infrastructure, not as per-project afterthoughts.",
      "When we implement watsonx Orchestrate with a client, the first month of the engagement is rarely about the software. It is about understanding who owns the workflows the agent is going to touch, which systems it can write to versus read from, and what a human-in-the-loop review step looks like for the use case in scope. The model selection — and there are good reasons to choose one model over another — comes after those questions are answered. That ordering is the operating model.",
    ],
    draft: false,
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
    body: [
      "AWS Bedrock, Azure AI Foundry, and Google Vertex AI are all capable platforms. If you need to fine-tune a model quickly, connect it to an internal knowledge base, and deploy it into an application, each of them can get you there in days. The gap shows up later — when an auditor asks which training data the model saw, when a model starts drifting and you need to know which version of the weights you are running in production, and when a regulator asks for a model risk assessment.",
      "watsonx.governance addresses this gap specifically. AI Factsheets are automated model cards that capture training data provenance, evaluation results, deployment metadata, and drift metrics — not as a one-time document, but as a live record that updates through the model lifecycle. For a healthcare organization under HIPAA scrutiny or a financial services firm under SR 11-7 model risk management requirements, that record is not optional.",
      "The lineage capability in watsonx.governance also traces how data moved from its source through transformation steps to the model. That is rarely available out of the box in hyperscaler tooling, and building it yourself requires instrumentation at every pipeline stage. In regulated industries, the absence of that lineage trail is not a technical debt problem — it is a compliance exposure.",
      "None of this means watsonx is the right choice for every workload. If you are building a general-purpose consumer application that does not handle regulated data, AWS and Azure have mature ecosystems and aggressive pricing. The decision point comes when the AI output has business, legal, or patient-care consequences attached to it. That is where IBM's deliberate investment in governance infrastructure translates into a practical procurement argument, not just a vendor positioning story.",
    ],
    draft: false,
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
    body: [
      "Zero trust as a security architecture principle is not new, but the implementation gap between the principle and what most enterprises actually run is significant. The concept — never trust, always verify, limit lateral movement — is sound. The problem is that most zero-trust rollouts start at the perimeter and work inward, which means the parts of the environment that carry the highest business risk (the data tier) are often the last to be covered.",
      "For regulated enterprises, we recommend inverting that sequence. Start with data-level access controls using IBM Guardium Data Protection. Guardium monitors all access to sensitive data stores — databases, data warehouses, cloud object storage — at the session level, enforcing least-privilege policies and logging every query. HIPAA, PCI-DSS, and FedRAMP audit requirements are satisfied by the access record Guardium produces; that is often the fastest path to a compliance posture improvement that a regulator can verify.",
      "Once the data perimeter is instrumented, extend zero-trust controls to the network and identity layers using IBM QRadar SIEM. QRadar correlates events across identity providers, network flows, and endpoint telemetry to surface anomalous access patterns — a user pulling an unusual volume of records at an unusual hour, a service account accessing a system it has never touched before. These are the signals that Guardium alone does not generate, because individual queries may each be within policy even when the aggregate behavior is not.",
      "The sequencing matters practically because each layer has its own change management cycle. Rolling out Guardium does not require changes to user workflows — it monitors passively at first, then enforces incrementally. That makes it a lower-friction starting point than identity re-architecture, which touches every user at login. Get the data layer right, demonstrate audit value, then build the political capital internally to move the identity and network layers. That order has a better delivery track record than starting with a full zero-trust framework rollout on day one.",
    ],
    draft: false,
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
    body: [
      "IBM DataStage has been the backbone of enterprise ETL for decades. If you have production pipelines running on DataStage today, the rebrand to watsonx.data integration (as of the v2.1.x release) does not break anything — your existing jobs still run, your connectors still work, and your operational procedures do not need to change on day one. What has changed is the architectural home the product lives in, and that affects decisions you will be making in the next 12 to 24 months.",
      "Under the watsonx umbrella, IBM is aligning DataStage's pipeline execution engine with watsonx.data's Presto-based query layer and watsonx.governance's lineage tracking. In practice, this means pipelines built in watsonx.data integration v2.1.x can participate in the same data lineage graph as your warehousing and AI workloads — a capability that was previously only available through separate instrumentation. For teams running both DataStage ETL and Cognos or watsonx.ai on the same data sets, that lineage connection is operationally useful, not just architecturally elegant.",
      "The GPU acceleration announced in the May 2026 release targets data transformation jobs at scale — specifically large joins and aggregations that previously required throwing more CPU cores at the problem. If your current DataStage environment is compute-constrained at month-end processing windows, this is worth evaluating in a sandbox before your next infrastructure renewal cycle.",
      "The migration decision framework we use with clients is simple: if your DataStage jobs are stable and meeting SLAs, there is no urgent reason to replatform them — the v2.1.x engine runs them as-is. The trigger to invest in a migration to the new authoring environment is usually one of three things: you need the lineage integration for a governance initiative, you are spinning up new pipelines that will feed watsonx.ai and want unified tooling, or your current DataStage version has reached end of standard support. In any of those cases, we can scope a migration without touching pipelines that are already working.",
    ],
    draft: false,
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
    body: [
      "IBM moved Cognos Analytics 11.2.x to tiered support status as of April 30, 2026. This does not mean the product stops working that day — IBM's tiered support model (Extended Support, then Sustained Support) provides a structured wind-down, not an immediate cliff. But it does mean that new defect fixes and security patches are no longer guaranteed on the same cadence as they were under standard support. For organizations where Cognos is in the path of regulated data, the support tier change is a risk management event, not just an IT scheduling concern.",
      "Cognos Analytics 12 (current release: 12.1.2) is not simply a version increment on 11.2.x. IBM rebuilt the rendering engine, replaced the legacy Java-based framework for dashboards with a modern web component architecture, and reorganized the administration interface. Existing reports and dashboards migrate cleanly for the majority of use cases — IBM's own migration tooling handles the bulk of metadata conversion — but there are edge cases in custom JavaScript extensions and embedded analytics that require manual review before go-live.",
      "The migration sequence we use in practice: first, audit your active report inventory and tag reports by usage frequency. A typical enterprise Cognos environment has a long tail of reports that were built years ago and are now run by two people a quarter. Those do not need to be migrated at all — they can be archived. The actively used, business-critical reports get migrated and regression-tested first, in a parallel 12.x environment, before the old instance is decommissioned. That approach consistently produces faster timelines than trying to migrate everything at once.",
      "On the platform side, Cognos Analytics 12 has tightened its integration with IBM Planning Analytics and watsonx.data — both report-level and at the data source level. If you are running Planning Analytics alongside Cognos, the v12 upgrade is also the point at which it makes sense to review your datasource architecture and consolidate any redundant connections. Coming to that upgrade in 2026 with a clean datasource inventory puts you in a better position than carrying forward the accumulated configuration debt from 11.x.",
    ],
    draft: false,
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
    body: [
      "Most FinOps programs stall at the reporting stage. Teams get good at showing where the money went — cloud spend by team, by workload, by region — but the accountability loop never closes. The engineering team sees the cost report two weeks after the billing cycle. By then, the decision to over-provision happened a month ago and has been repeated three times since. Reporting is necessary but not sufficient. The gap is between visibility and action.",
      "Closing that gap requires three capabilities working in sequence. First, real-time observability at the application and infrastructure layer — which is what IBM Instana provides. Instana's auto-discovery maps every service, container, and host continuously, with 1-second metric granularity. Engineers can see exactly which services are consuming which resources at the workload level, not the account level. That granularity is what makes optimization decisions defensible rather than speculative.",
      "Second, workload optimization at the infrastructure layer — which is what IBM Turbonomic handles. Turbonomic ingests Instana's telemetry alongside cloud provider pricing data and generates specific right-sizing and placement recommendations: resize this VM, move this workload to spot capacity during off-peak hours, consolidate these underutilized containers. Critically, Turbonomic can execute those changes automatically within defined policy guardrails — it is not a recommendation engine that requires a human to open a change ticket for every action.",
      "Third, cost accountability at the business unit level — which is where IBM Apptio's Technology Business Management layer operates. Apptio takes the infrastructure-level spend data and allocates it to business services, cost centers, and projects according to a financial model the IT finance team controls. The output is not a cloud bill — it is a business-level cost statement that a CIO can bring to a budget review. When all three tools are connected, the loop closes: Instana shows what is running, Turbonomic optimizes how it runs, and Apptio shows who is paying for it. FinOps becomes a continuous operational process rather than a quarterly reconciliation.",
    ],
    draft: false,
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
    body: [
      "The standard objection to AI automation in enterprise environments is the integration objection: our ERP is SAP, our HRIS is Workday, our service desk is ServiceNow, and connecting a new AI layer to all of them is a multi-year integration project with its own governance cycle. That objection was valid for most AI tooling three years ago. It is substantially less valid for watsonx Orchestrate today, and understanding why requires a clear picture of what the product's connector architecture actually does.",
      "watsonx Orchestrate ships with over 80 pre-built connectors to enterprise applications — SAP, Salesforce, Workday, ServiceNow, Microsoft 365, and others. These are not thin HTTP wrappers; they are OpenAPI-spec skill definitions that the orchestration engine can invoke as actions in a multi-step agent workflow. When a manager asks the Orchestrate agent to process a promotion for a direct report, the agent can pull the employee record from Workday, check the compensation band in SAP, create the approval workflow in ServiceNow, and send a confirmation in Slack — as a single coordinated action, not four separate tool calls the user has to initiate manually.",
      "The agentic control plane — the layer that decides which skills to invoke in which order — runs on IBM's foundation models and can be configured with policy constraints that define what the agent is and is not permitted to do without human approval. An agent that books travel can do so within a defined cost threshold automatically; anything above that threshold pauses and routes to a manager. Those guardrails are configuration, not custom code.",
      "Where TechD's implementation work begins is past the point where the out-of-box demo ends. IBM's connector library covers the standard API surface of each application, but enterprise ERP deployments are rarely running stock configurations. Custom fields, bespoke approval chains, and modified workflows mean that the connector mapping from watsonx Orchestrate to your SAP instance will differ from the reference configuration. TechD maps the actual configuration of your environment to the skill definitions the agent needs, tests edge cases in the approval chains, and builds the governance guardrails specific to your IT and compliance policies. That scoping is what determines whether the deployment is running in production in eight weeks or eight months.",
    ],
    draft: false,
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
    body: [
      "IBM Planning Analytics 2.1.x is the current production release, and the 2025–2026 update cycle added changes that are operationally meaningful for FP&A teams — not just platform updates that matter to system administrators. The IDC MarketScape named IBM a Leader in the 2025 Financial Performance Management category, specifically citing Planning Analytics' strength in complex, multi-dimensional modeling at enterprise scale. That recognition matters because it reflects customer deployments, not feature checklists.",
      "The most significant change for teams running on-premises deployments is the addition of Planning Analytics as a Service — a SaaS deployment option that IBM manages at the infrastructure level. For organizations whose IT teams have historically owned the TM1 server stack, SaaS removes the patching, backup, and scaling management overhead from the internal team. The TM1 engine underneath is the same; what changes is who keeps it running. This is not the right choice for every organization — some regulated environments have data residency requirements that make managed cloud hosting complicated — but it is now a viable option for many mid-size enterprises that have been running PA on hardware they own.",
      "At the model level, v2.1.x improved write-back performance for large consolidated models and added enhancements to the Workspace interface for scenario planning — specifically, the ability to manage multiple scenario versions within a single plan without duplicating the underlying TM1 model structure. For FP&A teams running rolling forecasts alongside the annual budget cycle, that separation of scenario state is a meaningful workflow improvement.",
      "Planning Analytics also deepened its integration with IBM Cognos Analytics 12 in this release cycle. Reports and dashboards built in Cognos can now pull directly from Planning Analytics cubes using a live connection that updates as the model data changes — not a snapshot export. If you are running both products and are still using a file-based data exchange between them, the upgrade path to this live connection mode is worth prioritizing in your next PA maintenance window.",
    ],
    draft: false,
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
    body: [
      "The data science talent market is competitive enough that most mid-size enterprises in healthcare and insurance have already accepted the premise that they will not be building a full ML engineering function any time soon. The question that analytics leads in those organizations are actually dealing with is more specific: we have structured data, we have a business question we want to answer predictively, and we need to get from data to a working model without hiring three people who do not exist in our labor market. IBM SPSS Modeler v18.x addresses that constraint directly.",
      "SPSS Modeler's AutoML capability — AutoClassifier and AutoNumeric, depending on whether the target variable is categorical or continuous — runs a battery of candidate algorithms against your data, tunes hyperparameters for each, and ranks the results by a configurable accuracy metric. The process does not require writing code. An analytics lead with domain expertise and comfort with structured data can run a feature selection analysis, configure the node parameters through the visual interface, and produce a scored output file. The tool is not a replacement for a data scientist on a complex problem; it is a practical path to predictive output for the class of business problems that structured data and classical ML techniques handle well.",
      "In healthcare, the most common use cases we see are patient no-show prediction (scheduling optimization), readmission risk scoring (care management triage), and claims anomaly detection (pre-authorization screening). In insurance, they are claims severity prediction, fraud scoring, and customer churn modeling. None of these require deep learning — they require good feature engineering and a disciplined model evaluation process, both of which SPSS Modeler supports without requiring Python or R expertise.",
      "The deployment path from SPSS Modeler into production has also improved in v18.x. Models can be exported to PMML for scoring in downstream systems, or deployed directly as a REST endpoint when the environment is connected to IBM Watson Machine Learning. For organizations already running Cognos Analytics or Planning Analytics, SPSS model scores can be fed into existing reports and dashboards without building a separate data pipeline. That integration is the practical reason to stay in the IBM stack for this use case rather than evaluating standalone AutoML tools.",
    ],
    draft: false,
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
