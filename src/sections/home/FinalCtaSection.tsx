import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import CaseStudyCardBackdrop from "./_shared/CaseStudyCardBackdrop";

/**
 * Section: Home / Final CTA
 * Reuses the Featured Case Study card styling (teal→navy gradient + starfield
 * + cyan rim light) for visual continuity with the Engineered Field section.
 * Order: 7 of 7 on the Home page.
 */
export const FinalCtaSection = () => (
  <section className="section">
    <SectionMarker page="Home" name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl p-10 md:p-20 text-center">
          <CaseStudyCardBackdrop />

          <div className="relative">
            <p className="eyebrow">Ready to talk?</p>
            <h2 className="mt-4 text-4xl md:text-5xl max-w-2xl mx-auto leading-[1.05] text-primary-foreground">
              Talk to a TechD principal.
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-lg font-light text-primary-foreground/75">
              30-minute conversation. No sales pass-through, no slide deck. Just
              engineering.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)]"
              >
                <Link to="/contact">
                  Start the conversation <ArrowRight />
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
