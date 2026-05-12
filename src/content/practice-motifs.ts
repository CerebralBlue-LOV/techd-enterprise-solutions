import type { MotifVariant } from "@sections/home/_components/PlexusMotif";
import plexusBrain from "@/assets/plexus/plexus-brain.webp";
import plexusDatabase from "@/assets/plexus/plexus-database.webp";
import plexusGears from "@/assets/plexus/plexus-gears.webp";
import plexusShield from "@/assets/plexus/plexus-shield.webp";

export type PracticeMotif = { image: string; alt: string; variant: MotifVariant };

export const PRACTICE_MOTIFS: Record<string, PracticeMotif> = {
  "ai-generative":       { image: plexusBrain,    alt: "Neural plexus brain",    variant: "ai" },
  "data-analytics":      { image: plexusDatabase, alt: "Neural plexus database", variant: "data" },
  "automation-finops":   { image: plexusGears,    alt: "Neural plexus gears",    variant: "automation" },
  "security-compliance": { image: plexusShield,   alt: "Neural plexus shield",   variant: "security" },
};
