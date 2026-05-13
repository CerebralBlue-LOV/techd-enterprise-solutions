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
      { label: "AI & Generative Solutions",     href: "/solutions/ai-generative",       description: "NeuralSeek, watsonx.ai, watsonx, watsonx Orchestrate, IBM Bob, SPSS Modeler." },
      { label: "Data & Analytics",              href: "/solutions/data-analytics",      description: "Db2, watsonx.data, Cloud Pak for Data, Cognos Analytics, Planning Analytics, DataStage, Netezza." },
      { label: "Automation & FinOps",           href: "/solutions/automation-finops",   description: "IBM Apptio, Instana, Turbonomic." },
      { label: "Security & Compliance",         href: "/solutions/security-compliance", description: "Guardium, QRadar, Resilient — data protection and threat detection." },
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

export type Customer = { name: string; url: string; logo?: string; logoOnDark?: string; logoClass?: string };

export const CUSTOMERS: Customer[] = [
  // Lead-in trio (per request)
  { name: "Admed", url: "https://www.admed.com.br", logo: "/logos/admed.svg", logoOnDark: "/logos/white/admed.png" },
  { name: "Great Day Improvements", url: "https://greatdayimprovements.com", logo: "/logos/greatday.png", logoClass: "h-8 md:h-9" },
  { name: "Clip", url: "https://www.clip.mx", logo: "/logos/clip.svg", logoClass: "h-12 md:h-14" },

  // Tier 1 — global blue-chip enterprises (most recognizable F500 / global brands)
  { name: "Adobe", url: "https://www.adobe.com", logo: "/logos/adobe.svg", logoOnDark: "/logos/white/adobe.png", logoClass: "h-14 md:h-16" },
  { name: "Mercedes-Benz", url: "https://www.mercedes-benz.com", logo: "/logos/benz.svg", logoClass: "h-14 md:h-16" },
  { name: "Verizon", url: "https://www.verizon.com", logo: "/logos/verizon.svg", logoOnDark: "/logos/white/verizon.png", logoClass: "h-8 md:h-9" },
  { name: "Snap Inc.", url: "https://www.snap.com", logo: "/logos/snap.svg", logoOnDark: "/logos/white/snap.png", logoClass: "h-12 md:h-14" },
  { name: "Santander", url: "https://www.santander.com", logo: "/logos/santander.svg", logoClass: "h-8 md:h-9" },
  { name: "MetLife", url: "https://www.metlife.com", logo: "/logos/metlife.svg", logoOnDark: "/logos/white/metlife.png", logoClass: "h-7 md:h-8" },
  { name: "Mizuho", url: "https://www.mizuho-financial.com", logo: "/logos/mizuho.svg", logoClass: "h-8 md:h-9" },
  { name: "NatWest", url: "https://www.natwest.com", logo: "/logos/natwest.svg", logoClass: "h-14 md:h-16" },
  { name: "Itaú", url: "https://www.itau.com.br", logo: "/logos/itau.svg", logoClass: "h-16 md:h-20" },
  { name: "Dow", url: "https://www.dow.com", logo: "/logos/dow.svg", logoClass: "h-16 md:h-20" },
  { name: "Fiserv", url: "https://www.fiserv.com", logo: "/logos/fiserv.svg", logoClass: "h-8 md:h-9" },
  { name: "Seagate", url: "https://www.seagate.com", logo: "/logos/seagate.svg", logoClass: "h-8 md:h-9" },
  { name: "Wabtec", url: "https://www.wabteccorp.com", logo: "/logos/wabtec.svg" },
  { name: "Itochu", url: "https://www.itochu.co.jp/en/", logo: "/logos/itochu.svg" },
  { name: "NSK", url: "https://www.nsk.com", logo: "/logos/nsk.svg", logoClass: "h-8 md:h-9" },

  // Tier 2 — top-tier universities and major institutions
  { name: "Harvard University", url: "https://www.harvard.edu", logo: "/logos/harvard.svg", logoOnDark: "/logos/white/harvard.png", logoClass: "h-14 md:h-16" },
  { name: "Penn State", url: "https://www.psu.edu", logo: "/logos/pennstate.svg", logoOnDark: "/logos/white/pennstate.png" },
  { name: "National University of Singapore", url: "https://www.nus.edu.sg", logo: "/logos/nus.svg", logoOnDark: "/logos/white/nus.png", logoClass: "h-10 md:h-12" },
  { name: "Stony Brook University", url: "https://www.stonybrook.edu", logo: "/logos/stonybrook.svg", logoOnDark: "/logos/white/stonybrook.png", logoClass: "h-8 md:h-9" },
  { name: "New York Institute of Technology", url: "https://www.nyit.edu", logo: "/logos/nyit.svg", logoOnDark: "/logos/white/nyit.png" },

  // Tier 3 — strong regional / sector leaders
  { name: "Banorte", url: "https://www.banorte.com", logo: "/logos/banorte.svg", logoClass: "h-6 md:h-7" },
  { name: "Vornado Realty Trust", url: "https://www.vno.com", logo: "/logos/vornado.png", logoClass: "h-8 md:h-9" },
  { name: "Sicoob", url: "https://www.sicoob.com.br", logo: "/logos/sicoob.svg", logoClass: "h-6 md:h-7" },
  { name: "Dah Sing Bank", url: "https://www.dahsing.com", logo: "/logos/dahsing.svg", logoClass: "h-8 md:h-9" },
  { name: "Banco del Pacífico", url: "https://www.bancodelpacifico.com", logo: "/logos/banco-del-pacifico.svg" },
  { name: "BROU", url: "https://www.brou.com.uy", logo: "/logos/brou.svg", logoClass: "h-7 md:h-8" },
  { name: "TEPSCO", url: "https://www.tepsco.co.jp", logo: "/logos/tepsco.svg", logoOnDark: "/logos/white/tepsco.png", logoClass: "h-12 md:h-14" },
  { name: "Netcare", url: "https://www.netcare.co.za", logo: "/logos/netcare.svg", logoOnDark: "/logos/white/netcare.png", logoClass: "h-16 md:h-20" },
  { name: "Children's Health", url: "https://www.childrens.com", logo: "/logos/childrens-health.svg", logoOnDark: "/logos/white/childrens-health.png", logoClass: "h-8 md:h-9" },
];
