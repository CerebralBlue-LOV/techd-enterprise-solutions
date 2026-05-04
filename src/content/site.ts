export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "AI & Generative Solutions", href: "/solutions#ai-automation", description: "watsonx Assistant, NeuralSeek RAG, agentic workflows." },
      { label: "Data Platforms", href: "/solutions#data", description: "IBM Db2, lakehouse, governance, AI-ready data products." },
      { label: "Hybrid Cloud", href: "/solutions#cloud", description: "IBM Cloud, AWS, Azure, OpenShift, mainframe integration." },
      { label: "Security & Governance", href: "/solutions#security", description: "Guardium, identity, zero-trust for regulated industries." },
      { label: "Analytics Modernization", href: "/solutions#app-mod", description: "Cognos, TM1, and BI migration to watsonx.ai." },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Healthcare & Life Sciences", href: "/industries#healthcare" },
      { label: "Media & Entertainment", href: "/industries#media" },
      { label: "Insurance", href: "/industries#insurance" },
      { label: "Energy & Utilities", href: "/industries#energy" },
      { label: "Higher Education & Research", href: "/industries#education" },
      { label: "Public Sector", href: "/industries#public" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Advisory", href: "/services#advisory" },
      { label: "Implementation", href: "/services#implementation" },
      { label: "Managed Services", href: "/services#managed" },
      { label: "Training", href: "/services#training" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Case Studies", href: "/resources?tab=case-studies" },
      { label: "Blog", href: "/resources?tab=blog" },
      { label: "Webinars", href: "/resources?tab=webinars" },
      { label: "Events", href: "/resources?tab=events" },
    ],
  },
  {
    label: "Company",
    href: "/contact",
    children: [
      { label: "About", href: "/contact#about" },
      { label: "IBM Partnership", href: "/contact#ibm" },
      { label: "Customers", href: "/contact#customers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const CUSTOMERS = [
  "Johnson & Johnson",
  "Sony Pictures",
  "Comcast / Peacock",
  "Johns Hopkins Medicine",
  "Princeton University",
  "DHS",
  "L3Harris",
  "Dominion Energy",
  "Corning",
  "CHOP",
  "Jefferson Health",
  "Temple Health",
  "Genesis HealthCare",
  "Sony Interactive Entertainment",
  "MISO Energy",
  "PURE Insurance",
  "National General Insurance",
  "Hamilton Beach",
  "Burlington",
  "KenSeal",
  "The Kennedy Center",
  "VCU",
];
