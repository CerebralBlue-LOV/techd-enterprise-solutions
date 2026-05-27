/**
 * Clients Lab is a sizing-only sandbox. It reads from the live CUSTOMERS array
 * in src/content/site.ts and never adds or removes clients — the Copy button
 * emits size-only diffs (logoClass changes) that paste over the existing rows.
 */
import { CUSTOMERS, type Customer } from "@content/site";

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

export const toLogoClass = (h: HeightToken) => `${h} md:${DESKTOP_BUMP[h]}`;

/** Tile descriptor — one per live CUSTOMERS row. */
export type LabClient = {
  name: string;
  url: string;
  logo: string;
  /** Verbatim logoClass currently in site.ts (e.g. "h-10 md:h-12"); undefined when row has no logoClass. */
  currentClass?: string;
  /** Mobile token parsed from currentClass; defaults to h-10 when missing/unparseable. */
  currentHeight: HeightToken;
};

const DEFAULT_HEIGHT: HeightToken = "h-10";

/** Parse "h-10 md:h-12" → "h-10". Returns DEFAULT_HEIGHT for missing/unknown values. */
const parseMobileHeight = (logoClass?: string): HeightToken => {
  if (!logoClass) return DEFAULT_HEIGHT;
  const token = logoClass.trim().split(/\s+/)[0];
  return (HEIGHT_TOKENS as readonly string[]).includes(token)
    ? (token as HeightToken)
    : DEFAULT_HEIGHT;
};

/** Build the lab tile list from the live CUSTOMERS array. Only entries with a logo render. */
export const getLabClients = (): LabClient[] =>
  CUSTOMERS.filter((c: Customer) => !!c.logo).map((c) => ({
    name: c.name,
    url: c.url,
    logo: c.logo as string,
    currentClass: c.logoClass,
    currentHeight: parseMobileHeight(c.logoClass),
  }));
