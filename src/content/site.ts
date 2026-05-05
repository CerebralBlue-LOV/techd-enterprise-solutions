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

export type Customer = { name: string; url: string };

export const CUSTOMERS: Customer[] = [
  { name: "Johnson & Johnson", url: "https://www.jnj.com" },
  { name: "Sony Pictures", url: "https://www.sonypictures.com" },
  { name: "Comcast / Peacock", url: "https://www.peacocktv.com" },
  { name: "Johns Hopkins Medicine", url: "https://www.hopkinsmedicine.org" },
  { name: "Princeton University", url: "https://www.princeton.edu" },
  { name: "DHS", url: "https://www.dhs.gov" },
  { name: "L3Harris", url: "https://www.l3harris.com" },
  { name: "Dominion Energy", url: "https://www.dominionenergy.com" },
  { name: "Corning", url: "https://www.corning.com" },
  { name: "CHOP", url: "https://www.chop.edu" },
  { name: "Jefferson Health", url: "https://www.jeffersonhealth.org" },
  { name: "Temple Health", url: "https://www.templehealth.org" },
  { name: "Genesis HealthCare", url: "https://www.genesishcc.com" },
  { name: "Sony Interactive Entertainment", url: "https://www.sie.com" },
  { name: "MISO Energy", url: "https://www.misoenergy.org" },
  { name: "PURE Insurance", url: "https://www.pureinsurance.com" },
  { name: "National General Insurance", url: "https://www.nationalgeneral.com" },
  { name: "Hamilton Beach", url: "https://www.hamiltonbeach.com" },
  { name: "Burlington", url: "https://www.burlington.com" },
  { name: "KenSeal", url: "https://www.kenseal.com" },
  { name: "The Kennedy Center", url: "https://www.kennedy-center.org" },
  { name: "VCU", url: "https://www.vcu.edu" },
];
