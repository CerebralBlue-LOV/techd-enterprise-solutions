import { Suspense, lazy } from "react";
import HeroBackdrop from "@sections/home/_components/HeroBackdrop";
import SectionMarker from "@shared/SectionMarker";
import Reveal from "@shared/Reveal";
import HeroFigureFallback from "@shared/heroFigures/HeroFigureFallback";

const HeroParticleField = lazy(
  () => import("@sections/home/_components/HeroParticleField"),
);

const ContactHero = () => (
  <section id="hero" className="relative overflow-hidden border-b border-border scroll-mt-24">
    <SectionMarker page="Contact" name="Hero" />
    <HeroBackdrop />
    <Suspense fallback={<HeroFigureFallback />}>
      <HeroParticleField />
    </Suspense>
    <div className="container-page relative pt-24 pb-20 md:pt-32 md:pb-24">
      <Reveal>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-secondary">
            Talk to an IBM <span className="text-primary">practitioner</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
            Tell us what you're trying to ship with watsonx, Cognos, Guardium, or Apptio — we'll route you to the certified engineer who's done it before. Typical reply within one business day.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ContactHero;
