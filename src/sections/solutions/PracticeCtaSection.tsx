import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

export const PracticeCtaSection = ({ practice }: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="rounded-2xl border border-border bg-background p-10 md:p-14 text-center">
          <p className="eyebrow mb-3">Ready when you are</p>
          <h2 className="text-3xl md:text-4xl leading-[1.1] max-w-3xl mx-auto">
            {practice.outcome}
          </h2>
          <p className="mt-5 text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto">
            Tell us where you are with {practice.name.toLowerCase()} — we'll bring senior IBM-certified
            architects to the first call.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-glow">
              <Link to="/contact">
                Talk to an expert <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#products">Browse products</a>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PracticeCtaSection;
