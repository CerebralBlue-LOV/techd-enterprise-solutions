import { useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

export const ServiceSpotlightSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const spotlight = extras?.spotlight;
  const [active, setActive] = useState(0);

  if (!spotlight) return null;

  return (
    <section
      id="spotlight"
      className="py-16 md:py-24 scroll-mt-24 bg-background"
    >
      <SectionMarker page={`Services / ${service.name}`} name="Spotlight" />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: editorial copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                {spotlight.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.05] tracking-tight text-secondary">
                {spotlight.title}
              </h2>
              <p className="mt-5 text-base md:text-lg font-light text-muted-foreground leading-relaxed">
                {spotlight.lede}
              </p>

              {spotlight.next?.length ? (
                <ol className="mt-10 space-y-5">
                  {spotlight.next.map((n, i) => (
                    <li key={n.step} className="relative grid grid-cols-[1.5rem_1fr] items-start gap-x-3">
                      <span
                        aria-hidden
                        className="spotlight-num text-[11px] font-bold text-primary tabular-nums leading-[1.25rem]"
                        style={{ transitionDelay: `${i * 150}ms` }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className="spotlight-line absolute left-[6px] top-5 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent"
                        style={{ transitionDelay: `${i * 150 + 220}ms` }}
                      />
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-secondary leading-[1.25rem]">
                          {n.step}
                        </p>
                        <p className="mt-1 text-sm font-light text-muted-foreground leading-relaxed">
                          {n.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}
            </Reveal>
          </div>

          {/* Right: tabbed card */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <article className="group relative min-h-[26rem] overflow-hidden rounded-2xl border border-border bg-background p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.4)]">
                {/* Engineered grid backdrop */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                      "radial-gradient(70% 80% at 70% 30%, black 30%, transparent 85%)",
                    maskImage:
                      "radial-gradient(70% 80% at 70% 30%, black 30%, transparent 85%)",
                  }}
                />
                {/* Ghost numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-2 text-[14rem] font-bold leading-none tracking-tighter text-primary/[0.05] select-none transition-all duration-700 group-hover:text-primary/[0.10] group-hover:-translate-y-2"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                {/* Top hairline reveal */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {/* Static primary top accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-primary/70 transition-all duration-300 group-hover:bg-primary"
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Tab strip — full width, equal columns */}
                  <div className="grid border-b border-border/60" style={{ gridTemplateColumns: `repeat(${spotlight.bullets.length}, 1fr)` }}>
                    {spotlight.bullets.map((b, i) => (
                      <button
                        key={b.label}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className={`pb-3 pt-1 text-center text-sm font-bold uppercase tracking-[0.15em] border-b-2 -mb-px transition-colors duration-200 ${
                          active === i
                            ? "text-primary border-primary"
                            : "text-muted-foreground border-transparent hover:text-secondary hover:border-border"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="mt-8 flex-1">
                    <p
                      key={active}
                      className="text-lg font-normal text-secondary leading-relaxed animate-[fade-up_0.2s_ease-out_both]"
                    >
                      {spotlight.bullets[active].body}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSpotlightSection;
