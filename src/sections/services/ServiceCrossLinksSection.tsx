import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Cross-links
 *
 * Lightweight tiles linking to the other three /services and to the
 * /solutions practices most relevant to this service. Replaces the
 * heavy "Practices" FlipCard repeat that duplicated /solutions content.
 */
export const ServiceCrossLinksSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const links = extras?.crossLinks ?? [];
  if (!links.length) return null;

  return (
    <section id="related" className="section scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Related" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Where this fits"
            title="Adjacent services and practices"
            subtitle="Most engagements span more than one service. These are the most common adjacencies."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => {
            const to =
              l.kind === "service" ? `/services/${l.id}` : `/solutions/${l.id}`;
            const kindLabel = l.kind === "service" ? "Service" : "Practice";
            return (
              <Reveal key={`${l.kind}-${l.id}`} delay={i * 50}>
                <li>
                  <Link
                    to={to}
                    className="group block h-full rounded-xl border border-border bg-background p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_12px_32px_-16px_hsl(var(--primary)/0.4)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                        {kindLabel}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-secondary leading-tight">
                      {l.label}
                    </h3>
                    <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                      {l.blurb}
                    </p>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServiceCrossLinksSection;
