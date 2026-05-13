import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Spotlight
 *
 * Per-service flagship block sitting between Why TechD and Offerings.
 * Names a single concrete differentiator (Platform Assessment for Advisory,
 * "We build what we design" for Implementation, outcome SLAs for Managed,
 * three role-based tracks for Training).
 */
export const ServiceSpotlightSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const spotlight = extras?.spotlight;
  if (!spotlight) return null;

  return (
    <section
      id="spotlight"
      className="py-14 md:py-20 scroll-mt-24 border-t border-border bg-background"
    >
      <SectionMarker page={`Services / ${service.name}`} name="Spotlight" />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                {spotlight.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-secondary">
                {spotlight.title}
              </h2>
              <p className="mt-5 text-base md:text-lg font-light text-muted-foreground leading-relaxed">
                {spotlight.lede}
              </p>

              {spotlight.next?.length ? (
                <ol className="mt-8 space-y-3">
                  {spotlight.next.map((n, i) => (
                    <li key={n.step} className="flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-xs font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-secondary">{n.step}</p>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed">
                          {n.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {spotlight.bullets.map((b, i) => (
                <Reveal key={b.label} delay={i * 60}>
                  <li className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_hsl(var(--primary)/0.35)]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-primary/70 transition-all duration-300 group-hover:bg-primary"
                    />
                    <h3 className="mt-2 text-primary text-xs font-bold uppercase tracking-widest">
                      {b.label}
                    </h3>
                    <p className="mt-3 text-sm font-light text-secondary leading-relaxed">
                      {b.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSpotlightSection;
