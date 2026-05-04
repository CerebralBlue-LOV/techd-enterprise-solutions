export type Solution = {
  id: string;
  name: string;
  outcome: string;
  description: string;
  capabilities: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "ai-automation",
    name: "AI & Automation",
    outcome: "Compress decision cycles from weeks to minutes.",
    description:
      "Production-grade agentic AI, generative experiences, and intelligent automation built on IBM watsonx and best-of-breed open models.",
    capabilities: [
      "Agentic workflows on watsonx",
      "Enterprise RAG and knowledge fabric",
      "Process automation with measurable ROI",
      "MLOps and model governance",
    ],
  },
  {
    id: "data",
    name: "Data Solutions",
    outcome: "Turn fragmented data into a defensible advantage.",
    description:
      "Unified data architecture, governance, and analytics that hold up to regulators and scale to AI workloads.",
    capabilities: [
      "Lakehouse and data fabric architecture",
      "Master data and governance",
      "Real-time analytics and BI modernization",
      "AI-ready data products",
    ],
  },
  {
    id: "security",
    name: "Security",
    outcome: "Reduce risk without slowing the business.",
    description:
      "Zero-trust, identity, and threat management programs designed for regulated, multi-cloud environments.",
    capabilities: [
      "Identity and access modernization",
      "Zero-trust network architecture",
      "Threat detection and response",
      "Compliance and audit readiness",
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    outcome: "Build infrastructure that survives the next decade.",
    description:
      "Hybrid cloud strategy, landing zones, and resilient infrastructure across IBM Cloud, AWS, Azure, and on-prem.",
    capabilities: [
      "Hybrid and multi-cloud strategy",
      "Landing zone and FinOps",
      "Resilience and disaster recovery",
      "Mainframe integration",
    ],
  },
  {
    id: "app-mod",
    name: "Application Modernization",
    outcome: "Replatform legacy systems for the AI era.",
    description:
      "Move from monoliths to composable architectures without disrupting the business of record.",
    capabilities: [
      "Mainframe and COBOL modernization",
      "Microservices and API strategy",
      "DevSecOps platforms",
      "Containers and Kubernetes (OpenShift)",
    ],
  },
];
