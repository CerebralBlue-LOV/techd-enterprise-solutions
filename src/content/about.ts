/**
 * Company / About content.
 *
 * Source of truth: docs/revisions/about/{company-overview, delivery-methodology,
 * ibm-partnership, leadership-team}.md. Every claim here traces back to those docs.
 *
 * Leadership names are permitted in this file per the CLAUDE.md leadership exception
 * (no personal contact details — only public career facts).
 */

export type Fact = { value: string; label: string };

export const COMPANY_FACTS: Fact[] = [
  { value: "2009", label: "Founded" },
  { value: "Platinum", label: "IBM Partner Plus tier" },
  { value: "Miami, FL", label: "Headquarters" },
  { value: "US & Canada", label: "Delivery footprint" },
];

export type PracticeArea = {
  name: string;
  description: string;
  to: string;
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    name: "AI & Generative Solutions",
    description:
      "watsonx.ai, watsonx Orchestrate, and assistant patterns for regulated enterprise workloads.",
    to: "/solutions/ai-generative",
  },
  {
    name: "Data & Analytics",
    description:
      "Db2, Cloud Pak for Data, Cognos Analytics, Planning Analytics, DataStage, and Netezza on the open data stack.",
    to: "/solutions/data-analytics",
  },
  {
    name: "Automation & FinOps",
    description:
      "Apptio, Instana, and Turbonomic for cost governance, observability, and resource optimization.",
    to: "/solutions/automation-finops",
  },
  {
    name: "Security & Compliance",
    description:
      "Guardium, QRadar, and QRadar SOAR for data protection, threat detection, and incident response.",
    to: "/solutions/security-compliance",
  },
];

export type PortfolioPractice = {
  practice: string;
  to: string;
  products: string[];
};

/** 21 confirmed products across four practices. Source: docs/revisions/about/ibm-partnership.md §1. */
export const PORTFOLIO_BY_PRACTICE: PortfolioPractice[] = [
  {
    practice: "AI & Generative",
    to: "/solutions/ai-generative",
    products: [
      "watsonx.ai",
      "watsonx (platform)",
      "watsonx Orchestrate",
      "IBM watsonx Assistant",
      "NeuralSeek",
      "IBM SPSS Modeler",
    ],
  },
  {
    practice: "Data & Analytics",
    to: "/solutions/data-analytics",
    products: [
      "IBM Db2",
      "watsonx.data",
      "watsonx.data intelligence",
      "watsonx.data integration",
      "Cloud Pak for Data",
      "IBM DataStage",
      "IBM Netezza Performance Server",
      "Cognos Analytics 12",
      "Planning Analytics",
    ],
  },
  {
    practice: "Automation & FinOps",
    to: "/solutions/automation-finops",
    products: ["IBM Apptio", "IBM Instana", "IBM Turbonomic"],
  },
  {
    practice: "Security & Compliance",
    to: "/solutions/security-compliance",
    products: ["IBM Guardium", "IBM QRadar", "IBM QRadar SOAR"],
  },
];

export type OperatingModelPillar = {
  pillar: string;
  stage: string;
  detail: string;
};

/** IBM AI Operating Model (Think 2026) ↔ TechD engagement stage. */
export const IBM_AI_OPERATING_MODEL: OperatingModelPillar[] = [
  {
    pillar: "Govern",
    stage: "Advisory Assessment",
    detail: "Current-state review, compliance posture, and licensing assessment.",
  },
  {
    pillar: "Integrate",
    stage: "Architecture Design + Implementation",
    detail: "Data pipeline design and platform deployment across the IBM stack.",
  },
  {
    pillar: "Orchestrate",
    stage: "Implementation + Knowledge Transfer",
    detail: "Agentic AI patterns and workflow automation handed off to your team.",
  },
  {
    pillar: "Automate",
    stage: "Post-Go-Live Support",
    detail: "Sustained automation, managed services, and optimization.",
  },
];

export type EngagementStage = {
  name: string;
  detail: string;
};

export const ENGAGEMENT_STAGES: EngagementStage[] = [
  {
    name: "Advisory Assessment",
    detail:
      "Structured engagement producing a written findings report: architecture review, security posture, licensing summary, and upgrade path.",
  },
  {
    name: "Architecture Design",
    detail:
      "Reference architecture mapped to your environment — data pipeline, platform topology, integration surfaces, and sequencing.",
  },
  {
    name: "Implementation",
    detail:
      "The same certified practitioners who scoped the engagement execute the build, integration, and cutover.",
  },
  {
    name: "Knowledge Transfer",
    detail:
      "Role-based enablement for your engineers, administrators, and analysts on the platform we just delivered.",
  },
  {
    name: "Post-Go-Live Support",
    detail:
      "Sustained operations under defined SLAs — patching, optimization, incident response, and roadmap alignment.",
  },
];

export const IBM_PLATFORM_ASSESSMENT = {
  name: "IBM Platform Assessment",
  format: "One-day evaluation, on-site or remote.",
  scope: [
    "Discovery session with platform owners",
    "Architecture and configuration review",
    "Security and user-role review",
    "Licensing assessment",
  ],
  deliverable: [
    "Findings summary",
    "Best-practice recommendations",
    "Patching and maintenance requirements",
    "Licensing summary",
    "Expansion and upgrade recommendations",
    "Complementary solution recommendations",
  ],
  next: "Implementation engagement, or stand-alone findings used to brief your team and IBM account.",
} as const;

export type ComplianceFramework = {
  framework: string;
  industry: string;
  detail: string;
};

export const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    framework: "HIPAA",
    industry: "Healthcare & Life Sciences",
    detail:
      "PHI segmentation, audit logging, and access controls configured into Db2, Cloud Pak for Data, and Guardium deployments.",
  },
  {
    framework: "FedRAMP",
    industry: "Public Sector",
    detail:
      "Authorization-aligned platform topologies and continuous monitoring posture across watsonx and QRadar environments.",
  },
  {
    framework: "PCI-DSS",
    industry: "Insurance & Financial Services",
    detail:
      "Cardholder-data scoping, encryption, and quarterly evidence collection built into Guardium and DataStage workflows.",
  },
  {
    framework: "NERC-CIP",
    industry: "Energy & Utilities",
    detail:
      "OT/IT segmentation, asset-inventory, and monitoring configurations aligned to the NERC-CIP control set.",
  },
];

export type LeadershipEntry = {
  name: string;
  title: string;
  bio: string;
  domains: string[];
};

export const LEADERSHIP: LeadershipEntry[] = [
  {
    name: "Marc Martina",
    title: "President",
    bio: "Marc co-founded TechD in 2009. He has spent 15+ years implementing IBM Cognos Analytics, Planning Analytics, and Db2 environments for healthcare, higher education, and financial services clients. He holds a degree in Computer Engineering from Villanova University.",
    domains: [
      "Cognos Analytics",
      "Planning Analytics (TM1)",
      "IBM Db2",
      "Data Warehousing",
    ],
  },
  {
    name: "Garrett Rowe",
    title: "VP of Artificial Intelligence & Managing Partner",
    bio: "Garrett joined TechD in 2022 following 15 years at IBM, where he led geo-level Sales and Engineering teams across the IBM Data and AI portfolio. He focuses on TechD's AI practice areas: watsonx.ai, watsonx Orchestrate, and Automation & FinOps. He is a graduate of the US Naval Academy.",
    domains: [
      "watsonx.ai",
      "watsonx Orchestrate",
      "watsonx Assistant",
      "Apptio · Turbonomic · Instana",
    ],
  },
];

export const WHY_THIS_TEAM =
  "Marc has spent 15+ years on the customer side of IBM implementations. Garrett spent 15 years on the IBM side. Between them, they have been on both ends of every procurement, architecture, and delivery decision TechD's clients face. That is the context behind our advisory engagements.";

export const SAME_PRACTITIONERS_COMMITMENT =
  "We do not hand off between advisory and delivery teams. The practitioners who assess your environment design the architecture and execute the implementation. There is no translation layer, no account-management layer between our recommendations and the people who build.";

export const QUICK_START_ADVISORY = {
  name: "Quick Start Advisory Services",
  scope:
    "A defined engagement combining advisory, implementation, training, and post-implementation support — scoped per client.",
  target:
    "Organizations of any size scoping work across one of the four practice areas: AI & Generative, Data & Analytics, Automation & FinOps, or Security & Compliance.",
  format: "On-site or remote. Customized to the platform and timeline.",
  ctaLabel: "See the Advisory service",
  ctaTo: "/services/advisory",
} as const;

/** IBM Partner Directory listing. Source: docs/revisions/about/ibm-partnership.md §1. */
export const IBM_PARTNER_DIRECTORY_URL =
  "https://www.ibm.com/partnerplus/directory/profile/69abd900-4f1d-11df-ac68-020031000011";
