import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";

interface Props {
  industry: Industry;
}

export const IndustryCtaSection = ({ industry }: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={`Industries / ${industry.name}`} name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="rounded-2xl border border-border bg-background p-10 md:p-14 text-center">
          <p className="eyebrow mb-3">Ready when you are</p>
          <h2 className="text-3xl md:text-4xl leading-[1.1] max-w-3xl mx-auto">
            Talk to a team that's shipped in {industry.name}.
          </h2>
          <p className="mt-5 text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto">
            Tell us where you are — we'll bring senior IBM-certified architects who know
            your regulatory posture to the first call.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="btn-glow">
              <Link to="/contact">
                Talk to an expert <ArrowRight className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default IndustryCtaSection;
