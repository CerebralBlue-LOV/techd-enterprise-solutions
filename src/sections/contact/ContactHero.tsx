import { Suspense, lazy } from "react";
import HeroBackdrop from "@sections/home/_components/HeroBackdrop";
import SectionMarker from "@shared/SectionMarker";
import Reveal from "@shared/Reveal";

const HeroParticleField = lazy(
  () => import("@sections/home/_components/HeroParticleField"),
);

const ContactHero = () => (
  <section className="relative overflow-hidden border-b border-border">
    <SectionMarker page="Contact" name="Hero" />
    <HeroBackdrop />
    <Suspense fallback={null}>
      <HeroParticleField />
    </Suspense>
    <div className="container-page relative pt-24 pb-20 md:pt-32 md:pb-24">
      <Reveal>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-secondary">
            Talk to an <span className="text-primary">expert</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
            No SDR queue. No discovery-call routing. Tell us what you're trying to ship and we'll match you with the right senior practitioner — usually within one business day.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ContactHero;
