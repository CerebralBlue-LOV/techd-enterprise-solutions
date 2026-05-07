import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";
import FlipCard from "@/sections/flip-lab/FlipCard";
import PlexusMotif, { type MotifVariant } from "@/sections/flip-lab/PlexusMotif";
import plexusBrain from "@/assets/flip-lab/plexus-brain.webp";
import plexusDatabase from "@/assets/flip-lab/plexus-database.webp";
import plexusGears from "@/assets/flip-lab/plexus-gears.webp";
import plexusShield from "@/assets/flip-lab/plexus-shield.webp";
import plexusCloud from "@/assets/flip-lab/plexus-cloud.webp";

const MOTIFS: Record<string, { image: string; alt: string; backTitle: string; footer: string; variant: MotifVariant }> = {
  "ai-generative": { image: plexusBrain, alt: "Neural plexus brain", backTitle: "Production-grade AI", footer: "United States", variant: "ai" },
  "data-analytics": { image: plexusDatabase, alt: "Neural plexus database", backTitle: "Data foundations", footer: "United States", variant: "data" },
  "automation-finops": { image: plexusGears, alt: "Neural plexus gears", backTitle: "Run smarter", footer: "Global", variant: "automation" },
  "security-compliance": { image: plexusShield, alt: "Neural plexus shield", backTitle: "Defense in depth", footer: "Regulated industries", variant: "security" },
  "hybrid-cloud": { image: plexusCloud, alt: "Neural plexus cloud", backTitle: "Anywhere, governed", footer: "United States", variant: "cloud" },
};

/**
 * Section: Home / Solutions Grid
 * Five practice flip cards using the plexus neural-node motif system.
 */
export const SolutionsGridSection = () => (
  <section className="section">
    <SectionMarker page="Home" name="Solutions Grid" />
    <div className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Solutions"
          title="Five practices. One outcome: leverage."
          subtitle="Each practice is led by senior IBM-certified practitioners with a decade-plus of enterprise delivery on watsonx, Db2, OpenShift, and the modern data stack."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => {
          const m = MOTIFS[s.id];
          if (!m) return null;
          return (
            <Reveal key={s.id} delay={i * 50}>
              <FlipCard
                to={`/solutions/${s.id}`}
                eyebrow={s.name}
                title={s.outcome}
                footer={m.footer}
                backTitle={m.backTitle}
                backBody={s.pitch}
                chips={s.products.slice(0, 5).map((p) => p.name)}
                ctaLabel={s.ctaLabel}
                motif={<PlexusMotif image={m.image} alt={m.alt} variant={m.variant} />}
              />
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
