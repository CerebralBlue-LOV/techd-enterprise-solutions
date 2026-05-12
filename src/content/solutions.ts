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
        tagline: "The enterprise relational database powering Fortune 500 workloads — now with Genius Hub agentic AI operations and native vector search.",
        description:
          "IBM Db2 is the production relational database at the core of TechD's data platform engagements — with Db2 Genius Hub for AI-powered autonomous operations, a native vector store for RAG applications, and LangChain/LlamaIndex connectors for enterprise AI development.",
        link: { kind: "internal", slug: "ibm-db2" },
        vendorUrl: "https://www.ibm.com/products/db2",
        detail: {
          overview: [
            "IBM Db2 is a high-performance relational database system used across TechD's enterprise client base for transactional workloads, analytics, and hybrid data architectures. Db2 Warehouse extends the engine with columnar BLU Acceleration and in-database ML for analytical workloads without a separate data warehouse infrastructure.",
            "TechD has deployed, optimized, and migrated Db2 environments for healthcare systems, media companies, and energy utilities. Our engagements range from schema design and query optimization to containerized Db2 deployments on OpenShift and full migrations from legacy platforms.",
          ],
          capabilities: [
            "Db2 Genius Hub — agentic, AI-powered operations console that correlates performance signals, proposes autonomous actions, and supports natural-language database scheduling",
            "Native vector store with similarity search — LangChain and LlamaIndex connectors for building RAG applications directly on enterprise Db2 data",
            "BLU Acceleration for columnar in-memory analytics alongside in-database ML workloads",
            "pureScale high availability with HADR for mixed topologies; AWS Elastic Fabric Adapter integration delivers up to 40% network performance improvement",
            "Db2 Intelligence Center — AI-powered unified management console for on-premises, cloud, and hybrid Db2 instances",
            "FIPS 140-3 compliance and quantum-safe cryptographic algorithms for post-quantum security requirements",
            "Flexible deployment — on-premises, containerized on OpenShift, BYOC on Azure, and Db2 Warehouse SaaS",
          ],
          useCases: [
            "Core ERP and clinical system transaction databases — with AI-powered query tuning and autonomous administration via Genius Hub",
            "Enterprise RAG data source — native vector store with LangChain and LlamaIndex connectors feeding watsonx.ai workloads",
            "Hybrid lakehouse foundation alongside watsonx.data — Db2 as the governed operational source feeding Apache Iceberg tables",
            "Legacy Oracle or SQL Server migrations to the IBM stack with FIPS 140-3 compliance and quantum-safe cryptographic readiness",
          ],
          whyTechD: [
            "15+ years deploying and optimizing Db2 for healthcare systems, media companies, and energy utilities — we know the production patterns that IBM documentation doesn't cover.",
            "End-to-end delivery: schema design, query optimization, pureScale HA configuration, and containerized Db2 on OpenShift — not just installation and hand-off.",
            "AI-ready Db2 deployments: we configure native vector stores, LangChain connectors, and Genius Hub policies so your Db2 estate immediately serves watsonx.ai RAG workloads.",
            "Regulated-industry expertise — FIPS 140-3 compliance, data encryption, and row-level security configurations that pass HIPAA and PCI-DSS audits.",
          ],
          stats: [
            { value: "15+ yrs", label: "TechD Db2 delivery" },
            { value: "Platinum", label: "IBM Business Partner" },
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
            "Open lakehouse on Apache Iceberg, Parquet, and ORC with multi-engine query — Presto, Spark, Db2, and Netezza against a shared governed data store",
            "Integrated vector database (Milvus-based) — unify, curate, and manage vectorized embeddings for generative AI applications at governed scale",
            "Remote MCP Server — AI agents interact with watsonx.data instances through natural language for data exploration, query execution, and ingestion",
            "Built-in data governance: enterprise-wide access policies, data masking, row/column-level security, and catalog integration",
            "Flexible deployment — IBM Cloud SaaS, self-managed on-premises, AWS, or Azure with separate compute and storage scaling",
            "Cost optimization — tiered storage with hot/warm/cold data routing; 40% more accurate AI than conventional RAG (IBM internal testing)",
            "Zero-ETL access to live operational Db2 and streaming sources with DataStage and Cognos Analytics native integration",
          ],
          useCases: [
            "Replacing legacy Hadoop / Cloudera environments with an open lakehouse that feeds both BI and AI workloads",
            "Unified analytics platform consolidating multiple BI data sources — governed once, queried by Presto, Spark, Db2, and Netezza",
            "AI training dataset management — vectorized embeddings and Iceberg-governed datasets for watsonx.ai workloads",
            "Cross-cloud data federation for M&A integration scenarios with consistent access policies across environments",
          ],
          whyTechD: [
            "TechD architects have worked with watsonx.data since its earliest releases — we know the engine configuration choices and governance setup that separate a performant lakehouse from a problematic one.",
            "Full-stack lakehouse delivery: we connect watsonx.data to your existing Db2 estate, DataStage pipelines, and Cognos Analytics environment — not the lakehouse tier in isolation.",
            "AI-ready from the start: we configure integrated vector stores, MCP server endpoints, and Iceberg governance so your lakehouse immediately feeds watsonx.ai with quality-assured, lineage-traced datasets.",
            "IBM Platinum Business Partner with certified watsonx.data architects across IBM Cloud, on-premises, AWS, and Azure deployment patterns.",
          ],
          stats: [
            { value: "40%", label: "more accurate AI than conventional RAG (IBM internal testing)" },
            { value: "Platinum", label: "IBM Business Partner" },
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
            "Unified runtime for watsonx.ai, watsonx.data, DataStage, and 60+ IBM services — all managed as Kubernetes operators on Red Hat OpenShift",
            "AutoPrivacy — AI-powered identification, monitoring, and policy enforcement on sensitive data across the organization",
            "IBM Master Data Management (formerly Match 360) with historical data capture for time-based entity and relationship tracking",
            "Multi-tenant project workspaces with role-based access; IBM Instana integration for real-time platform observability",
            "Data Virtualization with improved scalability — Cassandra connectors, watsonx.data Presto integration, and 60+ heterogeneous source connectors",
            "Air-gapped installation option for regulated and classified workloads on-premises or sovereign environments",
            "Operator-based lifecycle management — install, upgrade, and scale services independently without platform downtime",
          ],
          useCases: [
            "Enterprise data and AI platform consolidation — one OpenShift-based runtime for all IBM data and AI services",
            "On-premises watsonx deployment for data sovereignty, air-gapped, and FedRAMP requirements",
            "Multi-cloud AI platform with consistent operating model across IBM Cloud, AWS, Azure, and GCP",
            "Regulated industry data science environment with AutoPrivacy, audit controls, and RBAC from day one",
          ],
          whyTechD: [
            "TechD has implemented Cloud Pak for Data since its earliest releases — we've navigated every major version upgrade from 2.x through 5.x for clients who can't afford downtime during transitions.",
            "OpenShift expertise: we size, build, and configure the cluster before the first Cloud Pak for Data operator is deployed — not after it's already struggling in production.",
            "Multi-tenant architecture delivery: we design the project workspace structure, RBAC model, and storage tier configuration that lets data science and analytics teams share the platform without collision.",
            "IBM Platinum Business Partner with certified Cloud Pak for Data architects experienced in air-gapped installations for federal and regulated environments.",
          ],
          stats: [
            { value: "60+", label: "IBM data and AI services deployable on the platform" },
            { value: "Platinum", label: "IBM Business Partner" },
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
            "Reporting Agent, Recommendation Agent, Summarization Agent, and Sharing Agent — agentic AI that automates report aggregation, discovery, interpretation, and multi-channel distribution",
            "AI Assistant for natural language data exploration, on-demand visualization generation, and AI-powered forecasting with predictive modeling",
            "Sharing Agent routes reports with permission-aware governance across Slack, Teams, and email — no manual distribution workflows",
            "Governed data modules with row/column-level security — certified data models for compliance-ready reporting and audit trails",
            "Pixel-perfect formatted report output (PDF, Excel, HTML) with scheduled burst distribution to thousands of recipients",
            "Embedded analytics via SDK and JavaScript API for custom application and portal integration",
            "Upgrade and migration from Cognos 8.x, 10.x, and 11.x — including framework model migration and SDK customization",
          ],
          useCases: [
            "Executive and operational dashboards for health system leadership — Summarization Agent delivers context-aware interpretations automatically",
            "Regulatory and financial reporting for insurance and banking — compliance-ready certified data models with full audit trails",
            "Student, faculty, and research analytics for higher education — self-service dashboards with governed access to sensitive enrollment and grant data",
            "AI-powered subscriber and content performance analytics for media companies — predictive modeling and forecasting built in",
          ],
          whyTechD: [
            "One of the deepest Cognos Analytics practices in the IBM Business Partner ecosystem — 15+ years and more delivery hours than nearly any other partner across healthcare, insurance, education, and media.",
            "TechD's CogSuite — our own administration tooling built specifically to reduce Cognos operational overhead for clients running large, complex multi-tenant deployments.",
            "Content migration expertise: we've upgraded Cognos environments from 8.x, 10.x, and 11.x to current versions, including framework model migration and SDK customization other partners won't scope.",
            "IBM Platinum Business Partner — when IBM releases a new Cognos capability like the agentic AI agents, we have it tested in our lab before your IT team sees the release notes.",
          ],
          stats: [
            { value: "15+ yrs", label: "TechD Cognos delivery" },
            { value: "Platinum", label: "IBM Business Partner" },
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
            "Annual operating plan and rolling forecast processes — AI demand forecasting built into the planning cycle",
            "Workforce planning and headcount modeling across complex organizational structures",
            "Capital expenditure and project portfolio planning with driver-based financial modeling",
            "Regulatory reserve and claims forecasting for insurance — with rolling forecasts beyond the standard 12-month window",
          ],
          whyTechD: [
            "15+ years of Planning Analytics and TM1 delivery — we've built FP&A models for clients in healthcare, insurance, energy, and media that have run through dozens of budget cycles without breaking.",
            "Migration specialists: we've moved clients off Hyperion, Anaplan, and SAP BPC onto Planning Analytics, including the model rearchitecture work that migration tools alone cannot do.",
            "Model optimization for clients who've outgrown their original TM1 build — we've triaged and rebuilt models where overnight calculations had crept from minutes into hours.",
            "IBM Platinum Business Partner — we've delivered Planning Analytics implementations at the scale and complexity most partners decline to quote.",
          ],
          stats: [
            { value: "IDC Leader", label: "2026 Enterprise Planning, Budgeting & Forecasting" },
            { value: "15+ yrs", label: "TechD TM1 & Planning Analytics delivery" },
          ],
        },
      },
      {
        name: "IBM DataStage",
        tagline: "Enterprise data integration with AI-powered pipeline development — ETL and ELT at scale, from natural language to production.",
        description:
          "IBM DataStage is TechD's primary ETL and ELT platform — now with a GenAI-powered Data Integration Assistant for natural-language pipeline development and no-code, low-code, SQL, and pro-code authoring modes, available on IBM Cloud and as part of Cloud Pak for Data.",
        link: { kind: "internal", slug: "ibm-datastage" },
        vendorUrl: "https://www.ibm.com/products/datastage",
        detail: {
          overview: [
            "IBM DataStage is a high-throughput ETL and ELT platform used to build, orchestrate, and monitor data pipelines across on-premises, cloud, and hybrid environments. It handles structured and semi-structured data transformations at the scale enterprise clients require — millions of records per minute with parallel execution.",
            "TechD teams have built and maintained DataStage pipelines for health systems, media companies, and financial institutions. We design pipeline architecture, optimize job performance, and manage migrations from legacy ETL tools (Informatica, SSIS, ODI) to DataStage running on Cloud Pak for Data.",
          ],
          capabilities: [
            "GenAI-powered Data Integration Assistant — build ETL/ELT pipelines from natural language intent; no prior DataStage experience required",
            "No-code, low-code, SQL, and pro-code authoring modes — one platform for citizen integrators and experienced data engineers",
            "Best-in-class parallel execution engine — automatic task pipelining into concurrent operations for throughput and scalability at any scale",
            "DataStage Flow Designer in Cloud Pak for Data 5.3 — pipeline design, monitoring, and operations from a single integrated web UI",
            "Remote containerized engine — design pipelines once, deploy anywhere: on-premises, IBM Cloud, AWS, Azure, or hybrid",
            "100+ pre-built connectors for Db2, Oracle, SQL Server, Salesforce, S3, HDFS, Kafka, and streaming sources",
            "Native IBM Data Fabric integration — built-in observability, lineage, and governance for every pipeline job",
          ],
          useCases: [
            "AI-powered ETL pipeline development — natural language to executable DataStage jobs via the GenAI Data Integration Assistant",
            "Nightly EDW loads for Cognos Analytics and Planning Analytics with lineage-tracked governance",
            "HL7/FHIR patient data pipelines for health systems — structured and unstructured clinical data into governed targets",
            "Legacy ETL tool migrations (Informatica, SSIS, Ab Initio) to Cloud Pak for Data with regression-validated production parity",
          ],
          whyTechD: [
            "TechD teams have built and maintained DataStage pipelines for health systems, media companies, and financial institutions — we know the job design patterns and performance tuning that matter at enterprise scale.",
            "Migration track record: we've migrated clients from Informatica, SSIS, and Ab Initio to DataStage on Cloud Pak for Data, including the regression testing that validates parity before production cutover.",
            "End-to-end pipeline delivery: schema design, DataStage job architecture, performance optimization, CDC integration, and lineage wiring into watsonx.data intelligence — not just pipeline build and hand-off.",
            "IBM Platinum Business Partner with certified DataStage and Cloud Pak for Data architects across on-premises, SaaS, and hybrid deployment models.",
          ],
          stats: [
            { value: "100+", label: "pre-built source and target connectors" },
            { value: "Platinum", label: "IBM Business Partner" },
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
            "Massively parallel processing with over 90% of queries completing in under one second — even at petabyte scale",
            "Up to 4:1 data compression with FPGA-accelerated scan for sub-second analytical queries on large datasets",
            "Apache Iceberg support with Time Travel — historical data versioning and point-in-time queries for regulatory and compliance snapshots",
            "AI-powered Netezza Database Assistant — natural-language troubleshooting, metric retrieval, and configuration guidance without log-diving",
            "Flexible deployment: on-premises appliance, SaaS, and BYOC with native Cloud Object Storage for independent compute and storage scaling",
            "HIPAA-Ready and SOC 2 Type 2 certified; transparent data encryption, row-level security, and DBT-enabled data loading",
            "Migration support from Teradata, Sybase IQ, and Vertica — with native Cognos Analytics integration as a high-performance BI data source",
          ],
          useCases: [
            "High-frequency ad-hoc analytics for media audience and subscriber data — 90%+ of queries completing in under one second",
            "Actuarial and claims analytics at petabyte scale for insurance — with Time Travel for point-in-time regulatory snapshots",
            "Population health analytics for large health systems — HIPAA-Ready certified with row-level access control",
            "Legacy Teradata, Sybase IQ, and Vertica migrations to the IBM stack with performance parity and modern open-format support",
          ],
          whyTechD: [
            "TechD deploys Netezza for clients where query performance is the primary bottleneck — media audience analytics, actuarial modeling, and population health workloads where sub-second results are the expectation.",
            "Appliance sizing and migration expertise: we've designed Netezza environments from initial sizing through production cutover, and migrated clients from Teradata, Sybase IQ, and Vertica onto the IBM stack.",
            "Cognos Analytics integration depth: we wire Netezza as the high-performance BI data source behind Cognos reports where warehouse query times were driving user adoption problems.",
            "IBM Platinum Business Partner with certified Netezza architects for on-premises appliance, SaaS, and BYOC deployment patterns.",
          ],
          stats: [
            { value: "90%+", label: "of queries complete in under 1 second" },
            { value: "4:1", label: "data compression ratio" },
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
            "GenAI-powered glossary generation — up to 100× faster than manual with multi-language support and high accuracy",
            "Data Intelligence Assistant — conversational AI for metadata search, governance questions, and catalog exploration",
            "Automated data discovery and classification across multi-cloud sources with continuous quality and compliance monitoring",
            "End-to-end automated data lineage — track where data originates, how it transforms, and where it is consumed",
            "Policy enforcement at runtime: masking, encryption, access restriction, and GDPR/CCPA/HIPAA compliance reporting",
            "AI asset cataloging — track models alongside their training datasets for responsible AI documentation and governance",
            "Integration with DataStage, Db2, watsonx.data, and third-party sources via pre-built connectors",
          ],
          useCases: [
            "Regulatory data inventory and audit preparation — HIPAA, GDPR, CCPA, and PCI-DSS data inventories mapped to what auditors actually test",
            "AI model governance and responsible AI documentation — models and training datasets cataloged together",
            "Self-service data marketplace for internal data consumers with governed, lineage-traced dataset access",
            "Data quality scoring and remediation workflows with continuous monitoring across hybrid environments",
          ],
          whyTechD: [
            "TechD implements watsonx.data intelligence as the governance foundation for enterprise AI programs — we've seen the audit results when lineage is missing and we know how to establish it before an examination.",
            "Practiced alongside watsonx.data and Cloud Pak for Data deployments — we integrate catalog, lineage, and policy layers at platform build time, not as an afterthought.",
            "Regulated-industry governance specialists: HIPAA, GDPR, CCPA, and PCI-DSS configurations mapped to what auditors actually test — not just what the vendor demo shows.",
            "IBM Platinum Business Partner — recognized alongside IBM's Gartner Magic Quadrant Leader position for Data and Analytics Governance Platforms.",
          ],
          stats: [
            { value: "100×", label: "faster glossary generation with AI vs. manual process" },
            { value: "Gartner Leader", label: "Data & Analytics Governance Platforms 2025" },
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
            "Unified batch ETL/ELT, CDC replication, and real-time streaming integration in a single platform and operating model",
            "Unstructured Data Integration (UDI) — ingest, transform, and process documents, PDFs, and presentations for AI and RAG pipelines",
            "GenAI-assisted pipeline development and Python SDK — build pipelines in natural language, SQL, low-code, or fully code-first",
            "Parallel execution engine with ELT Pushdown — processes data where it resides, minimizing egress costs in hybrid environments",
            "Data Observability — proactive pipeline monitoring, anomaly detection, alerting, and automated issue remediation",
            "Native targets for watsonx.data and Cloud Pak for Data with end-to-end lineage into watsonx.data intelligence",
            "Heterogeneous connectivity — Db2, Oracle, SQL Server, SAP, Salesforce, S3; deploy on IBM Cloud, AWS, on-premises, or air-gapped",
          ],
          useCases: [
            "Consolidating legacy ETL tools (Informatica, SSIS, Ab Initio) onto a single IBM-supported modern integration platform",
            "Unstructured data ingestion pipelines — documents, PDFs, and presentations processed and delivered to watsonx.ai RAG workloads",
            "Real-time data movement from operational systems to watsonx.data lakehouse with Data Observability monitoring",
            "Hybrid data integration spanning on-premises and cloud sources with design-once, deploy-anywhere remote engines",
          ],
          whyTechD: [
            "TechD implements watsonx.data integration for clients consolidating legacy ETL tooling — we've migrated Informatica, SSIS, and Ab Initio pipelines onto the IBM-supported stack with the regression testing that validates production parity.",
            "Full-stack pipeline delivery: we connect watsonx.data integration to your source systems, configure ELT pushdown for in-database execution, and wire the Data Observability layer so your operations team knows before users do when a pipeline fails.",
            "Unstructured data integration expertise: we build the document, PDF, and PPT ingestion pipelines that feed watsonx.ai RAG applications — from source ingest through chunking strategy and vector store delivery.",
            "IBM Platinum Business Partner with certified architects across watsonx.data integration's batch, CDC, streaming, and AI-assisted development modes.",
          ],
          stats: [
            { value: "3-in-1", label: "batch, CDC, and real-time integration in one platform" },
            { value: "Platinum", label: "IBM Business Partner" },
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
        tagline: "Manage and optimize every IT dollar — from cloud invoices to AI infrastructure spend.",
        description:
          "IBM Apptio is the Technology Business Management platform for IT financial management — translating cloud bills, headcount, and vendor contracts into the cost-per-service transparency that CIOs and CFOs need to make investment decisions and prove IT value.",
        link: { kind: "internal", slug: "ibm-apptio" },
        vendorUrl: "https://www.ibm.com/products/apptio",
        detail: {
          overview: [
            "IBM Apptio is a full-suite IT financial management platform combining TBM cost modeling (Apptio), cloud FinOps (Cloudability), Kubernetes cost visibility (Kubecost 3.0), and portfolio planning (Targetprocess). The Apptio AI Assistant — powered by watsonx — delivers natural language cost queries, anomaly detection, and multi-model forecasting. Cloudability Governance (launched 2025) embeds cost policies directly into Terraform and HCP pipelines, preventing overspend before infrastructure deploys rather than remediating it after. Gartner named IBM Cloudability a Leader in the 2025 Magic Quadrant for Cloud Financial Management Tools.",
            "TechD implements Apptio for enterprises moving from IT-as-cost-center to IT-as-transparent-business-partner. Our engagements cover TBM taxonomy design built for organizational durability, Cloudability and Kubecost configuration, GPU cost monitoring for AI infrastructure, carbon emissions reporting aligned to CSRD and California SB 261, and the executive dashboards that get FinOps programs sustained C-suite sponsorship.",
          ],
          capabilities: [
            "TBM taxonomy — map infrastructure spend to towers, services, and business units with models that survive a re-org",
            "Cloudability Governance — shift-left cost policies embedded in Terraform and HCP before infrastructure deploys",
            "Kubecost 3.0 with NVIDIA DCGM GPU monitoring — cost visibility for Kubernetes AI/ML inference workloads",
            "Apptio AI Assistant (watsonx-powered) — natural language cost queries, anomaly detection, and multi-model forecasting",
            "Cloud Carbon Emissions Reporting (GA 2025) — MTCO2e and KwH alongside cost metrics for ESG and CSRD compliance",
            "Chargeback, showback, and peer benchmarking via Apptio's anonymized industry dataset",
            "Integration with ServiceNow, SAP, Oracle ERP, cloud billing APIs, and Turbonomic for cost-plus-performance context",
          ],
          useCases: [
            "FinOps for AI — GPU infrastructure cost visibility and lifecycle tracking as AI spend scales",
            "CIO transparency programs — monthly IT cost by business unit with industry peer benchmarking",
            "Cloud governance — shift-left cost policies preventing over-provisioning before it hits the invoice",
            "ESG compliance — carbon emissions reporting aligned to CSRD, California SB 261, and board sustainability commitments",
          ],
          whyTechD: [
            "TBM taxonomy built to last: we design cost models with the organizational durability that outlasts the initial engagement — models that survive a re-org, a cloud migration, or an M&A.",
            "Cloudability to Turbonomic handoff: cost visibility from Cloudability flows into Turbonomic's automated right-sizing actions — savings that run continuously, not just in the first-year analysis.",
            "FinOps for AI, configured before the GPU bill arrives: we set up Kubecost GPU monitoring and Cloudability AI infrastructure tracking before your LLM workloads scale beyond what spreadsheets can manage.",
            "From FinOps data to board story: we translate Apptio outputs into the investment narrative that earns sustained executive sponsorship — not just another dashboard that gets ignored after launch.",
          ],
          stats: [
            { value: "Gartner Leader", label: "Cloud Financial Management Tools MQ 2025" },
            { value: "30%+", label: "cloud unit cost reduction with Cloudability" },
          ],
        },
      },
      {
        name: "IBM Instana",
        tagline: "Full-stack observability with 100% trace capture, causal AI root cause, and native GenAI monitoring.",
        description:
          "IBM Instana delivers real-time distributed tracing, infrastructure monitoring, and AI-powered incident investigation across microservices, containers, and hybrid environments — capturing every trace at 1-second granularity without sampling.",
        link: { kind: "internal", slug: "ibm-instana" },
        vendorUrl: "https://www.ibm.com/products/instana",
        detail: {
          overview: [
            "IBM Instana is a full-stack observability platform with 150+ sensors covering 300+ technologies — bare metal, VMs, Kubernetes, serverless, PaaS/IaaS, and hybrid cloud. It captures 100% of traces at 1-second granularity with no sampling, auto-discovers services and topology, and correlates metrics, traces, and logs into a unified view. The Intelligent Incident Investigation feature (powered by agentic AI) acts like a skilled SRE — walking through cause-and-effect relationships and delivering 80% faster incident resolution in early production use. Gartner named IBM Instana a Leader in the 2025 Magic Quadrant for Observability Platforms.",
            "TechD implements Instana for organizations running complex microservice architectures where traditional monitoring creates alert storms without actionable root cause. Our engagements cover agent deployment at scale, SLO and Application Perspective configuration, GenAI/LLM observability setup for watsonx.ai and LangChain workloads, OpenTelemetry Fleet Management, and ITSM integration for automated incident routing.",
          ],
          capabilities: [
            "100% trace capture with 1-second granularity — no sampling; every request visible for complete root cause analysis",
            "Intelligent Incident Investigation (agentic AI) — automated investigation walks through cause-and-effect; 80% faster resolution",
            "Probable Root Cause algorithm (IBM Research causal AI) — identifies unhealthy entities with minimal manual investigation",
            "GenAI/LLM Observability (2025) — detect latency, token usage, cost, and drift across watsonx.ai, LangChain, and vector databases",
            "Fleet Management for OpenTelemetry Collectors (GA) — centralized OpAMP-based control of OTel collector pipelines",
            "150+ sensors, 300+ supported technologies — application, infrastructure, Kubernetes, databases, and cloud services",
            "watsonx integration — plain-English problem summarization and automated resolution action suggestions",
          ],
          useCases: [
            "Microservices observability with AI-powered incident investigation — 80% faster resolution without manual triage",
            "GenAI workload monitoring — latency, cost, and drift detection across LLM inference pipelines and vector databases",
            "SLO dashboards and Application Perspectives for platform engineering and site reliability teams",
            "Pre- and post-deployment health validation in CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI, Azure DevOps)",
          ],
          whyTechD: [
            "From 300 alerts to 3 actions: we configure Instana's AI and alerting policies so on-call teams get actionable signals, not noise — the difference between a tool your SREs trust and one they mute.",
            "GenAI observability from day one: we wire Instana's LLM and watsonx.ai sensors before AI workloads create the blind spots that cause 2 a.m. incidents.",
            "Instana to Turbonomic: observability data flows into Turbonomic's resource optimization engine so performance insights drive infrastructure action, not just dashboards that require manual follow-up.",
            "IBM Bob and Instana together: for clients modernizing IBM i or mainframe workloads, we connect Bob's BobShell audit trail to Instana observability so every modernization action is traceable end to end.",
          ],
          stats: [
            { value: "Gartner Leader", label: "2025 Magic Quadrant for Observability Platforms" },
            { value: "100%", label: "trace capture — no sampling, 1-second granularity" },
          ],
        },
      },
      {
        name: "IBM Turbonomic",
        tagline: "Continuously right-size cloud, Kubernetes, and AI inference workloads — automatically.",
        description:
          "IBM Turbonomic is an AI-driven Application Resource Management platform that analyzes workload demand in real time and autonomously resizes, moves, or reschedules resources to hit performance targets at minimum cost — delivering up to 43% cloud cost reduction.",
        link: { kind: "internal", slug: "ibm-turbonomic" },
        vendorUrl: "https://www.ibm.com/products/turbonomic",
        detail: {
          overview: [
            "IBM Turbonomic applies AI-driven Application Resource Management to continuously balance application performance and infrastructure cost across VMware, Kubernetes, Red Hat OpenShift, and public cloud environments. GenAI Inference Optimization (2025) analyzes GPU, CPU, and memory demand in real time and automates scaling and placement for AI inference services — tracking concurrency, response time, and queueing delays. Kubecost 3.0 integration adds real-time container cost visibility alongside every optimization action. FedRAMP authorization (AWS GovCloud) makes Turbonomic deployable in federal environments.",
            "TechD implements Turbonomic for enterprises looking to eliminate cloud waste without SLA risk. Our engagements start with policy design — defining which actions Turbonomic executes autonomously versus which require human approval — before any automation runs. We then configure the Instana observability loop, Kubecost integration, and the Apptio cost allocation connection that closes the performance-to-spend cycle.",
          ],
          capabilities: [
            "GenAI Inference Optimization — GPU/CPU/memory right-sizing for Kubernetes and OpenShift AI inference services",
            "Kubecost 3.0 integration — real-time container cost visibility alongside performance-assured optimization actions",
            "Node Scaling Control — Set Max Node Utilization for precise Kubernetes node scaling and provision action timing",
            "GitHub and Terraform integration — optimization of cloud workloads defined as infrastructure-as-code",
            "Multi-cloud support: AWS, Azure, GCP, IBM Cloud, VMware vSphere, and Red Hat OpenShift",
            "Policy engine — autonomous vs. approval-required action governance; Top Actions for fast prioritization",
            "FedRAMP authorized (Government Standard) — available as SaaS on AWS GovCloud for federal agencies",
          ],
          useCases: [
            "GenAI infrastructure cost control — GPU right-sizing for LLM inference clusters on Kubernetes and OpenShift",
            "Cloud FinOps — continuous right-sizing to eliminate idle and over-provisioned spend across multi-cloud",
            "VMware optimization — 75% cost avoidance in year one via hardware/licensing reduction and refresh deferral",
            "Pre-migration sizing analysis for data center to cloud lift-and-shift",
          ],
          whyTechD: [
            "Policy governance before automation: we define the autonomous vs. approval-required action model before Turbonomic runs its first resize — so no production workload gets scaled without the right human checkpoint in place.",
            "The full performance-to-spend loop: Instana observability feeding Turbonomic optimization feeding Apptio cost allocation is a TechD-delivered integration, not three separate vendor engagements with gaps between them.",
            "AI infrastructure ready: we configure GenAI Inference Optimization before your GPU spend scales beyond what manual monitoring can track — critical as LLM inference clusters grow.",
            "VMware to cloud migration input: Turbonomic rightsizing analysis is a core deliverable in TechD's data center migration playbook — sizing cloud targets against actual workload demand, not VM specs.",
          ],
          stats: [
            { value: "43%", label: "maximum cloud cost reduction" },
            { value: "247%", label: "3-year ROI — IBM-reported" },
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
        tagline: "Enterprise data security with AI threat detection, quantum-safe encryption, and compliance automation.",
        description:
          "IBM Guardium is the enterprise data security platform for detecting unauthorized data access, defending AI deployments from prompt injection, migrating to post-quantum cryptography, and producing the audit trails regulators require — across on-premises, cloud, and mainframe environments.",
        link: { kind: "internal", slug: "ibm-guardium" },
        vendorUrl: "https://www.ibm.com/products/guardium",
        detail: {
          overview: [
            "IBM Guardium Data Security Center is a SaaS-first unified platform consolidating Data Security Posture Management (DSPM), Data Detection & Response (DDR), Guardium AI Security, Guardium Quantum Safe, and compliance management into a single dashboard. Guardium AI Security discovers unauthorized AI deployments, detects prompt injection and jailbreak attempts on enterprise chatbots, and runs automated red teaming against your AI configurations. Guardium Cryptography Manager (2025) automates post-quantum cryptography migration aligned to NIST PQC standards — with IBM having contributed algorithms to those standards. A Forrester TEI commissioned by IBM found 406% ROI over three years and 70% reduction in audit preparation time.",
            "TechD implements Guardium for health systems, financial institutions, and government agencies where data protection is a regulatory requirement. Our engagements cover sensor deployment and classification policy design tuned to the controls auditors actually test, Guardium AI Security configuration for enterprise AI workload protection, Quantum Safe cryptography assessment and migration planning, and integration with QRadar SIEM for coordinated detect-and-respond.",
          ],
          capabilities: [
            "Real-time database activity monitoring across Db2, Oracle, SQL Server, MongoDB, and cloud databases (RDS, Azure SQL, Snowflake)",
            "Guardium AI Security — shadow AI discovery, prompt injection and jailbreak detection, automated red teaming for enterprise AI deployments",
            "Guardium Data Security Center — unified DSPM, DDR, and compliance management in a single SaaS-first dashboard",
            "Guardium Cryptography Manager — post-quantum cryptography migration with quantum-safe remediation aligned to NIST PQC standards",
            "Sensitive data discovery and classification (PII, PHI, PCI, financial identifiers) across databases, files, big data, and SaaS",
            "Pre-built compliance reports and automated audit evidence: HIPAA, PCI-DSS, SOX, GDPR, EU AI Act, ISO 42001",
            "watsonx.governance integration — unified agentic governance and security with AI agent lifecycle monitoring and audit trails (GA June 2025)",
          ],
          useCases: [
            "HIPAA database audit trail and PHI workload protection for health systems and insurers",
            "AI deployment security — shadow AI detection and prompt injection defense for enterprise GenAI rollouts",
            "Post-quantum cryptography readiness — cryptographic asset inventory and remediation before quantum threats materialize",
            "PCI-DSS cardholder data environment (CDE) monitoring and SOX financial data access controls",
          ],
          whyTechD: [
            "Compliance from sensor to audit report: we design Guardium deployments where every policy maps to the specific framework control your auditor will test — not a generic template that leaves gaps on exam day.",
            "AI security before the examiner asks: we configure Guardium AI Security for enterprise AI workloads — shadow AI discovery and prompt injection policies — before regulators start asking where your AI data went.",
            "Quantum-safe migration roadmap: we translate Guardium Cryptography Manager into a concrete cryptographic asset inventory and remediation plan — actionable steps, not a vendor slide deck on post-quantum risk.",
            "Guardium to QRadar closed loop: we build the forwarding rules and correlation that connect Guardium's data access events to QRadar's offense management — so PHI access anomalies don't die in a log file.",
          ],
          stats: [
            { value: "406%", label: "3-year ROI — Forrester TEI commissioned by IBM" },
            { value: "70%", label: "reduction in audit preparation time — Forrester TEI" },
          ],
        },
      },
      {
        name: "IBM QRadar",
        tagline: "AI-assisted SIEM with 55% faster investigation, MITRE ATT&CK mapping, and 14 consecutive Gartner Leader years.",
        description:
          "IBM QRadar SIEM collects logs, flows, and events from 500+ data sources, correlates them against threat intelligence and behavioral analytics, and surfaces the security incidents that matter — with a watsonx.ai Investigation Assistant that cuts alert triage time by 55%.",
        link: { kind: "internal", slug: "ibm-qradar" },
        vendorUrl: "https://www.ibm.com/qradar",
        detail: {
          overview: [
            "IBM QRadar is a SIEM platform that ingests log and flow data from 500+ data sources — network devices, servers, applications, and cloud services — then applies correlation rules, behavioral analytics, and machine learning to detect real threats. The QRadar Investigation Assistant (powered by watsonx.ai) automates federated searches, generates visual attack timelines with MITRE ATT&CK mappings, and delivers both executive and technical incident summaries, reducing investigation time by 55% in first-year deployments. QRadar 7.6.0 (2025/2026) introduces SIGMA rule support, cloud-native architecture, and modernized parsing. Gartner has named IBM QRadar a Leader in the Magic Quadrant for SIEM for 14 consecutive years. Note: IBM sold QRadar SaaS to Palo Alto Networks (EOL April 2025); on-premises QRadar remains fully IBM-owned and actively developed — the deployment model TechD implements.",
            "TechD implements on-premises QRadar for enterprises that need a centralized security operations view across hybrid environments. Our engagements include log source configuration for 500+ data source types, use case rule and SIGMA detection development mapped to client compliance frameworks, QRadar Investigation Assistant setup and tuning, and integration with IBM Guardium and QRadar SOAR for a coordinated detect-and-respond workflow.",
          ],
          capabilities: [
            "Log and flow collection from 500+ supported data sources — on-premises, cloud, and hybrid",
            "QRadar Investigation Assistant (watsonx.ai) — automated federated search, visual attack timelines, MITRE ATT&CK mapping, 55% faster triage",
            "SIGMA rule support (QRadar 7.6.0) — open-standard detection rules for community threat intelligence sharing",
            "User Behavior Analytics (UBA) — 6+ ML algorithms detecting anomalous user activity and compromised credentials",
            "QRadar Suite — SIEM, SOAR, EDR/XDR, and UBA in a unified analyst experience",
            "IBM X-Force threat intelligence — continuously updated threat feeds for correlation rule enrichment",
            "Offense management with prioritized incident tracking and ITSM integration (ServiceNow, Jira, PagerDuty)",
          ],
          useCases: [
            "24/7 SOC monitoring across hybrid environments with AI-assisted triage reducing analyst alert fatigue",
            "Insider threat and privileged account behavioral analytics across on-premises and cloud",
            "Regulatory compliance reporting — security event evidence for HIPAA, PCI-DSS, and FedRAMP audits",
            "MITRE ATT&CK coverage mapping and use case development for SOC maturity programs",
          ],
          whyTechD: [
            "Use cases that hold up in an audit: we develop QRadar correlation rules and SIGMA detections mapped to the specific regulatory frameworks our clients operate under — not generic content packs that generate false positives.",
            "Investigation Assistant tuned for your environment: we configure watsonx.ai integration and MITRE ATT&CK mapping so QRadar's AI summaries reflect your actual asset inventory and threat model.",
            "On-prem expertise as QRadar SaaS exits: with QRadar SaaS acquired by Palo Alto (EOL April 2025), TechD's on-premises deployment practice is the stable path for regulated enterprises that can't move SIEM data to a third-party cloud.",
            "Guardium to QRadar to SOAR: we build and own the full detect-and-respond chain — Guardium data access events feed QRadar offenses that trigger SOAR playbooks — so the loop closes without gaps between vendor teams.",
          ],
          stats: [
            { value: "14 years", label: "consecutive Gartner Magic Quadrant Leader for SIEM" },
            { value: "55% faster", label: "alert investigation with QRadar Investigation Assistant" },
          ],
        },
      },
      {
        name: "IBM Resilient (QRadar SOAR)",
        tagline: "AI-guided playbooks and case management that cut mean time to respond by up to 85%.",
        description:
          "IBM Resilient — delivered as QRadar SOAR — provides dynamic AI-guided playbooks, case management, and 300+ enterprise-grade integrations that turn detected threats into structured, documented response, cutting mean time to respond for security operations teams.",
        link: { kind: "internal", slug: "ibm-resilient" },
        vendorUrl: "https://www.ibm.com/products/qradar-soar",
        detail: {
          overview: [
            "IBM QRadar SOAR (formerly IBM Resilient) is a Security Orchestration, Automation, and Response platform with dynamic AI-guided playbooks, case management, and 300+ enterprise-grade bidirectional integrations. The award-winning Playbook Designer (Red Dot Design Award) enables low-code playbook creation in minutes; Playbook Go-Back allows jumps to any node mid-incident without restarting workflows — enabling up to 85% faster incident response. Actively developed through 2026: v51.0.9.0 (February 2026) adds S/MIME encrypted email, OpenSearch migration, and performance improvements. 200+ out-of-the-box privacy regulation templates cover GDPR, CCPA, HIPAA, and more.",
            "TechD implements QRadar SOAR alongside QRadar SIEM and Guardium to close the detect-to-respond loop. When QRadar raises an offense or Guardium detects anomalous data access, SOAR creates a structured case, assigns owners, triggers dynamic playbook tasks, and documents every action — building the incident record regulators and cyber insurers expect. Our engagements cover playbook development mapped to client-specific threat scenarios, regulatory notification workflow design (GDPR 72-hour, HIPAA breach rule), and ITSM integration.",
          ],
          capabilities: [
            "Dynamic AI-guided playbooks — Playbook Go-Back enables mid-incident node jumps; up to 85% faster response vs. static workflows",
            "Playbook Designer (Red Dot Design Award) — low-code creation; build response automations in minutes without coding",
            "300+ enterprise-grade bidirectional integrations across SIEM, EDR, threat intelligence, ITSM, and cloud providers",
            "200+ out-of-the-box privacy regulation templates (GDPR, CCPA, HIPAA, and more)",
            "GenAI-powered search (v51.0.7.0) — natural language queries across SOAR documentation and playbook content",
            "Case management with full timeline, evidence, and audit trail documentation",
            "MTTD/MTTR dashboard tracking with customizable SLA widgets for SOC performance management",
          ],
          useCases: [
            "SOC workflow automation with AI-guided playbooks cutting incident response time by up to 85%",
            "Ransomware and data breach response with dynamic playbooks that adapt as the incident evolves",
            "GDPR 72-hour and HIPAA breach notification process management with pre-built regulation templates",
            "Coordinated response across IT security, legal, and communications with full audit trail for cyber insurers",
          ],
          whyTechD: [
            "Playbooks mapped to your actual threat scenarios: we build SOAR playbooks around the incidents your regulated industry faces — PHI breach response, ransomware in a claims system, SOC escalation paths — not generic templates your analysts will skip.",
            "The full Guardium → QRadar → SOAR chain: we build and own the detect-to-respond integration so Guardium anomalies become QRadar offenses that trigger SOAR playbooks without manual handoffs between tools.",
            "Regulatory notification workflows ready before you need them: GDPR 72-hour and HIPAA breach notification playbooks configured, tested, and documented before the regulator calls — not assembled during an active incident.",
            "Cyber insurance documentation built in: every SOAR case produces the timeline, evidence record, and action log that cyber insurers require for claims — we configure this as a design requirement, not an afterthought.",
          ],
          stats: [
            { value: "85%", label: "reduction in incident response time with AI-guided playbooks" },
            { value: "300+", label: "enterprise-grade bidirectional integrations" },
          ],
        },
      },
    ],
  },
];
