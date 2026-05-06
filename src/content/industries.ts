export type Industry = {
  id: string;
  name: string;
  regulation: string;
  outcome: string;
  clients: string[];
  examples: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    regulation: "HIPAA · HITECH",
    outcome:
      "Data platforms, clinical knowledge agents, and pharmacovigilance automation built to HIPAA-grade standards for health systems and life sciences organizations.",
    clients: [
      "Johns Hopkins Medicine",
      "CHOP",
      "Jefferson Health",
      "Temple Health",
      "Genesis HealthCare",
    ],
    examples: [
      "Clinical knowledge agents",
      "HIPAA-grade data platforms",
      "Pharmacovigilance automation",
    ],
  },
  {
    id: "media",
    name: "Media & Entertainment",
    regulation: "CCPA · SOC 2",
    outcome:
      "AI-powered content intelligence, audience analytics, and operations platforms for studios, networks, and streaming providers.",
    clients: ["Sony Pictures", "Sony Interactive Entertainment", "Comcast / Peacock"],
    examples: ["Content intelligence", "Audience analytics", "Operational AI"],
  },
  {
    id: "insurance",
    name: "Insurance",
    regulation: "NAIC · SOX",
    outcome:
      "Underwriting copilots, claims acceleration, and actuarial analytics for property, casualty, and specialty carriers.",
    clients: ["PURE Insurance", "National General"],
    examples: ["Claims automation", "Underwriting copilots", "Actuarial analytics"],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    regulation: "NERC-CIP · FERC",
    outcome:
      "Grid analytics, asset performance management, and OT/IT security for regulated utilities and independent system operators.",
    clients: ["Dominion Energy", "MISO"],
    examples: ["Grid analytics", "Asset performance", "OT/IT security"],
  },
  {
    id: "education",
    name: "Higher Education & Research",
    regulation: "FERPA · FISMA",
    outcome:
      "Research computing platforms, identity and access management, and student data infrastructure for universities and research institutions.",
    clients: ["Princeton University", "VCU"],
    examples: ["Research computing", "Identity and SSO", "Student data platforms"],
  },
  {
    id: "public",
    name: "Public Sector",
    regulation: "FedRAMP · FISMA",
    outcome:
      "Auditable AI systems and modernized records management for federal agencies and defense technology organizations.",
    clients: ["DHS", "L3Harris"],
    examples: ["Citizen services AI", "FedRAMP-aligned cloud", "Records modernization"],
  },
];
