import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Offerings — engagement catalog list.
 *
 * Vertical list inside a single rounded card. Each row: name (left),
 * duration chip (mid), summary (right). Hairline dividers, hover row
 * gains a left primary cyan rule + 2px content shift.
 */
export const ServiceOfferingsSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.engagements?.length) return null;

  return (
    <section id="offerings" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Offerings" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Engagements"
            title="What you can buy"
            subtitle="Named, scoped offerings — each with a defined output and a start date. Scan the duration column to find the fit."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-background">
            {/* Column header — typography only */}
            <div className="hidden md:grid md:grid-cols-12 gap-6 border-b border-border bg-muted/40 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              <div className="md:col-span-4">Engagement</div>
              <div className="md:col-span-2">Duration</div>
              <div className="md:col-span-6">What you get</div>
            </div>

            <ul className="divide-y divide-border">
              {extras.engagements.map((e) => (
                <li
                  key={e.name}
                  className="group relative grid grid-cols-1 gap-3 px-6 py-6 md:grid-cols-12 md:gap-6 md:py-7 transition-colors duration-200 hover:bg-primary/[0.025]"
                >
                  {/* Left primary rail on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100"
                  />
                  <div className="md:col-span-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                    <h3 className="text-base md:text-lg font-bold text-secondary leading-tight">
                      {e.name}
                    </h3>
                  </div>
                  <div className="md:col-span-2">
                    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      {e.duration}
                    </span>
                  </div>
                  <p className="md:col-span-6 text-sm font-light text-muted-foreground leading-relaxed">
                    {e.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceOfferingsSection;
