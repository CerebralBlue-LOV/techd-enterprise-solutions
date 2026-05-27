/**
 * Marc's 13-client list for the home-page logo strip.
 * Used only by /clients-lab (internal sizing tool).
 *
 * Asset structure:
 *   public/images/clients/light/  ← source-of-truth color logos
 *   public/images/clients/dark/   ← generated white-on-transparent variants
 *     (regenerate via: python scripts/generate-white-logos.py
 *        --src public/images/clients/light --out public/images/clients/dark --all)
 */
export type LabClient = {
  name: string;
  url: string;
  /** Path that will eventually go into site.ts CUSTOMERS (light variant) */
  logo: string;
  /** Where the light logo file lives now */
  currentLogo?: string;
  /** Where the dark (white) variant lives, if generated */
  currentLogoDark?: string;
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

const L = (file: string) => `/images/clients/light/${file}`;
const D = (stem: string) => `/images/clients/dark/${stem}.png`;

export const MARC_CLIENTS: LabClient[] = [
  {
    name: "Hamilton Beach",
    url: "https://hamiltonbeach.com",
    logo: L("hamilton-beach.png"),
    currentLogo: L("hamilton-beach.png"),
    currentLogoDark: D("hamilton-beach"),
    defaultHeight: "h-9",
  },
  {
    name: "Seagate",
    url: "https://www.seagate.com",
    logo: L("seagate.svg"),
    currentLogo: L("seagate.svg"),
    currentLogoDark: D("seagate"),
    defaultHeight: "h-10",
  },
  {
    name: "Concord Music",
    url: "https://concord.com",
    logo: L("concord-music.png"),
    currentLogo: L("concord-music.png"),
    currentLogoDark: D("concord-music"),
    defaultHeight: "h-16",
  },
  {
    name: "State of Delaware",
    url: "https://delaware.gov",
    logo: L("state-of-delaware.png"),
    currentLogo: L("state-of-delaware.png"),
    currentLogoDark: D("state-of-delaware"),
    defaultHeight: "h-16",
  },
  {
    name: "FIA Tech",
    url: "https://fia-tech.com",
    logo: L("fia-tech.jpg"),
    currentLogo: L("fia-tech.jpg"),
    currentLogoDark: D("fia-tech"),
    defaultHeight: "h-10",
  },
  {
    name: "L3Harris",
    url: "https://www.l3harris.com",
    logo: L("l3harris.png"),
    currentLogo: L("l3harris.png"),
    currentLogoDark: D("l3harris"),
    defaultHeight: "h-10",
  },
  {
    name: "MISO",
    url: "https://www.misoenergy.org",
    logo: L("miso-energy.png"),
    currentLogo: L("miso-energy.png"),
    currentLogoDark: D("miso-energy"),
    defaultHeight: "h-12",
  },
  {
    name: "Noresco",
    url: "https://www.noresco.com",
    logo: L("noresco.png"),
    currentLogo: L("noresco.png"),
    currentLogoDark: D("noresco"),
    defaultHeight: "h-9",
  },
  {
    name: "Wabtec",
    url: "https://www.wabteccorp.com",
    logo: L("wabtec.webp"),
    currentLogo: L("wabtec.webp"),
    currentLogoDark: D("wabtec"),
    defaultHeight: "h-12",
  },
  {
    name: "Dominion Energy",
    url: "https://www.dominionenergy.com",
    logo: L("dominion-energy.png"),
    currentLogo: L("dominion-energy.png"),
    currentLogoDark: D("dominion-energy"),
    defaultHeight: "h-12",
  },
  {
    name: "Memorial Sloan Kettering",
    url: "https://www.mskcc.org",
    logo: L("msk.png"),
    currentLogo: L("msk.png"),
    currentLogoDark: D("msk"),
    defaultHeight: "h-10",
  },
  {
    name: "Thomas Jefferson University Hospital",
    url: "https://www.jeffersonhealth.org",
    logo: L("jefferson-health.png"),
    currentLogo: L("jefferson-health.png"),
    currentLogoDark: D("jefferson-health"),
    defaultHeight: "h-10",
  },
  {
    name: "Sony Pictures",
    url: "https://www.sonypictures.com",
    logo: L("sony-pictures.png"),
    currentLogo: L("sony-pictures.png"),
    currentLogoDark: D("sony-pictures"),
    defaultHeight: "h-16",
  },
];
