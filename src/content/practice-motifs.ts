import type { MotifVariant } from "@sections/home/_components/PlexusMotif";

export type PracticeMotif = { variant: MotifVariant };

export const PRACTICE_MOTIFS: Record<string, PracticeMotif> = {
  "ai-generative":       { variant: "ai" },
  "data-analytics":      { variant: "data" },
  "automation-finops":   { variant: "automation" },
  "security-compliance": { variant: "security" },
  "infrastructure":      { variant: "cloud" },
};
