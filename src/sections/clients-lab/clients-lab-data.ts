/**
 * Marc's 13-client list for the home-page logo strip.
 * Used only by /clients-lab (internal sizing tool).
 *
 * `logo` is the path the live site will reference (under /images/partners/).
 * `currentLogo` is where the file actually lives RIGHT NOW so the lab can
 * render it. Seven of these are still in deprecated/ and need to be moved
 * before pasting the generated snippet into src/content/site.ts.
 */
export type LabClient = {
  name: string;
  url: string;
  /** Target path that will go into site.ts CUSTOMERS */
  logo: string;
  /** Where the file actually lives now (may equal `logo`) */
  currentLogo?: string;
  /** True when we don't yet have a real logo file */
  placeholder?: boolean;
  /** Default Tailwind height class (h-6 .. h-20). Mobile size. */
  defaultHeight: HeightToken;
};

export const HEIGHT_TOKENS = [
  "h-6",
  "h-7",
  "h-8",
  "h-9",
  "h-10",
  "h-12",
  "h-14",
  "h-16",
  "h-20",
] as const;
export type HeightToken = (typeof HEIGHT_TOKENS)[number];

/** Mobile -> desktop bump used in site.ts (e.g. h-8 md:h-9, h-12 md:h-14). */
const DESKTOP_BUMP: Record<HeightToken, HeightToken> = {
  "h-6": "h-7",
  "h-7": "h-8",
  "h-8": "h-9",
  "h-9": "h-10",
  "h-10": "h-12",
  "h-12": "h-14",
  "h-14": "h-16",
  "h-16": "h-20",
  "h-20": "h-20",
};

export const toLogoClass = (h: HeightToken) =>
  `${h} md:${DESKTOP_BUMP[h]}`;

export const MARC_CLIENTS: LabClient[] = [
  {
    name: "Hamilton Beach",
    url: "https://hamiltonbeach.com",
    logo: "/images/partners/hamilton-beach.png",
    currentLogo: "/images/partners/hamilton-beach.png",
    defaultHeight: "h-10",
  },
  {
    name: "Seagate",
    url: "https://www.seagate.com",
    logo: "/images/partners/seagate.svg",
    currentLogo: "/images/partners/seagate.svg",
    defaultHeight: "h-8",
  },
  {
    name: "Concord Music",
    url: "https://concord.com",
    logo: "/images/partners/concord-music.png",
    currentLogo: "/images/partners/concord-music.png",
    defaultHeight: "h-10",
  },
  {
    name: "State of Delaware",
    url: "https://delaware.gov",
    logo: "/images/partners/state-of-delaware.png",
    currentLogo: "/images/partners/state-of-delaware.png",
    defaultHeight: "h-12",
  },
  {
    name: "FIA Tech",
    url: "https://fia-tech.com",
    logo: "/images/partners/fia-tech.jpg",
    currentLogo: "/images/partners/fia-tech.jpg",
    defaultHeight: "h-8",
  },
  {
    name: "L3Harris",
    url: "https://www.l3harris.com",
    logo: "/images/partners/l3harris.png",
    currentLogo: "/images/deprecated/partners-deprecated/l3harris.png",
    defaultHeight: "h-8",
  },
  {
    name: "MISO",
    url: "https://www.misoenergy.org",
    logo: "/images/partners/miso-energy.png",
    currentLogo: "/images/deprecated/partners-deprecated/miso-energy.png",
    defaultHeight: "h-10",
  },
  {
    name: "Noresco",
    url: "https://www.noresco.com",
    logo: "/images/partners/noresco.png",
    currentLogo: "/images/partners/noresco.png",
    defaultHeight: "h-8",
  },
  {
    name: "Wabtec",
    url: "https://www.wabteccorp.com",
    logo: "/images/partners/wabtec.webp",
    currentLogo: "/images/partners/wabtec.webp",
    defaultHeight: "h-10",
  },
  {
    name: "Dominion Energy",
    url: "https://www.dominionenergy.com",
    logo: "/images/partners/dominion-energy.png",
    currentLogo: "/images/deprecated/partners-deprecated/dominion-energy.png",
    defaultHeight: "h-10",
  },
  {
    name: "Memorial Sloan Kettering",
    url: "https://www.mskcc.org",
    logo: "/images/partners/msk.png",
    currentLogo: "/images/partners/msk.png",
    defaultHeight: "h-10",
  },
  {
    name: "Thomas Jefferson University Hospital",
    url: "https://www.jeffersonhealth.org",
    logo: "/images/partners/jefferson-health.png",
    currentLogo: "/images/deprecated/partners-deprecated/jefferson-health.png",
    defaultHeight: "h-10",
  },
  {
    name: "Sony Pictures",
    url: "https://www.sonypictures.com",
    logo: "/images/partners/sony-pictures.png",
    currentLogo: "/images/partners/sony-pictures.png",
    defaultHeight: "h-10",
  },
];
