import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";

/**
 * Section: Home / Final CTA — "Dark Inversion"
 * Dark slab closer with etched grid + single cyan corner glow + cyan CTA.
 * Order: 7 of 7 on the Home page.
 */
export const FinalCtaSection = () => (
  <section className="section">
    <SectionMarker page="Home" name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-secondary p-10 md:p-20 text-center">
          {/* Etched grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(0 0% 100% / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              WebkitMaskImage:
                "radial-gradient(80% 90% at 50% 50%, black 35%, transparent 90%)",
              maskImage:
                "radial-gradient(80% 90% at 50% 50%, black 35%, transparent 90%)",
            }}
          />
          {/* Cyan corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl"
          />
          {/* Top rim light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          />

          <div className="relative">
            <p className="eyebrow">Ready to talk?</p>
            <h2 className="mt-4 text-4xl md:text-5xl max-w-2xl mx-auto leading-[1.05] text-primary-foreground">
              Talk to a TechD principal.
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-lg font-light text-primary-foreground/70">
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
