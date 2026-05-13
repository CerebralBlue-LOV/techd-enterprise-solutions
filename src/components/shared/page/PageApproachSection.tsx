import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import DarkSection from "@shared/DarkSection";
import { cn } from "@/lib/utils";

export type ApproachStep = { step: string; detail: string };

interface Props {
  pageLabel: string;
  eyebrow?: string;
  title: string;
  steps: ApproachStep[];
  id?: string;
  markerName?: string;
  /** Visual tone. Defaults to "light". "dark" renders inside DarkSection. */
  tone?: "light" | "dark";
}

/**
 * Shared Approach section — numbered cards with ghost numeral, hover sheen,
 * and animated connector. Standardized treatment lifted from Solutions.
 *
 * `tone="dark"` renders the same composition on a full-bleed DarkSection
 * with translucent cards and inverted typography (used by the Services
 * Methodology block).
 */
export const PageApproachSection = ({
  pageLabel,
  eyebrow = "How we engage",
  title,
  steps,
  id = "approach",
  markerName = "Approach",
  tone = "light",
}: Props) => {
  if (!steps?.length) return null;

  const isDark = tone === "dark";

  const Body = (
    <div className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          eyebrowClassName={isDark ? "text-primary" : undefined}
          titleClassName={isDark ? "text-background" : undefined}
        />
      </Reveal>

      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={step.step} delay={i * 80}>
              <li
                className={cn(
                  "group relative h-full flex flex-col rounded-2xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5",
                  isDark
                    ? "border border-white/10 bg-background/[0.04] backdrop-blur-sm hover:border-primary/60 hover:shadow-[0_18px_40px_-18px_hsl(var(--primary)/0.55)]"
                    : "border border-border bg-background hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_hsl(var(--primary)/0.4)]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-4 -right-2 text-[7rem] leading-none font-bold tracking-tighter select-none transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-105",
                    isDark
                      ? "text-background/[0.06] group-hover:text-background/[0.12]"
                      : "text-primary/[0.06] group-hover:text-primary/[0.12]",
                  )}
                >
                  {num}
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-br from-transparent via-primary/[0.06] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden",
                  )}
                />

                <div className="relative flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    Step
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "relative h-px flex-1 overflow-hidden",
                      isDark ? "bg-white/15" : "bg-border",
                    )}
                  >
                    <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-[width] duration-700 ease-out group-hover:w-full" />
                  </span>
                </div>

                <h3
                  className={cn(
                    "relative mt-5 text-xl md:text-2xl font-bold leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-0.5",
                    isDark ? "text-background" : "text-secondary",
                  )}
                >
                  {step.step}
                </h3>

                <p
                  className={cn(
                    "relative mt-3 text-sm font-light leading-relaxed",
                    isDark ? "text-background/75" : "text-muted-foreground",
                  )}
                >
                  {step.detail}
                </p>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );

  if (isDark) {
    return (
      <DarkSection id={id} className="py-16 md:py-24 scroll-mt-24">
        <SectionMarker page={pageLabel} name={markerName} />
        {Body}
      </DarkSection>
    );
  }

  return (
    <section id={id} className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={pageLabel} name={markerName} />
      {Body}
    </section>
  );
};

export default PageApproachSection;
