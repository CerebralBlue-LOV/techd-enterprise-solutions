import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import HeroBackdrop from "@sections/home/_components/HeroBackdrop";

const HeroParticleField = lazy(
  () => import("@sections/home/_components/HeroParticleField"),
);

/**
 * Section: Home / Hero
 * Purpose: Above-the-fold value proposition + primary CTA.
 * Order:   1 of 7 on the Home page.
 * Notes:   Three layers — HeroBackdrop (gradient/grid), lazy-loaded
 *          HeroParticleField (3D), and the headline/CTA stack.
 *          Keep min-h-[88vh] so the hero dominates first paint.
 */
export const HeroSection = () => (
  <section className="relative overflow-hidden min-h-[88vh] flex items-center">
    <SectionMarker page="Home" name="Hero" />
    <HeroBackdrop />
    <Suspense fallback={null}>
      <HeroParticleField />
    </Suspense>

    <div className="container-page relative z-10 pt-32 pb-32 md:pt-40 md:pb-40">
      <Reveal>
        <div className="max-w-3xl">
          <p className="eyebrow">IBM Platinum Business Partner · Since 2009</p>
          <h1 className="mt-4 text-6xl md:text-8xl leading-[1.02] font-bold tracking-tight">
            Turn enterprise data into
            <br />
            <span className="text-primary">trustworthy AI.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl md:text-2xl font-light text-muted-foreground">
            We design, build, and run secure AI, data, and hybrid cloud systems
            for Fortune 500 healthcare, media, energy, and public sector
            organizations — on IBM watsonx, Db2, and the open stack around them.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="btn-glow">
              <Link to="/contact">Talk to an expert</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/solutions">See our solutions</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default HeroSection;
