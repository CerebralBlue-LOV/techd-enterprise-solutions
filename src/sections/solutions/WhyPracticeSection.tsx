import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { cn } from "@/lib/utils";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

type Variant = "dark" | "light" | "accent" | "outline";

const VARIANT_STYLES: Record<
  Variant,
  { card: string; eyebrow: string; title: string; body: string; arrow: string }
> = {
  dark: {
    card: "bg-secondary text-background",
    eyebrow: "text-primary",
    title: "text-background",
    body: "text-background/70",
    arrow: "text-background/60",
  },
  light: {
    card: "bg-background text-secondary border border-border",
    eyebrow: "text-primary",
    title: "text-secondary",
    body: "text-muted-foreground",
    arrow: "text-muted-foreground",
  },
  accent: {
    card: "bg-primary text-background",
    eyebrow: "text-background/80",
    title: "text-background",
    body: "text-background/85",
    arrow: "text-background/80",
  },
  outline: {
    card: "bg-muted/30 text-secondary border border-border",
    eyebrow: "text-primary",
    title: "text-secondary",
    body: "text-muted-foreground",
    arrow: "text-muted-foreground",
  },
};

// Bento layout — first and last tiles span 2 cols on desktop for rhythm
const LAYOUT: { variant: Variant; span: string }[] = [
  { variant: "dark",    span: "md:col-span-2" },
  { variant: "light",   span: "md:col-span-1" },
  { variant: "accent",  span: "md:col-span-1" },
  { variant: "outline", span: "md:col-span-2" },
];

export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.whyPoints?.length) return null;

  return (
    <section id="why" className="section scroll-mt-24 border-t border-border">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why this practice" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why this practice"
            title={`What you get with TechD's ${practice.name} practice`}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {extras.whyPoints.map((p, i) => {
            const { variant, span } = LAYOUT[i % LAYOUT.length];
            const v = VARIANT_STYLES[variant];
            const num = String(i + 1).padStart(2, "0");

            return (
              <Reveal key={p.title} delay={i * 80} className={cn(span, "h-full")}>
                <article
                  className={cn(
                    "group relative h-full min-h-[280px] rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-transform duration-500 hover:-translate-y-1",
                    v.card,
                  )}
                >
                  {/* Top row: index */}
                  <div className="flex items-start">
                    <span className={cn("text-xs font-bold tracking-[0.2em] uppercase", v.eyebrow)}>
                      {num} — Why
                    </span>
                  </div>

                  {/* Decorative element for the dark hero tile */}
                  {variant === "dark" && (
                    <div aria-hidden className="absolute right-6 bottom-6 opacity-20 pointer-events-none">
                      <svg width="160" height="160" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M10 50 H90 M50 10 V90" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>
                  )}

                  {/* Decorative element for the accent (cyan) tile */}
                  {variant === "accent" && (
                    <div aria-hidden className="absolute -right-8 -bottom-8 opacity-25 pointer-events-none">
                      <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
                        {Array.from({ length: 8 }).map((_, k) => (
                          <line
                            key={k}
                            x1="50"
                            y1="50"
                            x2={50 + 45 * Math.cos((k * Math.PI) / 4)}
                            y2={50 + 45 * Math.sin((k * Math.PI) / 4)}
                            stroke="currentColor"
                            strokeWidth="0.6"
                          />
                        ))}
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 mt-10 max-w-md">
                    <h3
                      className={cn(
                        "font-bold leading-[1.05] tracking-tight",
                        variant === "dark"
                          ? "text-3xl md:text-5xl"
                          : "text-2xl md:text-3xl",
                        v.title,
                      )}
                    >
                      {p.title}
                    </h3>
                    <p className={cn("mt-4 text-sm md:text-base font-light leading-relaxed", v.body)}>
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
