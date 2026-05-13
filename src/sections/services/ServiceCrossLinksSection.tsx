import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkSection from "@shared/DarkSection";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Cross-links — DARK compact rail.
 *
 * Sits between the light Coverage section and the dark CTA. Uses the
 * "soft" DarkSection variant so the two dark beats read as a sequence,
 * not a monolith.
 */
export const ServiceCrossLinksSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const links = extras?.crossLinks ?? [];
  if (!links.length) return null;

  return (
    <DarkSection id="related" intensity="soft" className="py-14 md:py-20 scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Related" />
      <div className="container-page">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Where this fits
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-background">
              Adjacent services and practices
            </h2>
            <p className="mt-4 text-base md:text-lg font-light text-background/75 leading-relaxed">
              Most engagements span more than one service. These are the most common adjacencies.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => {
            const to = l.kind === "service" ? `/services/${l.id}` : `/solutions/${l.id}`;
            const kindLabel = l.kind === "service" ? "Service" : "Practice";
            return (
              <Reveal key={`${l.kind}-${l.id}`} delay={i * 50}>
                <li>
                  <Link
                    to={to}
                    className="group relative block h-full overflow-hidden rounded-xl border border-white/10 bg-background/[0.04] backdrop-blur-sm p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/60 hover:bg-background/[0.07] hover:shadow-[0_12px_32px_-16px_hsl(var(--primary)/0.5)]"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                        {kindLabel}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-background/60 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-background leading-tight">
                      {l.label}
                    </h3>
                    <p className="mt-2 text-sm font-light text-background/70 leading-relaxed">
                      {l.blurb}
                    </p>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </DarkSection>
  );
};

export default ServiceCrossLinksSection;
