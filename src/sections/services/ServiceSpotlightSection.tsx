import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Spotlight — editorial split.
 *
 * Left: eyebrow + headline + lede + numbered "what happens next" rail.
 * Right: oversized hero artifact card promoting the deliverable bullet
 *        (engineered grid backdrop + ghost numeral).
 * Below: 3-up hairline-separated typography strip with the remaining
 *        bullets — pure type, no boxes.
 */
export const ServiceSpotlightSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const spotlight = extras?.spotlight;
  if (!spotlight) return null;

  // Promote the bullet whose label leads with "What we deliver" /
  // "Same team" / "Pipeline" / "Executive Briefings" — the
  // editorially loudest one. Falls back to the first bullet.
  const HERO_PRIORITIES = [
    /deliver/i,
    /same team/i,
    /pipeline/i,
    /executive/i,
  ];
  const heroIndex = (() => {
    for (const re of HERO_PRIORITIES) {
      const i = spotlight.bullets.findIndex((b) => re.test(b.label));
      if (i >= 0) return i;
    }
    return 0;
  })();
  const hero = spotlight.bullets[heroIndex];
  const rest = spotlight.bullets.filter((_, i) => i !== heroIndex);

  return (
    <section
      id="spotlight"
      className="py-16 md:py-24 scroll-mt-24 border-t border-border bg-background"
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
                <ol className="mt-10 space-y-5 border-l border-border pl-6">
                  {spotlight.next.map((n, i) => (
                    <li key={n.step} className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-[31px] top-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background text-[10px] font-bold text-primary"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-bold uppercase tracking-wider text-secondary">
                        {n.step}
                      </p>
                      <p className="mt-1 text-sm font-light text-muted-foreground leading-relaxed">
                        {n.body}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : null}
            </Reveal>
          </div>

          {/* Right: oversized hero artifact card */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <article className="group relative h-full min-h-[24rem] overflow-hidden rounded-2xl border border-border bg-background p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.4)]">
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
                {/* Cyan blob */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl transition-opacity duration-700 group-hover:bg-primary/20"
                />
                {/* Ghost numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-2 text-[14rem] font-bold leading-none tracking-tighter text-primary/[0.05] select-none transition-all duration-700 group-hover:text-primary/[0.10] group-hover:-translate-y-2"
                >
                  01
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

                <div className="relative z-10 flex h-full flex-col">
                  <p className="mt-2 text-primary text-xs font-bold uppercase tracking-[0.25em]">
                    {hero.label}
                  </p>
                  <p className="mt-6 text-2xl md:text-3xl font-bold leading-tight tracking-tight text-secondary">
                    {hero.body}
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>

        {/* Hairline-separated typography strip — remaining bullets */}
        {rest.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <ul className="grid gap-x-10 gap-y-8 md:grid-cols-3">
              {rest.map((b, i) => (
                <Reveal key={b.label} delay={i * 60}>
                  <li>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">
                      {b.label}
                    </p>
                    <p className="mt-3 text-sm font-light text-secondary leading-relaxed">
                      {b.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSpotlightSection;
