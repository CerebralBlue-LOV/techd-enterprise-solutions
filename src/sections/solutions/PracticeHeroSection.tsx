import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import GeometricAccent from "@shared/GeometricAccent";
import PlexusMotif from "@/sections/flip-lab/PlexusMotif";
import { type Solution } from "@content/solutions";
import { PRACTICE_MOTIFS } from "@content/practice-motifs";

interface Props {
  practice: Solution;
}

/**
 * Section: Practice Hero
 * H1 = practice.outcome (buyer promise). Practice name lives in the eyebrow.
 * Right column shows the same plexus motif used on the home grid card.
 */
export const PracticeHeroSection = ({ practice }: Props) => {
  const motif = PRACTICE_MOTIFS[practice.id];
  return (
    <section className="relative overflow-hidden">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Hero" />
      <GeometricAccent />
      <div className="container-page relative pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-3">Solutions · {practice.name}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {practice.outcome}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
              {practice.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="btn-glow">
                <Link to="/contact">
                  Talk to an expert <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="#products">See products</a>
              </Button>
            </div>
          </Reveal>
          {motif && (
            <Reveal delay={120}>
              <div className="relative aspect-square w-full max-w-md mx-auto">
                <PlexusMotif image={motif.image} alt={motif.alt} variant={motif.variant} />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default PracticeHeroSection;
