export type Industry = {
  id: string;
  name: string;
  outcome: string;
  examples: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    outcome: "Accelerate research, protect patient data, scale clinical operations.",
    examples: [
      "Clinical knowledge agents",
      "HIPAA-grade data platforms",
      "Pharmacovigilance automation",
    ],
  },
  {
    id: "financial",
    name: "Financial Services",
    outcome: "Outpace risk and regulation with provable controls.",
    examples: ["Fraud detection", "Regulatory reporting", "Core modernization"],
  },
  {
    id: "insurance",
    name: "Insurance",
    outcome: "Underwrite, price, and settle with AI-assisted precision.",
    examples: ["Claims automation", "Underwriting copilots", "Actuarial analytics"],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    outcome: "Operate critical infrastructure with confidence.",
    examples: ["Grid analytics", "Asset performance", "OT/IT security"],
  },
  {
    id: "education",
    name: "Higher Education",
    outcome: "Modernize the research and student experience.",
    examples: ["Research computing", "Identity and SSO", "Student data platforms"],
  },
  {
    id: "public",
    name: "Public Sector",
    outcome: "Deliver mission outcomes with auditable AI.",
    examples: ["Citizen services AI", "FedRAMP-aligned cloud", "Records modernization"],
  },
];
