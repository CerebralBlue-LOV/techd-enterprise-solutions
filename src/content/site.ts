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
      { label: "AI & Automation", href: "/solutions#ai-automation", description: "Agentic AI, intelligent automation, and ML at scale." },
      { label: "Data Solutions", href: "/solutions#data", description: "Modern data platforms, governance, and analytics." },
      { label: "Security", href: "/solutions#security", description: "Zero-trust, identity, and threat management." },
      { label: "Cloud & Infrastructure", href: "/solutions#cloud", description: "Hybrid cloud architecture and resilient infrastructure." },
      { label: "Application Modernization", href: "/solutions#app-mod", description: "Replatform legacy systems for the AI era." },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Healthcare", href: "/industries#healthcare" },
      { label: "Financial Services", href: "/industries#financial" },
      { label: "Insurance", href: "/industries#insurance" },
      { label: "Energy", href: "/industries#energy" },
      { label: "Higher Education", href: "/industries#education" },
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
  "Comcast",
  "Sony",
  "Princeton University",
  "Johns Hopkins",
];
