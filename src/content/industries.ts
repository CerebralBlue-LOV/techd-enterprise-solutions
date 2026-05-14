export type Industry = {
  id: string;
  name: string;
  regulation: string;
  outcome: string;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    regulation: "HIPAA · HITECH",
    outcome:
      "Data platforms, clinical knowledge agents, and pharmacovigilance automation built to HIPAA-grade standards for health systems and life sciences organizations.",
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    regulation: "CCPA · SOC 2",
    outcome:
      "AI-powered content intelligence, audience analytics, and operations platforms for studios, networks, and streaming providers.",
  },
  {
    id: "insurance",
    name: "Insurance",
    regulation: "NAIC · SOX",
    outcome:
      "Underwriting copilots, claims acceleration, and actuarial analytics for property, casualty, and specialty carriers.",
  },
  {
    id: "energy-utilities",
    name: "Energy & Utilities",
    regulation: "NERC-CIP · FERC",
    outcome:
      "Grid analytics, asset performance management, and OT/IT security for regulated utilities and independent system operators.",
  },
  {
    id: "higher-education",
    name: "Higher Education & Research",
    regulation: "FERPA · FISMA",
    outcome:
      "Research computing platforms, identity and access management, and student data infrastructure for universities and research institutions.",
  },
  {
    id: "public-sector",
    name: "Public Sector",
    regulation: "FedRAMP · FISMA",
    outcome:
      "Auditable AI systems and modernized records management for federal agencies and defense technology organizations.",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    regulation: "PCI-DSS · SOX · Basel III",
    outcome:
      "Core banking analytics, fraud and AML detection, and regulator-ready data platforms for global banks, regional carriers, payments, and cooperative finance.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrials",
    regulation: "ISO 27001 · NIST CSF",
    outcome:
      "Operational analytics, supply-chain intelligence, and OT/IT security for automotive, materials, industrial equipment, and global trading enterprises.",
  },
];
