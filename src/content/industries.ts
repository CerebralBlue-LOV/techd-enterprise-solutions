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
    outcome:
      "HIPAA-grade data platforms and clinical knowledge agents. Trusted by Johns Hopkins Medicine, CHOP, Jefferson Health, Temple Health, and Genesis HealthCare.",
    examples: [
      "Clinical knowledge agents",
      "HIPAA-grade data platforms",
      "Pharmacovigilance automation",
    ],
  },
  {
    id: "media",
    name: "Media & Entertainment",
    outcome:
      "AI-powered content, audience, and operations platforms. Trusted by Sony Pictures, Sony Interactive Entertainment, and Comcast / Peacock.",
    examples: ["Content intelligence", "Audience analytics", "Operational AI"],
  },
  {
    id: "insurance",
    name: "Insurance",
    outcome:
      "Underwriting copilots, claims acceleration, actuarial analytics. Trusted by PURE Insurance and National General.",
    examples: ["Claims automation", "Underwriting copilots", "Actuarial analytics"],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    outcome:
      "Grid analytics, asset performance, and OT/IT security. Trusted by Dominion Energy and MISO.",
    examples: ["Grid analytics", "Asset performance", "OT/IT security"],
  },
  {
    id: "education",
    name: "Higher Education & Research",
    outcome:
      "Research computing, identity, and student data platforms. Trusted by Princeton University and VCU.",
    examples: ["Research computing", "Identity and SSO", "Student data platforms"],
  },
  {
    id: "public",
    name: "Public Sector",
    outcome:
      "Auditable AI and modernized records for mission delivery. Trusted by DHS and L3Harris.",
    examples: ["Citizen services AI", "FedRAMP-aligned cloud", "Records modernization"],
  },
];
