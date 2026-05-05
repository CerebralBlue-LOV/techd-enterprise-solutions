import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";

/**
 * Section: Home / Final CTA
 * Purpose: Last-chance conversion block — "Talk to a principal."
 * Order:   7 of 7 on the Home page.
 * Notes:   Centered card on a plain background. Keep copy short and direct;
 *          this is the closer, not a feature explanation.
 */
export const FinalCtaSection = () => (
  <section className="section">
    <SectionMarker page="Home" name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="rounded-2xl border border-border bg-background p-10 md:p-16 text-center">
          <p className="eyebrow">Ready to talk?</p>
          <h2 className="mt-4 text-4xl md:text-5xl max-w-2xl mx-auto leading-[1.05]">
            Talk to a TechD principal.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-lg font-light text-muted-foreground">
            30-minute conversation. No sales pass-through, no slide deck. Just
            engineering.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Link to="/contact">
                Start the conversation <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default FinalCtaSection;
