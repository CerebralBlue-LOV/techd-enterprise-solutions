import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import ParticleOrbit from "./_components/ParticleOrbit";
import { IBMPlatinumBadge } from "@shared/IBMPlatinumBadge";

export const WhyTechDSection = () => (
  <section className="section bg-muted/40">
    <SectionMarker page="Home" name="Why TechD" />
    <div className="container-page">
      {/* Heading above both columns */}
      <Reveal>
        <div className="relative z-20">
          <SectionHeading
            align="center"
            eyebrow="Why TechD"
            title="A different kind of partner."
            className="lg:mx-0 lg:text-left"
          />
        </div>
      </Reveal>

      <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 md:mt-12">
        {/* LEFT — orbit + IBM credential */}
        <Reveal delay={80}>
          <div className="relative flex aspect-square w-full max-w-[460px] mx-auto lg:mx-0 items-center justify-center">
            <ParticleOrbit />
            <IBMPlatinumBadge size="lg" variant="card" showTenure className="relative z-20" />
          </div>
        </Reveal>

        {/* RIGHT — prose description */}
        <div className="flex flex-col gap-6">
          <Reveal delay={120}>
            <p className="text-lg font-light leading-relaxed text-secondary">
              We're not a staffing shop.{" "}
              <span className="font-normal text-foreground">
                Principals deliver
              </span>{" "}
              — senior certified architects and engineers on every engagement,
              not juniors handed off after the sale.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="text-lg font-light leading-relaxed text-secondary">
              Fifteen years building{" "}
              <span className="font-normal text-foreground">
                auditable AI, governed data platforms,
              </span>{" "}
              and defensible architecture for the organizations that can't
              afford to get it wrong — regulated industries, Fortune 500,
              federal.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-lg font-light leading-relaxed text-secondary">
              IBM-deep and{" "}
              <span className="font-normal text-foreground">
                multi-cloud fluent
              </span>{" "}
              — watsonx, Db2, OpenShift, and Z, plus AWS, Azure, and GCP at
              enterprise scale. We commit to{" "}
              <span className="font-normal text-primary">
                outcomes, not hours.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default WhyTechDSection;
