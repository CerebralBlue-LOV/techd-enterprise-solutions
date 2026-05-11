import { ArrowDownLeft } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { cn } from "@/lib/utils";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

type Variant = "dark" | "light" | "cyan" | "outline";

/** Bento layout for 4 cards — varied size + tone, brand-safe. */
const LAYOUT: { variant: Variant; span: string }[] = [
  { variant: "dark",    span: "md:col-span-2 md:row-span-2" }, // hero card, tall+wide
  { variant: "light",   span: "md:col-span-1 md:row-span-1" },
  { variant: "cyan",    span: "md:col-span-1 md:row-span-1" },
  { variant: "outline", span: "md:col-span-2 md:row-span-1" }, // wide bottom card
];

const variantStyles: Record<Variant, string> = {
  dark:    "bg-secondary text-background",
  light:   "bg-muted/30 text-secondary",
  cyan:    "bg-primary text-background",
  outline: "bg-background text-secondary border border-border",
};

const arrowTone: Record<Variant, string> = {
  dark:    "text-background/70",
  light:   "text-secondary/60",
  cyan:    "text-background/80",
  outline: "text-secondary/50",
};

const titleSize: Record<Variant, string> = {
  dark:    "text-3xl md:text-5xl",
  light:   "text-2xl md:text-3xl",
  cyan:    "text-2xl md:text-3xl",
  outline: "text-2xl md:text-3xl",
};

export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.whyPoints?.length) return null;

  const points = extras.whyPoints.slice(0, 4);

  return (
    <section id="why" className="section scroll-mt-24 border-t border-border">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why this practice" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why this practice"
            title={`What you'll get with TechD's ${practice.name} practice`}
            subtitle="Production patterns, IBM-certified engineers, and an operating model your team can own — not slideware."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(220px,1fr)] gap-4 md:gap-5">
          {points.map((p, i) => {
            const layout = LAYOUT[i] ?? LAYOUT[LAYOUT.length - 1];
            const { variant, span } = layout;
            const isHero = variant === "dark";

            return (
              <Reveal key={p.title} delay={i * 80} className={cn(span, "h-full")}>
                <article
                  className={cn(
                    "group relative h-full w-full overflow-hidden rounded-sm p-7 md:p-9 flex flex-col justify-between transition-all duration-500",
                    "hover:-translate-y-0.5",
                    variantStyles[variant],
                  )}
                >
                  {/* Corner arrow */}
                  <ArrowDownLeft
                    aria-hidden
                    className={cn(
                      "absolute top-5 right-5 h-5 w-5 rotate-180 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1",
                      arrowTone[variant],
                    )}
                    strokeWidth={1.5}
                  />

                  {/* Decorative motif for hero card */}
                  {isHero && (
                    <svg
                      aria-hidden
                      viewBox="0 0 200 200"
                      className="absolute -bottom-10 -left-8 h-64 w-64 opacity-[0.08]"
                    >
                      <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M5 100 H195 M100 5 V195" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  )}

                  {/* Subtle sweep highlight on hover */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 transition-all duration-[1200ms] ease-out",
                      variant === "dark"
                        ? "bg-gradient-to-r from-transparent via-background/10 to-transparent"
                        : variant === "cyan"
                        ? "bg-gradient-to-r from-transparent via-background/20 to-transparent"
                        : "bg-gradient-to-r from-transparent via-primary/10 to-transparent",
                    )}
                  />

                  <div className="relative z-10">
                    <span
                      className={cn(
                        "inline-block text-[11px] font-mono tracking-[0.18em] uppercase mb-4",
                        variant === "cyan" ? "text-background/90" :
                        variant === "dark" ? "text-background/80" :
                        "text-primary",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")} — {["Foundation","Method","Velocity","Outcome"][i]}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3
                      className={cn(
                        "font-bold leading-[1.05] tracking-tight mb-3",
                        titleSize[variant],
                      )}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={cn(
                        "font-light leading-relaxed max-w-md",
                        isHero ? "text-base md:text-lg text-background/80" :
                        variant === "cyan" ? "text-sm md:text-base text-background/90" :
                        "text-sm md:text-base text-muted-foreground",
                      )}
                    >
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
