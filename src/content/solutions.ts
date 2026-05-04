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
    name: "AI & Generative Solutions",
    outcome: "Ship trustworthy gen AI on top of governed enterprise data.",
    description:
      "Production RAG, agentic workflows, and conversational interfaces built on IBM watsonx Assistant, watsonx.ai, and NeuralSeek — grounded in your data, not the open web.",
    capabilities: [
      "watsonx Assistant + NeuralSeek RAG",
      "Agentic workflows on watsonx.ai",
      "Enterprise knowledge retrieval",
      "MLOps and model governance",
    ],
  },
  {
    id: "data",
    name: "Data Platforms",
    outcome: "Make your data AI-ready, governed, and defensible.",
    description:
      "IBM Db2, lakehouse, and data fabric architectures — the foundation that decides whether your AI tells the truth.",
    capabilities: [
      "IBM Db2 + watsonx.data lakehouse",
      "Data fabric and unified governance",
      "Master data and lineage",
      "AI-ready data products",
    ],
  },
  {
    id: "cloud",
    name: "Hybrid Cloud",
    outcome: "Run mission workloads where they belong — and move them when you need to.",
    description:
      "Hybrid landing zones across IBM Cloud, AWS, Azure, and on-prem, with OpenShift and mainframe integration where it matters.",
    capabilities: [
      "Hybrid and multi-cloud strategy",
      "Red Hat OpenShift",
      "Landing zone and FinOps",
      "Mainframe (Z) integration",
    ],
  },
  {
    id: "security",
    name: "Security & Governance",
    outcome: "Pass the audit. Survive the breach attempt.",
    description:
      "Identity, zero-trust, and data protection programs designed for HIPAA, FedRAMP, PCI, and the next regulator on the horizon.",
    capabilities: [
      "IBM Guardium data protection",
      "Identity and access modernization",
      "Zero-trust network architecture",
      "Compliance and audit readiness",
    ],
  },
  {
    id: "app-mod",
    name: "Analytics Modernization",
    outcome: "Modernize Cognos, TM1, and legacy BI without breaking the business.",
    description:
      "Fifteen years of Cognos, TM1, and Netezza in production — now used to migrate clients to watsonx.ai, lakehouse, and modern BI without losing institutional knowledge.",
    capabilities: [
      "Cognos → watsonx.ai migration",
      "TM1 / Planning Analytics modernization",
      "BI consolidation",
      "Custom Cognos SDK extensions",
    ],
  },
];
