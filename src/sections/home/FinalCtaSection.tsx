import { Link } from "react-router-dom";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import CaseStudyCardBackdropCyan from "./_shared/CaseStudyCardBackdropCyan";

/**
 * Section: Home / Final CTA
 * Reuses the Featured Case Study card styling (brand secondary + cyan glow)
 * for visual continuity with the Engineered Field section.
 * Order: 7 of 7 on the Home page.
 */
export const FinalCtaSection = () => (
  <section className="section">
    <SectionMarker page="Home" name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl p-10 md:p-20 text-center">
          <CaseStudyCardBackdropCyan />

          <div className="relative">
            <p className="eyebrow">Ready to talk?</p>
            <h2 className="mt-4 text-4xl md:text-5xl max-w-2xl mx-auto leading-[1.05] text-white">
              Talk to an expert.
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-lg font-light text-white/75">
              30-minute conversation. No sales pass-through, no slide deck. Just
              engineering.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="btn-glow bg-primary text-primary-foreground"
              >
                <Link to="/contact">
                  Start the conversation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default FinalCtaSection;
