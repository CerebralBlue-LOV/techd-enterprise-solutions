export type NavItem = {
  label: string;
  /** Optional href. Top-level dropdown labels omit href and act as menu triggers only. */
  href?: string;
  children?: { label: string; href: string; description?: string; latest?: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Solutions",
    children: [
      { label: "AI & Generative Solutions",     href: "/solutions/ai-generative",       description: "watsonx.ai, watsonx Assistant, NeuralSeek, IBM Knowledge Catalog." },
      { label: "Data & Analytics",              href: "/solutions/data-analytics",      description: "Db2, watsonx.data, DataStage, Cognos Analytics, Planning Analytics." },
      { label: "Automation & FinOps",           href: "/solutions/automation-finops",   description: "IBM Apptio, Instana, Turbonomic." },
      { label: "Security & Compliance",         href: "/solutions/security-compliance", description: "Guardium, QRadar, Resilient — data protection and threat detection." },
      { label: "Hybrid Cloud & Infrastructure", href: "/solutions/hybrid-cloud",        description: "IBM Cloud, Red Hat OpenShift, mainframe integration." },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "Healthcare & Life Sciences",  href: "/industries/healthcare",        description: "Clinical knowledge agents, HIPAA-grade data platforms, pharmacovigilance automation." },
      { label: "Media & Entertainment",       href: "/industries/media-entertainment", description: "Content intelligence, audience analytics, operational AI." },
      { label: "Insurance",                   href: "/industries/insurance",          description: "Underwriting copilots, claims automation, actuarial analytics." },
      { label: "Energy & Utilities",          href: "/industries/energy-utilities",   description: "Grid analytics, asset performance management, OT/IT security." },
      { label: "Higher Education & Research", href: "/industries/higher-education",   description: "Research computing, identity and SSO, student data platforms." },
      { label: "Public Sector",               href: "/industries/public-sector",      description: "Auditable AI systems, FedRAMP-aligned cloud, records modernization." },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Advisory",         href: "/services/advisory",         description: "Strategy, roadmaps, and AI readiness assessments." },
      { label: "Implementation",   href: "/services/implementation",   description: "Engineering delivery — greenfield builds, migrations, and integrations." },
      { label: "Managed Services", href: "/services/managed-services", description: "24×7 platform and security operations, FinOps." },
      { label: "Training",         href: "/services/training",         description: "Role-based IBM enablement for executives, architects, and engineers." },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Case Studies", href: "/resources/case-studies", description: "Client stories from named enterprise engagements.", latest: "2025" },
      { label: "Blog",         href: "/resources/blog",         description: "Insights on AI, data governance, and enterprise architecture." },
      // Webinars and Events exist as routes but are hidden from nav until content is confirmed ready.
    ],
  },
  {
    label: "Company",
    href: "/company/about",
    children: [
      { label: "About",           href: "/company/about",            description: "Our story, leadership, and delivery footprint." },
      { label: "IBM Partnership", href: "/company/ibm-partnership",  description: "Platinum-tier access to IBM engineering and early product programs." },
      { label: "Customers",       href: "/company/customers",        description: "Fortune 500 enterprises across healthcare, media, insurance, and more." },
      { label: "Contact",         href: "/contact",                  description: "Talk to a senior practitioner — no SDR queue." },
    ],
  },
];

export type Customer = { name: string; url: string; logo?: string; logoClass?: string };

export const CUSTOMERS: Customer[] = [
  { name: "Johnson & Johnson", url: "https://www.jnj.com", logo: "/logos/johnson-and-johnson.png", logoClass: "h-4 md:h-5" },
  { name: "Sony Pictures", url: "https://www.sonypictures.com", logo: "/logos/sony-pictures.png", logoClass: "h-14 md:h-16" },
  { name: "Comcast / Peacock", url: "https://www.peacocktv.com", logo: "/logos/comcast-peacock.svg", logoClass: "h-8 md:h-9" },
  { name: "Johns Hopkins Medicine", url: "https://www.hopkinsmedicine.org", logo: "/logos/johns-hopkins.png" },
  { name: "Princeton University", url: "https://www.princeton.edu", logo: "/logos/princeton-university.png", logoClass: "h-8 md:h-9" },
  { name: "DHS", url: "https://www.dhs.gov", logo: "/logos/dhs.svg", logoClass: "h-12 md:h-14" },
  { name: "L3Harris", url: "https://www.l3harris.com", logo: "/logos/l3harris.png", logoClass: "h-8 md:h-9" },
  { name: "Dominion Energy", url: "https://www.dominionenergy.com", logo: "/logos/dominion-energy.png", logoClass: "h-8 md:h-9" },
  { name: "Corning", url: "https://www.corning.com", logo: "/logos/corning.png" },
  { name: "CHOP", url: "https://www.chop.edu", logo: "/logos/chop.png" },
  { name: "Jefferson Health", url: "https://www.jeffersonhealth.org", logo: "/logos/jefferson-health.png", logoClass: "h-8 md:h-9" },
  { name: "Temple Health", url: "https://www.templehealth.org", logo: "/logos/temple-health.png", logoClass: "h-6 md:h-7" },
  { name: "Genesis HealthCare", url: "https://www.genesishcc.com", logo: "/logos/genesis-healthcare.png", logoClass: "h-8 md:h-9" },
  { name: "Sony Interactive Entertainment", url: "https://www.sie.com", logo: "/logos/sony-interactive.svg" },
  { name: "MISO Energy", url: "https://www.misoenergy.org", logo: "/logos/miso-energy.png" },
  { name: "PURE Insurance", url: "https://www.pureinsurance.com", logo: "/logos/pure-insurance.png", logoClass: "h-12 md:h-14" },
  { name: "National General Insurance", url: "https://www.nationalgeneral.com", logo: "/logos/national-general.png", logoClass: "h-14 md:h-16" },
  { name: "Hamilton Beach", url: "https://www.hamiltonbeach.com", logo: "/logos/hamilton-beach.png", logoClass: "h-24 md:h-28" },
  { name: "Burlington", url: "https://www.burlington.com", logo: "/logos/burlington.png", logoClass: "h-8 md:h-9" },
  { name: "White Cap", url: "https://www.whitecap.com", logo: "/logos/white-cap.png", logoClass: "h-24 md:h-28" },
  
  { name: "The Kennedy Center", url: "https://www.kennedy-center.org", logo: "/logos/kennedy-center.png" },
  { name: "VCU", url: "https://www.vcu.edu", logo: "/logos/vcu.png", logoClass: "h-6 md:h-7" },
];
