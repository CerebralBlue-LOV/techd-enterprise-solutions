import { Suspense, lazy } from "react";

import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import SectionBackdrop from "@shared/SectionBackdrop";
import CaseStudyCardBackdropCyan from "@sections/home/_shared/CaseStudyCardBackdropCyan";
import IndustriesCarousel from "@sections/home/_shared/IndustriesCarousel";

const ParticleGlobe = lazy(
  () => import("@sections/home/_shared/ParticleGlobe"),
);

/**
 * Section: Home / Engineered Field (Industries + Featured Case Study)
 * Purpose: Two visually-stitched sub-sections sharing one continuous backdrop
 *          (subtle SectionBackdrop + lazy 3D ParticleGlobe).
 * Order:   4–5 of 7 on the Home page.
 * Notes:   This is intentionally one component (not two) because the shared
 *          backdrop must span both — splitting them would either duplicate the
 *          globe canvas or create a visible seam.
 */
export const EngineeredFieldSection = () => (
  <div className="relative overflow-hidden">
    <SectionBackdrop intensity="soft" vignettes={false} />
    <Suspense fallback={null}>
      <ParticleGlobe />
    </Suspense>

    {/* Sub-section: Industries grid — six regulated sectors. */}
    <section className="section relative z-10">
      <SectionMarker page="Home" name="Industries Grid" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Industries"
            title="Built for regulated, complex enterprises."
          />
        </Reveal>
        <Reveal>
          <div className="mt-14">
            <IndustriesCarousel />
          </div>
        </Reveal>
      </div>
    </section>

    {/* Sub-section: Featured case study — IBM-published, dark card. */}
    <section className="section relative z-10">
      <SectionMarker page="Home" name="Featured Case Study" />
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border ring-1 ring-white/[0.06] text-white p-10 md:p-16">
            <CaseStudyCardBackdropCyan />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Featured Case · Published by IBM
            </p>
            <h2 className="relative mt-4 max-w-3xl text-4xl md:text-5xl text-white leading-[1.05]">
              A US family-owned retailer rebuilt online shopping on IBM Db2,
              watsonx Assistant, and NeuralSeek.
            </h2>
            <div className="relative mt-10 grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-primary">
                  Personalization
                </div>
                <p className="mt-3 text-base font-light text-white/80">
                  Personalized product descriptions delivered through
                  retrieval-augmented generation.
                </p>
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-primary">
                  Service efficiency
                </div>
                <p className="mt-3 text-base font-light text-white/80">
                  Call-center efficiency gains and reduced customer frustration.
                </p>
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-primary">
                  Shopper insight
                </div>
                <p className="mt-3 text-base font-light text-white/80">
                  Real-time insight into shopper behavior across virtual and
                  in-store channels.
                </p>
              </div>
            </div>
            <p className="relative mt-10 max-w-3xl text-sm font-light text-white/60">
              Co-authored by Scott Nichols, Senior Developer Analyst at TechD,
              and Garrett Rowe, President of Cerebral Blue.
            </p>
            <div className="relative mt-8">
              <Button
                asChild
                className="group relative overflow-hidden bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_50px_-10px_hsl(var(--primary)/0.75)]"
              >
                <a
                  href="https://www.ibm.com/case-studies/blog/ibm-and-techd-partner-to-securely-share-data-and-power-insights-with-gen-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">Read on IBM.com</span>
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);

export default EngineeredFieldSection;
