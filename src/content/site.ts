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
      { label: "AI & Generative Solutions",     href: "/solutions#ai",            description: "watsonx.ai, watsonx Assistant, NeuralSeek, IBM Knowledge Catalog." },
      { label: "Data & Analytics",              href: "/solutions#data-analytics", description: "Db2, watsonx.data, DataStage, Cognos Analytics, Planning Analytics." },
      { label: "Automation & FinOps",           href: "/solutions#automation",    description: "IBM Apptio, Instana, Turbonomic." },
      { label: "Security & Compliance",         href: "/solutions#security",      description: "Guardium, QRadar, Resilient, MDM, Data Replication." },
      { label: "Hybrid Cloud & Infrastructure", href: "/solutions#hybrid-cloud",  description: "IBM Cloud, Red Hat OpenShift, mainframe integration." },
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

export type Customer = { name: string; url: string; logo?: string };

export const CUSTOMERS: Customer[] = [
  { name: "Johnson & Johnson", url: "https://www.jnj.com", logo: "/logos/johnson-and-johnson.png" },
  { name: "Sony Pictures", url: "https://www.sonypictures.com", logo: "/logos/sony-pictures.png" },
  { name: "Comcast / Peacock", url: "https://www.peacocktv.com", logo: "/logos/comcast-peacock.png" },
  { name: "Johns Hopkins Medicine", url: "https://www.hopkinsmedicine.org", logo: "/logos/johns-hopkins.png" },
  { name: "Princeton University", url: "https://www.princeton.edu", logo: "/logos/princeton-university.png" },
  { name: "DHS", url: "https://www.dhs.gov", logo: "/logos/dhs.png" },
  { name: "L3Harris", url: "https://www.l3harris.com", logo: "/logos/l3harris.png" },
  { name: "Dominion Energy", url: "https://www.dominionenergy.com", logo: "/logos/dominion-energy.png" },
  { name: "Corning", url: "https://www.corning.com", logo: "/logos/corning.png" },
  { name: "CHOP", url: "https://www.chop.edu", logo: "/logos/chop.png" },
  { name: "Jefferson Health", url: "https://www.jeffersonhealth.org", logo: "/logos/jefferson-health.png" },
  { name: "Temple Health", url: "https://www.templehealth.org", logo: "/logos/temple-health.png" },
  { name: "Genesis HealthCare", url: "https://www.genesishcc.com", logo: "/logos/genesis-healthcare.png" },
  { name: "Sony Interactive Entertainment", url: "https://www.sie.com", logo: "/logos/sony-interactive.png" },
  { name: "MISO Energy", url: "https://www.misoenergy.org", logo: "/logos/miso-energy.png" },
  { name: "PURE Insurance", url: "https://www.pureinsurance.com", logo: "/logos/pure-insurance.png" },
  { name: "National General Insurance", url: "https://www.nationalgeneral.com", logo: "/logos/national-general.png" },
  { name: "Hamilton Beach", url: "https://www.hamiltonbeach.com", logo: "/logos/hamilton-beach.png" },
  { name: "Burlington", url: "https://www.burlington.com", logo: "/logos/burlington.png" },
  { name: "KenSeal", url: "https://www.kenseal.com", logo: "/logos/kenseal.png" },
  { name: "The Kennedy Center", url: "https://www.kennedy-center.org", logo: "/logos/kennedy-center.png" },
  { name: "VCU", url: "https://www.vcu.edu", logo: "/logos/vcu.png" },
];
