import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkSection from "@shared/DarkSection";
import { type Industry } from "@content/industries";
import { SERVICES } from "@content/services";

interface Props {
  industry: Industry;
}

const serviceHref = (id: string) =>
  id === "managed" ? "/services/managed-services" : `/services/${id}`;

export const IndustryCrossLinksSection = ({ industry }: Props) => (
  <DarkSection id="services" intensity="soft" className="py-14 md:py-20 scroll-mt-24">
    <SectionMarker page={`Industries / ${industry.name}`} name="Services" />
    <div className="container-page">
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
            How we engage
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-background">
            Four services, one team
          </h2>
          <p className="mt-4 text-base md:text-lg font-light text-background/75 leading-relaxed">
            Every engagement runs through the same senior IBM-certified practitioners — from strategy through operations.
          </p>
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delay={i * 50} className="h-full">
            <li className="h-full">
              <Link
                to={serviceHref(service.id)}
                className="group relative block h-full overflow-hidden rounded-xl border border-white/10 bg-background/[0.04] backdrop-blur-sm p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/60 hover:bg-background/[0.07] hover:shadow-[0_12px_32px_-16px_hsl(var(--primary)/0.5)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    Service
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-background/60 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <h3 className="mt-3 text-lg font-bold text-background leading-tight">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm font-light text-background/70 leading-relaxed">
                  {service.description}
                </p>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  </DarkSection>
);

export default IndustryCrossLinksSection;
