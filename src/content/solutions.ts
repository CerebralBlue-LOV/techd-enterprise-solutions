export type ProductLink =
  | { kind: "internal"; slug: string }
  | { kind: "external"; url: string };

export type StatCallout = { value: string; label: string };

export type ProductDetail = {
  overview: string[];
  capabilities: string[];
  useCases?: string[];
  whyTechD?: string[];
  stats?: StatCallout[];
};

export type Product = {
  name: string;
  tagline: string;
  description: string;
  link: ProductLink;
  /** Optional URL to the vendor's official product page (e.g. ibm.com). */
  vendorUrl?: string;
  detail?: ProductDetail;
};

export type Solution = {
  id: string;
  name: string;
  outcome: string;
  description: string;
  /** 3 short capability phrases (kept for future use; not on home grid). */
  highlights: [string, string, string];
  /** Short pitch paragraph shown on the back of the card after flip. */
  pitch: string;
  /** Short verb phrase used as the card CTA, e.g. "Explore AI practice". */
  ctaLabel: string;
  products: Product[];
  /** Non-IBM tools built by Cerebral Blue that TechD also delivers in this practice. */
  ownTools?: Product[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "ai-generative",
    name: "AI & Generative Solutions",
    outcome: "Ship trustworthy gen AI on top of governed enterprise data.",
    description:
      "Production RAG, agentic workflows, and conversational interfaces built on IBM watsonx — grounded in your data, governed from day one.",
    highlights: [
      "Grounded RAG on your data",
      "Foundation model governance",
      "Agentic workflows in production",
    ],
    pitch:
      "Production-ready generative AI grounded in your enterprise data — built on watsonx with the governance, observability, and lineage your auditors expect.",
    ctaLabel: "Explore AI practice",
    products: [
      {
        name: "NeuralSeek",
        tagline: "Automated RAG — cited, governed AI answers from your existing knowledge base, with no vector pipeline assembly required.",
        description:
          "NeuralSeek is an Answers-as-a-Service platform that automates retrieval-augmented generation across 40+ LLMs, connecting to your knowledge repositories and returning cited, fact-checkable answers through virtual agents or a direct API.",
        link: { kind: "internal", slug: "neuralseek" },
        vendorUrl: "https://neuralseek.com",
        detail: {
          overview: [
            "NeuralSeek is an AI-powered Answers-as-a-Service platform that automates retrieval-augmented generation (RAG) from your existing knowledge bases — Watson Discovery, Elastic, and custom repositories — surfacing cited, fact-checkable answers through virtual agents or a REST API. Its modular architecture spans Seek (knowledge retrieval), Curate (answer QA and curation), mAIstro (no-code multi-agent LLM orchestration canvas), Extract (entity extraction from documents), and Governance (compliance monitoring with PII detection and semantic analytics). All 40+ supported LLMs — IBM Granite, Anthropic Claude, Llama, and OpenAI — are switchable from a single configuration surface.",
            "TechD deploys NeuralSeek as the AI answer layer for customer-facing virtual agents, internal employee assistants, and field-service applications. Our engagements cover knowledge corpus setup and maintenance, Watson Assistant and custom API integration, governance policy configuration, multilingual tuning, and the iterative answer-quality work that gets NeuralSeek to production standards. For regulated workloads, NeuralSeek deploys on-premises in isolated environments certified for HIPAA, FedRAMP, and GovCloud.",
          ],
          capabilities: [
            "Automated RAG against 40+ LLMs — IBM Granite, Anthropic Claude, Llama, and OpenAI switchable via a single configuration surface",
            "Cited, fact-checkable responses with clickable paths back to the underlying source passages",
            "mAIstro — no-code multi-agent visual orchestration canvas for chaining LLMs, agents, and knowledge sources without writing code",
            "Native virtual agent integration — connectors for Watson Assistant and AWS Lex with auto-generated actions and Q&A indexing",
            "Governance module — PII detection, compliance monitoring, semantic analytics, and round-trip session logging for audit trails",
            "Multilingual support — automatic language detection and translation across any language supported by the configured LLM",
            "Flexible deployment — SaaS on IBM Cloud, AWS Marketplace, and Azure; isolated on-premises for HIPAA, FedRAMP, and GovCloud environments",
          ],
          useCases: [
            "Customer-facing virtual agents grounded in product catalog, documentation, and support knowledge base content",
            "Employee self-service assistants covering HR policy, IT procedures, and internal compliance documentation",
            "Contact-center agent assist surfacing verified, cited answers from regulated knowledge repositories in real time",
            "Field-service and mobile worker assistants delivering governed answers from technical manuals and operational knowledge bases",
          ],
          whyTechD: [
            "Certified NeuralSeek partner — we've deployed NeuralSeek from corpus setup to production for regulated healthcare, financial services, and public sector organizations where cited, governed answers aren't optional.",
            "Governance before go-live — every engagement includes PII policy configuration, compliance monitoring, and full audit logging before the first user reaches the system.",
            "Full virtual agent integration — we design the Watson Assistant or custom channel layer that NeuralSeek answers flow through, not just the RAG pipeline in isolation.",
            "On-premises HIPAA and FedRAMP deployments — when IBM Cloud SaaS isn't an option, we've navigated isolated NeuralSeek environments for organizations with strict data residency requirements.",
          ],
          stats: [
            { value: "40+", label: "LLMs supported" },
            { value: "Platinum", label: "IBM Business Partner" },
          ],
        },
      },
      {
        name: "watsonx.ai",
        tagline: "Build, fine-tune, and deploy AI on foundation models you can govern — from prototype to production.",
        description:
          "IBM's enterprise AI studio for the full model lifecycle — IBM Granite 4.1, Anthropic Claude, Llama, and Mistral through a single governed interface — with AgentOps for AI agent lifecycle management and MLOps for production deployment.",
        link: { kind: "internal", slug: "watsonx-ai" },
        vendorUrl: "https://www.ibm.com/products/watsonx-ai",
        detail: {
          overview: [
            "watsonx.ai is IBM's enterprise AI studio for the full model lifecycle — from model selection and fine-tuning through production deployment, agent management, and governance. It provides curated access to IBM Granite 4.1 models (with 128K-token context windows, purpose-built for enterprise RAG and multi-step reasoning), open-source models (Llama, Mistral), and frontier models including Anthropic Claude through the Model Gateway — all governed through a single interface. IBM is a Gartner Magic Quadrant Leader for Data Science and Machine Learning, AI Application Development Platforms, and five additional AI-related categories in 2025 and 2026.",
            "TechD architects watsonx.ai environments for regulated enterprises that need AI outputs they can explain to an auditor. Our engagements cover data ingestion pipeline design, vector store architecture, RAG pipeline construction, prompt engineering, and AgentOps lifecycle management for production AI agents — so your data science team focuses on model quality rather than infrastructure. Every deployment includes lineage tracking, drift detection, and the audit trails that satisfy HIPAA, FedRAMP, and SOX requirements.",
          ],
          capabilities: [
            "IBM Granite 4.1 foundation models with 128K-token context windows — built for enterprise RAG, reasoning, and long-document tasks",
            "Model Gateway — governed, unified access to Anthropic Claude, Llama, Mistral, and OpenAI models alongside Granite; no vendor lock-in",
            "AgentOps — full lifecycle management for AI agents: build, test, deploy, monitor, and govern agents in production",
            "Prompt Lab for rapid prototyping, systematic evaluation, and versioned prompt management",
            "Fine-tuning and domain adaptation on proprietary data, including synthetic data generation for low-resource use cases",
            "MLOps pipelines with versioning, A/B testing, and automated retraining triggers",
            "Model governance — explainability, drift detection, fact sheets, and full audit logs integrated with watsonx.governance",
          ],
          useCases: [
            "Healthcare clinical document summarization and decision support with HIPAA-compliant lineage and audit trails",
            "Financial services regulatory document analysis, extraction, and automated compliance reporting",
            "Enterprise RAG deployment grounded in proprietary knowledge — Granite or Claude models, governed from day one",
            "AI agent development and production lifecycle management using AgentOps across complex multi-agent architectures",
          ],
          whyTechD: [
            "IBM Platinum Business Partner — the highest tier in the IBM ecosystem, with certified architects across the full watsonx stack and direct access to IBM's technical roadmap.",
            "We build for operability, not demo readiness — every engagement delivers the MLOps pipelines, governance controls, and operational runbooks your team can own without us in the room.",
            "Regulated industry specialization — HIPAA, FedRAMP, PCI-DSS, and SOX-aligned deployments with the lineage, audit trails, and access controls that survive a real examination.",
            "15+ years of IBM platform delivery means our architects know what IBM's documentation doesn't say — the edge cases, upgrade paths, and production patterns that actually matter.",
          ],
          stats: [
            { value: "128K", label: "Granite 4.1 context window (tokens)" },
            { value: "7", label: "Gartner Magic Quadrant Leader categories" },
          ],
        },
      },
      {
        name: "watsonx",
        tagline: "The unified enterprise AI platform — models, governed data, responsible AI, and agentic orchestration under one control plane.",
        description:
          "IBM watsonx integrates watsonx.ai (model development and AgentOps), watsonx.data (open lakehouse), and watsonx.governance (responsible AI lifecycle and agentic monitoring) into a single platform with $12.5B in enterprise AI business behind it.",
        link: { kind: "internal", slug: "watsonx" },
        vendorUrl: "https://www.ibm.com/products/watsonx",
        detail: {
          overview: [
            "watsonx is IBM's flagship enterprise AI platform — three integrated pillars under a single control plane: watsonx.ai for model development and AI agent lifecycle management (AgentOps), watsonx.data for governed open lakehouse storage, and watsonx.governance for responsible AI lifecycle management including compliance automation and real-time agentic AI monitoring. In 2025, IBM deepened the platform with a strategic Anthropic partnership bringing Claude models into watsonx and Orchestrate, and extended it with the Infragraph agentic control plane for hybrid infrastructure environments. watsonx has generated $12.5B in enterprise AI business for IBM, and is FedRAMP-authorized for federal workloads.",
            "TechD architects watsonx environments end-to-end: landing zone and OpenShift cluster design, identity and access integration, foundation model selection across IBM Granite 4.1 and Anthropic Claude, and the connective tissue between watsonx.data, your existing Db2 estate, and the downstream applications that consume AI outputs. Our engagements deliver a platform your team can extend long after we leave — with the governance controls that survive an audit, and the agentic capabilities that scale from single-agent pilots to enterprise-wide multi-agent deployments.",
          ],
          capabilities: [
            "Three integrated pillars — watsonx.ai (model studio and AgentOps), watsonx.data (open lakehouse), watsonx.governance (responsible AI lifecycle)",
            "Agent Monitoring and Insights — real-time tracking of agent decisions, behaviors, and performance with threshold-triggered alerts for production agents",
            "watsonx.governance Risk Atlas — cataloged agentic AI risks with built-in compliance automation for regulated industries",
            "Model Gateway — unified governed access to IBM Granite 4.1, Anthropic Claude, Llama, and third-party models through a single interface",
            "FedRAMP-authorized deployment for federal agencies; IBM Sovereign Core for air-gapped and government-sovereign workloads",
            "Hybrid deployment — IBM Cloud, on-premises via Cloud Pak for Data, AWS, Azure, and GCP with a consistent operating model",
            "Integration with watsonx Orchestrate for agentic workflow execution across 80+ enterprise applications",
          ],
          useCases: [
            "Enterprise AI platform standardization — single governed control plane across all AI workloads, teams, and business units",
            "Regulated industry AI adoption — HIPAA, FedRAMP, PCI-DSS, and GDPR-compliant deployments with full audit trails",
            "Federal AI programs — FedRAMP-authorized and IBM Sovereign Core options for classified and sovereign-boundary requirements",
            "Scaled agentic AI — from single-agent pilots to production multi-agent deployments with governance, observability, and policy enforcement",
          ],
          whyTechD: [
            "IBM Platinum Business Partner — access to IBM's technical roadmap, early feature programs, and escalation paths unavailable at lower partnership tiers.",
            "End-to-end platform ownership — TechD architects every layer from OpenShift cluster design through the BI and AI applications that consume the platform, with no handoff gaps.",
            "Regulated industry deployments from day one — HIPAA, FedRAMP, PCI-DSS, and NERC-CIP across healthcare, federal, financial services, and energy clients.",
            "15+ years of IBM platform delivery means we've navigated the watsonx upgrade paths, the agentic governance edge cases, and the operational patterns that keep the platform running through budget cycles and organizational changes.",
          ],
          stats: [
            { value: "$12.5B", label: "IBM enterprise genAI business on watsonx" },
            { value: "Platinum", label: "IBM Business Partner" },
          ],
        },
      },
      {
        name: "watsonx Orchestrate",
        tagline: "The agentic control plane for enterprise AI — build, deploy, and govern AI agents across 80+ business applications.",
        description:
          "IBM watsonx Orchestrate coordinates AI agents built on IBM Granite and third-party models across 80+ enterprise applications — Salesforce, Workday, SAP, Oracle, Coupa, and more — with a no-code Agent Builder, a pro-code ADK, and AgentOps observability across every deployed agent.",
        link: { kind: "internal", slug: "watsonx-orchestrate" },
        vendorUrl: "https://www.ibm.com/products/watsonx-orchestrate",
        detail: {
          overview: [
            "watsonx Orchestrate is IBM's agentic control plane for the multi-agent era — a platform that coordinates AI agents across 80+ enterprise applications including Salesforce, Workday, ServiceNow, SAP, Oracle, Coupa, Microsoft 365, and IBM Sterling. It supports agents built with IBM's no-code Agent Builder (working agents deployable in under five minutes), the pro-code Agent Development Kit (ADK, compatible with LangChain and CrewAI), Langflow's drag-and-drop visual builder, and open A2A-protocol agents — all managed from a single governance surface. Pre-built domain agents for HR, Sales, Finance, Procurement, and Supply Chain dramatically reduce time-to-value for the most common enterprise automation patterns.",
            "TechD implements Orchestrate for organizations moving from AI pilots to scaled, governed agentic deployment. Our engagements cover domain agent selection and configuration, integration with your identity and audit infrastructure, custom skill development against internal APIs, and the human-in-the-loop governance controls that keep autonomous agent actions defensible. The AgentOps observability layer — real-time monitoring of agent decisions, behaviors, and policy compliance — ensures production-grade accountability from day one.",
          ],
          capabilities: [
            "Agentic control plane — manage IBM native, Langflow, LangGraph, and A2A-protocol agents from a single governance and observability surface",
            "80+ enterprise application integrations — Salesforce, Workday, ServiceNow, SAP, Oracle, Microsoft 365, Coupa, IBM Sterling, and more",
            "No-code Agent Builder — business users can configure and deploy working agents in under five minutes",
            "Pro-code Agent Development Kit (ADK) — compatible with LangChain, CrewAI, and custom REST APIs for developers who need full control",
            "Pre-built domain agents for HR, Sales, Finance, Procurement, and Supply Chain — pre-integrated with Workday, Salesforce, SAP, Oracle, and Coupa",
            "AgentOps observability — real-time monitoring of every agent decision, system call, and outcome across all deployed agents with policy-based controls",
            "Human-in-the-loop approval gates — role-based controls that require human sign-off before high-risk agent actions execute",
          ],
          useCases: [
            "HR self-service automation — onboarding, leave management, and benefits queries handled by pre-built agents across Workday and ServiceNow",
            "Sales operations — quote generation, opportunity hygiene, and CRM data quality managed by Salesforce-integrated agents",
            "Finance planning and forecasting — scenario analysis, reporting, and variance workflows automated across ERP sources",
            "Supply chain disruption response — automated analysis and action routing via IBM Sterling, SAP, Oracle, and Coupa integrations",
          ],
          whyTechD: [
            "IBM Platinum Business Partner with certified Orchestrate architects who have deployed agentic workflows in production for Fortune 500 clients — we've seen what breaks in real environments.",
            "Governance-first deployment — every agent rollout includes human-in-the-loop controls, audit logs, and policy enforcement that regulated industries require before autonomous actions go live.",
            "Full-stack integration delivery — we connect Orchestrate agents to your existing Salesforce, Workday, SAP, and custom API landscape, not just the pre-built connector catalog.",
            "Practical scoping — we identify the highest-value agentic use cases for your organization, sequence for quick wins, and build the governance foundation that scales to enterprise-wide deployment.",
          ],
          stats: [
            { value: "80+", label: "enterprise app integrations" },
            { value: "5 min", label: "time to first working agent (no-code)" },
          ],
        },
      },
      {
        name: "IBM Bob",
        tagline: "IBM's AI-first development partner — agentic workflows across the full SDLC, from code generation to production-ready delivery.",
        description:
          "IBM Bob (generally available April 2026) is a full VS Code fork with multi-model agentic orchestration — IBM Granite, Anthropic Claude, Mistral, and specialized fine-tuned models — covering coding, code review, legacy modernization, security analysis, and CI/CD with enterprise governance built in.",
        link: { kind: "internal", slug: "ibm-bob" },
        vendorUrl: "https://www.ibm.com/products/ai-coding-agent",
        detail: {
          overview: [
            "IBM Bob is IBM's AI-first development partner — a full fork of Visual Studio Code that coordinates specialized AI agents across the complete software development lifecycle. Bob dynamically routes tasks to the right model based on accuracy, performance, and cost — drawing on IBM Granite, Anthropic Claude, Mistral open-source models, and specialized fine-tuned models for code reasoning, security analysis, and next-edit prediction. Bob understands full repository and architecture context, assisting with coding, review, testing, deployment, and legacy modernization across RPG, COBOL, PL/I, Java, Kotlin, Python, and modern web frameworks. 80,000+ IBM employees use Bob, reporting 45% average productivity gains; Blue Pearl completed a typical 30-day Java upgrade in 3 days, saving over 160 engineering hours.",
            "TechD deploys IBM Bob for enterprises with legacy IBM i, mainframe, or Java codebases that need modernization without disrupting running systems. Our engagements cover Bob environment setup and team onboarding, repository context and codebase documentation preparation, modernization roadmap definition, and governance policy configuration — prompt normalization, sensitive data scanning, and real-time compliance enforcement. Bob's BobShell CLI creates self-documenting agentic processes so every action is traceable. Bob also integrates with IBM Instana, Red Hat OpenShift, and HashiCorp tooling, making it a natural extension of TechD observability and automation engagements.",
          ],
          capabilities: [
            "Full VS Code fork — AI-first IDE with Bob embedded at every context (file, repo, terminal) with agentic workflows coordinating specialized agents across roles and lifecycle stages",
            "Multi-model orchestration — dynamically routes tasks to IBM Granite, Anthropic Claude, Mistral, or specialized fine-tuned models based on accuracy, performance, and cost",
            "Language support: RPG, CL, SQL, COBOL, PL/I, Java, Kotlin, Python, C#, and modern web frameworks (React, Angular)",
            "Legacy modernization: automated analysis, documentation, and migration from Java 8→17+, COBOL/PL/I, .NET, and Struts/JSF to modern stacks",
            "BobShell CLI — self-documenting agentic processes for CI/CD pipeline authoring, recipe-driven upgrades, and production environment automation with full auditability",
            "Enterprise security controls — prompt normalization, sensitive data scanning, real-time policy enforcement, and AI red-teaming built into every workflow",
            "Human-in-the-loop approval model — configurable checkpoints from manual approvals to auto-approve by task type, keeping the right people in control",
          ],
          useCases: [
            "IBM i and mainframe legacy modernization — RPG, COBOL, and PL/I codebase documentation, refactoring, and migration to modern architectures",
            "Java application modernization — automated Java 8→17+ upgrades and framework migrations; Blue Pearl case: 30 days → 3 days, 160+ engineering hours saved",
            "Enterprise developer productivity — AI-assisted code generation, review, and debugging across complex multi-service architectures with 45% reported productivity gains",
            "Secure application development — shift-left vulnerability scanning, compliance enforcement (HIPAA, FedRAMP), and quantum-safe cryptographic migration",
          ],
          whyTechD: [
            "TechD has deployed Bob alongside our IBM i, mainframe, and Java modernization engagements — we understand the legacy codebases Bob is purpose-built to modernize.",
            "Governance-first Bob deployment — we configure prompt normalization, sensitive data scanning, and approval workflows before developers touch the tool, not as an afterthought.",
            "CI/CD and observability integration — we wire BobShell into your existing pipelines and connect it to your IBM Instana and OpenShift environments so every modernization action is auditable end to end.",
            "IBM Platinum partnership gives us early access to Bob's roadmap and direct IBM escalation for complex modernization scenarios that generic implementation partners can't support.",
          ],
          stats: [
            { value: "45%", label: "average developer productivity gain" },
            { value: "80K+", label: "IBM employees using Bob" },
          ],
        },
      },
      {
        name: "IBM SPSS Modeler",
        tagline: "Visual predictive analytics and AutoML — production ML models without a code-first data science team.",
        description:
          "IBM SPSS Modeler is a visual data science and machine learning platform covering decision trees, neural networks, time series, text analytics, entity analytics, and AutoML — with in-database scoring, R/Python integration, and deployment via Cloud Pak for Data.",
        link: { kind: "internal", slug: "ibm-spss-modeler" },
        vendorUrl: "https://www.ibm.com/products/spss-modeler",
        detail: {
          overview: [
            "IBM SPSS Modeler is IBM's visual data science and machine learning platform for the complete predictive analytics lifecycle — from data preparation and feature engineering through model building, evaluation, and production deployment. Its drag-and-drop node-based canvas spans decision trees, clustering, neural networks, regression, SVM, time series, text analytics, entity analytics, and decision optimization, with AutoML for automated model selection and hyperparameter tuning. Business analysts work without writing code; data scientists extend the same canvas with R, Python, Spark, and Hadoop nodes for custom algorithm integration.",
            "TechD uses SPSS Modeler for clients who need production-grade predictive models without a dedicated ML engineering team. Our engagements cover data source connection and preparation, node-based model development and evaluation, AutoML baseline comparison, and deployment as REST-accessible scoring services via Cloud Pak for Data. Delivered models include healthcare readmission prediction, insurance claims propensity scoring, workforce attrition forecasting, and audience analytics — with in-database scoring push-down to Db2 and Netezza that eliminates data movement overhead at inference time.",
          ],
          capabilities: [
            "Visual drag-and-drop ML canvas — decision trees, neural networks, regression, clustering, SVM, time series, and association algorithms with no coding required",
            "AutoML — automated model selection and hyperparameter tuning across algorithm families for fast, defensible baseline comparison",
            "Text analytics and entity analytics — unstructured content modeling, entity extraction, and sentiment analysis without a separate NLP pipeline",
            "In-database scoring push-down for Db2, Netezza, and cloud data warehouses — models score against data in place, with no data movement",
            "R, Python, Spark, and Hadoop extension nodes — custom algorithm integration and big data execution from within the visual workflow",
            "Decision management and optimization — prescriptive analytics for next-best-action and constrained resource allocation problems",
            "SPSS Modeler as a Service on Cloud Pak for Data — zero infrastructure footprint, deploy and score via REST API from day one",
          ],
          useCases: [
            "Healthcare readmission and chronic disease risk prediction on clinical and claims data — models your analysts can own and retrain",
            "Insurance claims propensity scoring and fraud detection model deployment into production scoring pipelines",
            "Workforce attrition and HR analytics modeling — flight-risk scoring for talent management and retention programs",
            "Customer churn and lifetime value modeling for media, financial services, and higher education organizations",
          ],
          whyTechD: [
            "15+ years of SPSS Modeler delivery for healthcare, insurance, higher education, and media clients — we know the algorithm choices, data preparation patterns, and deployment workflows that matter in production.",
            "IBM Platinum Business Partner with certified SPSS and Cloud Pak for Data architects who have navigated every version from legacy on-premises SPSS through the current Cloud Pak-hosted service.",
            "We build models your analysts can own — visual workflows, documented nodes, and knowledge transfer sessions so the model isn't a black box at handoff.",
            "Production deployment depth: REST scoring services via Cloud Pak for Data, in-database push-down scoring against Db2 and Netezza, and Cognos Analytics integration for dashboarding — not just model building.",
          ],
          stats: [
            { value: "15+", label: "years TechD SPSS delivery" },
            { value: "Platinum", label: "IBM Business Partner" },
          ],
        },
      },
    ],
  },

  {
    id: "data-analytics",
    name: "Data & Analytics",
    outcome: "Make your data AI-ready, governed, and defensible.",
    description:
      "Fifteen years of Db2, Cognos, and TM1 in production — extended with watsonx.data, Cloud Pak for Data, DataStage, and the modern analytics stack your AI depends on.",
    highlights: [
      "Open lakehouse architecture",
      "Cataloged, lineage-traced data",
      "Modern BI and planning",
    ],
    pitch:
      "Open lakehouse, governed pipelines, and a decade-plus of Db2, Cognos, and TM1 in production — the data foundation your AI roadmap stands on.",
    ctaLabel: "Explore data practice",
    products: [
      {
        name: "IBM Db2",
        tagline: "The enterprise-grade relational database that keeps Fortune 500 systems running.",
        description:
          "IBM Db2 is the production relational database at the core of TechD's data platform engagements — on-premises, containerized, or on cloud — with built-in AI extensions and hybrid query capabilities.",
        link: { kind: "internal", slug: "ibm-db2" },
        vendorUrl: "https://www.ibm.com/products/db2",
        detail: {
          overview: [
            "IBM Db2 is a high-performance relational database system used across TechD's enterprise client base for transactional workloads, analytics, and hybrid data architectures. Db2 Warehouse extends the engine with columnar BLU Acceleration and in-database ML for analytical workloads without a separate data warehouse infrastructure.",
            "TechD has deployed, optimized, and migrated Db2 environments for healthcare systems, media companies, and energy utilities. Our engagements range from schema design and query optimization to containerized Db2 deployments on OpenShift and full migrations from legacy platforms.",
          ],
          capabilities: [
            "On-premises, cloud, and containerized deployment via OpenShift",
            "BLU Acceleration for columnar in-memory analytics",
            "Db2 Warehouse with in-database Apache Spark and ML",
            "High availability — HADR, PureScale clustering",
            "Hybrid query federation across heterogeneous sources",
            "REST API and JDBC/ODBC connectivity for application integration",
            "Automated backup, recovery, and storage optimization",
          ],
          useCases: [
            "Core ERP and clinical system transaction databases",
            "Operational data stores feeding Cognos and Planning Analytics",
            "Hybrid lakehouse foundation alongside watsonx.data",
            "Legacy Oracle or SQL Server migrations to IBM stack",
          ],
        },
      },
      {
        name: "watsonx.data",
        tagline: "The open lakehouse platform that connects your data to your AI.",
        description:
          "watsonx.data delivers open lakehouse architecture — Parquet/Iceberg on object storage, Presto/Spark query engines, and unified governance — for analytics and AI workloads on any infrastructure.",
        link: { kind: "internal", slug: "watsonx-data" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data",
        detail: {
          overview: [
            "watsonx.data is IBM's open lakehouse platform, providing a cost-efficient alternative to proprietary data warehouses by running multiple query engines (Presto, Spark, Db2) against a shared open-format data store. It is the governed data layer that watsonx.ai trains on and that BI tools query directly.",
            "TechD architects have worked with the Cloud Pak for Data and watsonx.data lineage since the earliest releases. Our engagements help clients consolidate fragmented analytics infrastructure onto a single governed platform — reducing data copy sprawl and preparing data assets for AI consumption.",
          ],
          capabilities: [
            "Open lakehouse on object storage (Apache Iceberg, Parquet, ORC)",
            "Multi-engine query: Presto, Spark, Db2, Netezza integration",
            "Data sharing across watsonx.ai, DataStage, and Cognos Analytics",
            "Built-in data governance integration",
            "On-premises, IBM Cloud, AWS, or Azure deployment",
            "Cost optimization — tiered storage with hot/warm/cold data routing",
            "Zero-ETL access to live operational Db2 and streaming sources",
          ],
          useCases: [
            "Replacing legacy Hadoop / Cloudera environments with open lakehouse",
            "Unified analytics platform consolidating multiple BI data sources",
            "AI training dataset management with lineage and governance",
            "Cross-cloud data federation for M&A integration scenarios",
          ],
        },
      },
      {
        name: "Cloud Pak for Data",
        tagline: "The unified data and AI platform — deployed where your data already lives.",
        description:
          "IBM Cloud Pak for Data is the integrated platform that hosts watsonx.ai, watsonx.data, DataStage, and IBM's data and AI services on a single OpenShift-based runtime — on-premises, on IBM Cloud, or on any hyperscaler.",
        link: { kind: "internal", slug: "cloud-pak-for-data" },
        vendorUrl: "https://www.ibm.com/products/cloud-pak-for-data",
        detail: {
          overview: [
            "IBM Cloud Pak for Data is IBM's containerized platform for delivering data and AI services together. It packages watsonx.ai, watsonx.data, DataStage, IBM Match 360, and dozens of other services as Kubernetes operators on Red Hat OpenShift — giving enterprises a single deployable platform they can install on-premises, on IBM Cloud, or on AWS, Azure, and GCP.",
            "TechD has implemented Cloud Pak for Data since its earliest releases. Our engagements cover OpenShift sizing and cluster build, service catalog selection, identity and storage integration, and the operational model that lets your platform team run a multi-tenant data and AI environment without an army of specialists.",
          ],
          capabilities: [
            "Unified runtime for watsonx.ai, watsonx.data, DataStage, and 60+ IBM services",
            "Runs on Red Hat OpenShift — on-premises, IBM Cloud, AWS, Azure, GCP",
            "Multi-tenant project workspaces with role-based access",
            "Integrated data virtualization across heterogeneous sources",
            "Built-in governance, lineage, and policy enforcement",
            "Air-gapped installation option for regulated and classified workloads",
            "Operator-based lifecycle management — install, upgrade, scale via Kubernetes",
          ],
          useCases: [
            "Enterprise data and AI platform consolidation",
            "On-premises watsonx deployment for data sovereignty requirements",
            "Multi-cloud AI platform with consistent operating model",
            "Regulated industry data science environment with audit controls",
          ],
        },
      },
      {
        name: "Cognos Analytics",
        tagline: "Self-service BI and dashboarding for the enterprise — backed by 15 years of TechD delivery.",
        description:
          "IBM Cognos Analytics is TechD's flagship BI platform — AI-assisted report creation, governed dashboards, and enterprise scheduling for the clients who have trusted it for over a decade.",
        link: { kind: "internal", slug: "cognos-analytics" },
        vendorUrl: "https://www.ibm.com/products/cognos-analytics",
        detail: {
          overview: [
            "IBM Cognos Analytics is an AI-powered business intelligence and dashboarding platform that lets business users create reports, explore data, and build dashboards with minimal IT involvement — while IT retains governance over data sources, security, and distribution.",
            "TechD has more Cognos Analytics delivery hours than nearly any other IBM Business Partner. Our practice spans initial deployment, content migration from legacy versions, SDK customization, performance tuning, and the TechD CogSuite administration tool built specifically to reduce Cognos administrative overhead. Clients include major health systems, media companies, insurers, and universities.",
          ],
          capabilities: [
            "AI Assistant for natural language data exploration and report generation",
            "Drag-and-drop dashboard and report authoring for business users",
            "Governed data modules with row/column-level security",
            "Pixel-perfect formatted report output (PDF, Excel, HTML)",
            "Scheduled distribution — burst reports to thousands of recipients",
            "Embedded analytics via SDK and JavaScript API",
            "Upgrade and migration services from Cognos 10.x / 11.x",
          ],
          useCases: [
            "Executive and operational dashboards for health system leadership",
            "Regulatory and financial reporting for insurance and banking",
            "Student and faculty analytics for higher education",
            "Subscriber and content performance analytics for media companies",
          ],
        },
      },
      {
        name: "Planning Analytics",
        tagline: "Enterprise planning, budgeting, and forecasting on the TM1 engine.",
        description:
          "IBM Planning Analytics (powered by TM1) is TechD's core FP&A platform — fast multi-dimensional modeling for budgeting, forecasting, and scenario analysis in finance teams that outgrew spreadsheets.",
        link: { kind: "internal", slug: "planning-analytics" },
        vendorUrl: "https://www.ibm.com/products/planning-analytics",
        detail: {
          overview: [
            "IBM Planning Analytics is the enterprise performance management platform built on the TM1 in-memory OLAP engine. It powers budgeting, forecasting, financial close, and workforce planning for complex organizations — with a combination of spreadsheet-familiar interfaces (TM1 Web, Planning Analytics for Excel) and browser-based workspace.",
            "TechD has delivered Planning Analytics and TM1 implementations for over 15 years across healthcare, insurance, energy, and media clients. Our engagements span greenfield builds, legacy Hyperion and Anaplan migrations, model optimization, and the ongoing administration support that keeps planning processes running through budget cycles.",
          ],
          capabilities: [
            "In-memory TM1 OLAP engine for sub-second multi-dimensional calculations",
            "Driver-based financial modeling — P&L, balance sheet, cash flow",
            "Planning Analytics Workspace — browser-based authoring and contribution",
            "Planning Analytics for Excel (PAX) for familiar spreadsheet workflows",
            "Workflow and approval routing for distributed budgeting",
            "Integration with Cognos Analytics for combined planning and BI",
            "Migration from Hyperion, SAP BPC, Anaplan to Planning Analytics",
          ],
          useCases: [
            "Annual operating plan and rolling forecast processes",
            "Workforce planning and headcount modeling",
            "Capital expenditure and project portfolio planning",
            "Regulatory reserve and claims forecasting for insurance",
          ],
        },
      },
      {
        name: "IBM DataStage",
        tagline: "Enterprise data integration that moves, transforms, and delivers at scale.",
        description:
          "IBM DataStage is TechD's primary ETL and data pipeline tool — available as SaaS on IBM Cloud and as part of Cloud Pak for Data — for building and operating the data flows AI and analytics depend on.",
        link: { kind: "internal", slug: "ibm-datastage" },
        vendorUrl: "https://www.ibm.com/products/datastage",
        detail: {
          overview: [
            "IBM DataStage is a high-throughput ETL and ELT platform used to build, orchestrate, and monitor data pipelines across on-premises, cloud, and hybrid environments. It handles structured and semi-structured data transformations at the scale enterprise clients require — millions of records per minute with parallel execution.",
            "TechD teams have built and maintained DataStage pipelines for health systems, media companies, and financial institutions. We design pipeline architecture, optimize job performance, and manage migrations from legacy ETL tools (Informatica, SSIS, ODI) to DataStage running on Cloud Pak for Data.",
          ],
          capabilities: [
            "Parallel execution engine for high-throughput batch and near-real-time pipelines",
            "Connectors for 100+ sources — Db2, Oracle, SQL Server, Salesforce, S3, HDFS",
            "ELT push-down to warehouse engines for in-database transformation",
            "DataStage as a Service (SaaS) on IBM Cloud with no infrastructure management",
            "Visual pipeline designer with parameterization and job scheduling",
            "CDC integration for streaming ingest",
            "Lineage tracking into the watsonx.data and Cloud Pak for Data governance layer",
          ],
          useCases: [
            "Nightly EDW loads for Cognos Analytics and Planning Analytics",
            "HL7/FHIR patient data pipelines for health systems",
            "Legacy ETL tool migrations (Informatica, SSIS) to Cloud Pak for Data",
            "Real-time data feeds from operational systems into lakehouse storage",
          ],
        },
      },
      {
        name: "IBM Netezza Performance Server",
        tagline: "Purpose-built MPP analytics that delivers sub-second results on petabyte-scale datasets.",
        description:
          "IBM Netezza Performance Server is IBM's high-throughput analytics appliance — massively parallel processing and FPGA-accelerated query execution for clients where BI query performance is the bottleneck, on-premises or on IBM Cloud.",
        link: { kind: "internal", slug: "ibm-netezza" },
        vendorUrl: "https://www.ibm.com/products/netezza",
        detail: {
          overview: [
            "IBM Netezza Performance Server is a purpose-built data warehouse and analytics appliance designed for extreme query performance at scale. Its massively parallel processing (MPP) architecture and FPGA-based query accelerators deliver sub-second results on datasets that would take minutes in general-purpose databases. Netezza is available as an on-premises appliance (NPS 1000) and as a managed service on IBM Cloud.",
            "TechD deploys Netezza for clients with heavy analytical query workloads — particularly in media, insurance, and healthcare — where BI platform performance is the bottleneck. Our engagements include appliance sizing and installation, schema design for MPP workloads, Cognos Analytics integration, and migrations from legacy Teradata and Sybase IQ environments.",
          ],
          capabilities: [
            "Massively parallel processing — queries distributed across hundreds of processing nodes",
            "FPGA-accelerated scan and compression for sub-second large-dataset queries",
            "In-database analytics — run Python and R models directly against the data",
            "Netezza on IBM Cloud — SaaS deployment with zero infrastructure management",
            "Native Cognos Analytics integration as a high-performance BI data source",
            "Transparent data encryption and row-level security for sensitive datasets",
            "Migration support from Teradata, Sybase IQ, and Vertica environments",
          ],
          useCases: [
            "High-frequency ad-hoc analytics for media audience and subscriber data",
            "Actuarial and claims analytics at petabyte scale for insurance",
            "Population health analytics for large health systems",
            "Legacy Teradata migration to the IBM stack with performance parity",
          ],
        },
      },
      {
        name: "watsonx.data intelligence",
        tagline: "Catalog, classify, and govern every data asset that feeds your AI.",
        description:
          "watsonx.data intelligence (the evolution of IBM's data catalog and metadata services) discovers, classifies, and governs data and AI assets across your enterprise — the metadata backbone that makes AI outputs defensible.",
        link: { kind: "internal", slug: "watsonx-data-intelligence" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data-intelligence",
        detail: {
          overview: [
            "watsonx.data intelligence is IBM's enterprise data and AI catalog — the central inventory, classification, and governance layer for the data assets that feed analytics and watsonx.ai workloads. It connects to data sources, classifies assets automatically, enforces protection policies, and exposes a searchable catalog for data engineers, scientists, and stewards.",
            "TechD implements watsonx.data intelligence as the foundation of enterprise data governance programs — particularly in regulated industries where data lineage and access control are audit requirements, not optional. Our engagements typically run alongside watsonx.data and Cloud Pak for Data deployments.",
          ],
          capabilities: [
            "Automated data discovery and classification across multi-cloud sources",
            "Business glossary with ownership, stewardship, and policy linkage",
            "Data lineage visualization — upstream sources to downstream consumers",
            "Policy enforcement: masking, encryption, access restriction",
            "AI asset cataloging — track models alongside their training datasets",
            "Integration with DataStage, Db2, and third-party sources via connectors",
            "Compliance reporting for GDPR, CCPA, HIPAA data inventories",
          ],
          useCases: [
            "Regulatory data inventory and audit preparation (HIPAA, GDPR)",
            "AI model governance and responsible AI documentation",
            "Self-service data marketplace for internal data consumers",
            "Data quality scoring and remediation workflows",
          ],
        },
      },
      {
        name: "watsonx.data integration",
        tagline: "Move, transform, and unify data across your hybrid estate — built for the watsonx era.",
        description:
          "watsonx.data integration is IBM's modern data integration service — combining ETL, ELT, replication, and streaming patterns into a single platform that feeds watsonx.data, watsonx.ai, and downstream analytics.",
        link: { kind: "internal", slug: "watsonx-data-integration" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data-integration",
        detail: {
          overview: [
            "watsonx.data integration is IBM's unified data integration platform, bringing batch ETL/ELT, change data capture, and streaming integration patterns under a single design and operations surface. It is purpose-built to move data into watsonx.data and other governed targets at the scale enterprise AI demands.",
            "TechD implements watsonx.data integration for clients consolidating fragmented integration tooling onto a single IBM-supported stack. Our engagements include source system inventory, pipeline design, performance tuning, and migrations from legacy ETL platforms — with the lineage and observability your governance program requires.",
          ],
          capabilities: [
            "Unified batch ETL/ELT, CDC, and streaming integration patterns",
            "Native targets for watsonx.data and Cloud Pak for Data",
            "Heterogeneous connectivity — Db2, Oracle, SQL Server, SAP, Salesforce, S3",
            "Visual designer plus code-based pipeline authoring",
            "End-to-end lineage into watsonx.data intelligence",
            "Hybrid deployment — IBM Cloud, on-premises, or air-gapped",
            "Operations dashboard for pipeline health, lag, and throughput",
          ],
          useCases: [
            "Consolidating legacy ETL tools onto a single modern platform",
            "Feeding watsonx.data lakehouse with governed source data",
            "Real-time data movement from operational systems to analytics targets",
            "Hybrid data integration spanning on-premises and cloud sources",
          ],
        },
      },
    ],
  },

  {
    id: "automation-finops",
    name: "Automation & FinOps",
    outcome: "Observe everything, optimize spend, and eliminate manual toil.",
    description:
      "IBM Apptio, Instana, and Turbonomic give your IT and finance teams full-stack visibility — from application traces to cloud bill line items — with AI-driven recommendations that act.",
    highlights: [
      "Full-stack APM and tracing",
      "Cloud FinOps and showback",
      "AI-driven resource actions",
    ],
    pitch:
      "Full-stack observability, AI-driven resource optimization, and Technology Business Management — so IT leaders can see everything, cut waste, and prove the value of every dollar spent.",
    ctaLabel: "Explore automation practice",
    products: [
      {
        name: "IBM Apptio",
        tagline: "Align IT spending to business value with Technology Business Management.",
        description:
          "IBM Apptio is the TBM platform for IT financial management — translating infrastructure invoices, headcount, and vendor contracts into the cost-per-service view that CIOs and CFOs need to make investment decisions.",
        link: { kind: "internal", slug: "ibm-apptio" },
        vendorUrl: "https://www.ibm.com/products/apptio",
        detail: {
          overview: [
            "IBM Apptio (acquired by IBM in 2019) is the leading Technology Business Management platform for understanding, communicating, and optimizing what IT spends and delivers. It ingests data from financial systems, CMDB, cloud billing APIs, and project tools to build a consumption-based cost model across applications, services, and business units.",
            "TechD implements Apptio for enterprises that need to move from IT as a cost center to IT as a transparent business partner. Our engagements include TBM taxonomy design, data integration from ERP and ITSM sources, chargeback/showback model configuration, and executive dashboard delivery.",
          ],
          capabilities: [
            "TBM taxonomy: map infrastructure spend to towers, services, and business units",
            "Cloud cost allocation — AWS, Azure, GCP bill ingestion and tagging",
            "Chargeback and showback reporting for internal IT consumers",
            "Benchmark against industry peers via Apptio's anonymized dataset",
            "IT budget planning and variance tracking",
            "Project portfolio investment analysis — run vs. grow vs. transform split",
            "Integration with ServiceNow, SAP, Oracle, and cloud billing APIs",
          ],
          useCases: [
            "CIO transparency programs — monthly IT cost by business unit",
            "Cloud spend governance and accountability reporting",
            "M&A IT cost integration and baseline comparison",
            "FinOps program launch and cloud financial operating model design",
          ],
        },
      },
      {
        name: "IBM Instana",
        tagline: "Full-stack observability with automated discovery and AI-powered alerting.",
        description:
          "IBM Instana delivers real-time distributed tracing, infrastructure monitoring, and incident root-cause analysis across microservices, containers, and hybrid environments — without manual instrumentation.",
        link: { kind: "internal", slug: "ibm-instana" },
        vendorUrl: "https://www.ibm.com/products/instana",
        detail: {
          overview: [
            "IBM Instana (acquired by IBM in 2020) is a full-stack observability platform designed for cloud-native and hybrid environments. It auto-discovers services, containers, and hosts; instruments applications automatically; and correlates traces, logs, and metrics into a unified topology map — refreshed every second.",
            "TechD implements Instana for organizations running complex microservice architectures where traditional monitoring tools create alert storms without actionable root cause. Our engagements cover agent deployment, SLO configuration, alerting channel setup, and integration with ITSM platforms for incident automation.",
          ],
          capabilities: [
            "Automatic service discovery and distributed tracing (no manual instrumentation)",
            "Full-stack metrics: infrastructure, containers, Kubernetes, services, databases",
            "AI-powered root cause analysis and incident correlation",
            "1-second granularity — detect spikes traditional 1-minute polling tools miss",
            "Application Perspectives — custom service grouping for team-level SLO tracking",
            "Smart alerting — anomaly detection reduces noise vs. threshold-based rules",
            "Webhooks and integrations: PagerDuty, Slack, ServiceNow, OpsGenie",
          ],
          useCases: [
            "Microservices observability for cloud-native streaming and media platforms",
            "Kubernetes cluster monitoring and pod-level performance visibility",
            "SLO dashboards for platform engineering and site reliability teams",
            "Pre- and post-deployment health validation in CI/CD pipelines",
          ],
        },
      },
      {
        name: "IBM Turbonomic",
        tagline: "Continuously right-size your cloud and Kubernetes workloads — automatically.",
        description:
          "IBM Turbonomic is an Application Resource Management platform that analyzes workload demand in real time and autonomously resizes, moves, or reschedules resources to hit performance targets at minimum cost.",
        link: { kind: "internal", slug: "ibm-turbonomic" },
        vendorUrl: "https://www.ibm.com/products/turbonomic",
        detail: {
          overview: [
            "IBM Turbonomic (acquired by IBM in 2021) applies AI-driven Application Resource Management to continuously balance application performance and infrastructure cost. It monitors demand, projects resource needs, and issues — or executes — scaling actions across VMware, Kubernetes, and public cloud environments.",
            "TechD implements Turbonomic for enterprises looking to reduce cloud waste without sacrificing SLAs. Our engagements cover initial scoping of the resource management scope, policy configuration, and the governance model that decides which actions Turbonomic executes autonomously versus which require human approval.",
          ],
          capabilities: [
            "Automated right-sizing recommendations for VMs, containers, and cloud instances",
            "Kubernetes workload optimization — CPU/memory requests, node scheduling",
            "Multi-cloud support: AWS, Azure, GCP, IBM Cloud, VMware vSphere",
            "Application-aware actions — performance constraints embedded in resize decisions",
            "Policy engine — define which actions are autonomous vs. manual approval",
            "Integration with Instana and Apptio for full-stack observability + cost context",
            "Savings reports — projected and realized cost reduction over time",
          ],
          useCases: [
            "Cloud FinOps — continuous right-sizing to reduce idle and over-provisioned spend",
            "Kubernetes cluster efficiency and node utilization improvement",
            "Pre-migration sizing analysis for data center to cloud lift-and-shift",
            "Hybrid cloud workload placement and balancing",
          ],
        },
      },
    ],
  },

  {
    id: "security-compliance",
    name: "Security & Compliance",
    outcome: "Pass the audit. Protect the data. Respond to the breach.",
    description:
      "IBM Guardium, QRadar, and Resilient — the data security, threat detection, and incident response tooling that keeps regulated enterprises compliant and resilient.",
    highlights: [
      "Data activity monitoring",
      "Threat detection and SOAR",
      "Audit-ready evidence trails",
    ],
    pitch:
      "Data protection, threat detection, and structured response engineered for regulated enterprises — IBM Guardium, QRadar, and Resilient delivered by senior practitioners.",
    ctaLabel: "Explore security practice",
    products: [
      {
        name: "IBM Guardium",
        tagline: "Protect sensitive data wherever it lives — on-premises, cloud, or mainframe.",
        description:
          "IBM Guardium is the enterprise data security and activity monitoring platform for detecting unauthorized access, enforcing encryption policies, and producing the audit trails regulators require.",
        link: { kind: "internal", slug: "ibm-guardium" },
        vendorUrl: "https://www.ibm.com/products/guardium",
        detail: {
          overview: [
            "IBM Guardium provides continuous monitoring of data access across databases, data warehouses, big data environments, and cloud storage. It captures every query, tracks who accessed what data and when, detects anomalous activity, and generates the compliance reports required for HIPAA, PCI-DSS, SOX, and GDPR audits.",
            "TechD implements Guardium for health systems, financial institutions, and government agencies where data protection is a regulatory requirement. Our engagements cover sensor deployment, classification policies, alert tuning, and integration with SIEM platforms for centralized security event correlation.",
          ],
          capabilities: [
            "Real-time database activity monitoring across Db2, Oracle, SQL Server, MongoDB, and more",
            "Sensitive data discovery and classification (PII, PHI, PCI, financial identifiers)",
            "Vulnerability assessment — scanning for known database misconfigurations",
            "Encryption and key management via Guardium Data Encryption",
            "Pre-built compliance reports: HIPAA, PCI-DSS, SOX, GDPR",
            "Anomaly detection — baseline user behavior and alert on deviations",
            "SIEM integration — forward events to QRadar or third-party SIEM platforms",
          ],
          useCases: [
            "HIPAA database audit trail generation for health systems",
            "PCI-DSS cardholder data environment (CDE) monitoring",
            "Insider threat detection for privileged database accounts",
            "Cloud database protection for RDS, Azure SQL, and IBM Db2 on Cloud",
          ],
        },
      },
      {
        name: "IBM QRadar",
        tagline: "Security intelligence that correlates threats across your entire environment.",
        description:
          "IBM QRadar SIEM collects logs, flows, and events from across the enterprise, correlates them against threat intelligence, and surfaces the security incidents that matter — before they become breaches.",
        link: { kind: "internal", slug: "ibm-qradar" },
        vendorUrl: "https://www.ibm.com/qradar",
        detail: {
          overview: [
            "IBM QRadar is a SIEM (Security Information and Event Management) platform that ingests log and flow data from network devices, servers, applications, and cloud services, then applies correlation rules and behavioral analytics to detect threats. On-premises QRadar deployments remain a core IBM product actively supported in 2026.",
            "TechD implements QRadar for enterprises that need a centralized security operations view across hybrid environments. Our engagements include log source configuration, use case rule development, and integration with IBM Guardium and Resilient for a coordinated detect-and-respond workflow.",
          ],
          capabilities: [
            "Log and flow collection from 500+ supported data sources",
            "Correlation rules and custom use case development",
            "Offense management — prioritized security incident tracking",
            "Network flow analysis (QRadar QFlow) for behavioral anomaly detection",
            "IBM X-Force threat intelligence integration",
            "User behavior analytics (UBA) — detect compromised credentials and insider threats",
            "Integration with Guardium, Resilient, and third-party SOAR/ticketing platforms",
          ],
          useCases: [
            "24/7 SOC monitoring for hybrid enterprise environments",
            "Regulatory compliance reporting — security event evidence for audits",
            "Insider threat and privileged account monitoring",
            "Cloud security posture monitoring across AWS, Azure, IBM Cloud",
          ],
        },
      },
      {
        name: "IBM Resilient (QRadar SOAR)",
        tagline: "Orchestrate and accelerate security incident response across your team.",
        description:
          "IBM Resilient — now packaged as QRadar SOAR — provides the playbooks, case management, and automation that turn detected threats into structured, documented response, cutting mean time to respond for security operations teams.",
        link: { kind: "internal", slug: "ibm-resilient" },
        vendorUrl: "https://www.ibm.com/products/qradar-soar",
        detail: {
          overview: [
            "IBM Resilient (delivered today as QRadar SOAR) is a Security Orchestration, Automation, and Response platform that provides incident case management, dynamic playbooks, and integration with existing security tools to coordinate response actions across teams and reduce manual effort during active incidents.",
            "TechD implements Resilient alongside QRadar and Guardium to close the detect-to-respond loop. When QRadar raises an offense or Guardium detects anomalous data access, Resilient creates a structured case, assigns owners, triggers playbook tasks, and documents every action — building the incident record regulators and cyber insurers expect.",
          ],
          capabilities: [
            "Dynamic playbooks — automated task assignment triggered by incident type",
            "Case management with full timeline, evidence, and action documentation",
            "200+ third-party integrations via SOAR App Exchange (ticketing, threat intel, EDR)",
            "Bi-directional QRadar integration — offenses become Resilient incidents automatically",
            "Regulatory reporting assistance — GDPR 72-hour breach notification workflows",
            "Metrics and KPI dashboards — MTTD, MTTR, analyst workload",
            "Tabletop exercise support — simulate breach scenarios against documented playbooks",
          ],
          useCases: [
            "Security operations center (SOC) workflow automation and case management",
            "Ransomware and data breach response playbooks",
            "GDPR / CCPA breach notification process management",
            "Coordinated response across IT security, legal, and communications teams",
          ],
        },
      },
    ],
  },
];
