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
  { card: string; title: string; body: string }
> = {
  dark: {
    card: "bg-gradient-to-br from-secondary to-secondary/80",
    title: "text-background",
    body: "text-background/70",
  },
  light: {
    card: "bg-gradient-to-br from-background to-muted/30 border border-border",
    title: "text-secondary",
    body: "text-muted-foreground",
  },
  accent: {
    card: "bg-gradient-to-br from-primary to-primary/70",
    title: "text-background",
    body: "text-background/85",
  },
  outline: {
    card: "bg-gradient-to-br from-muted/20 to-background border border-border",
    title: "text-secondary",
    body: "text-muted-foreground",
  },
};

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
    <section id="why" className="py-14 md:py-20 scroll-mt-24 border-t border-border">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why this practice" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why TechD"
            title={`Why enterprises choose TechD for ${practice.name}`}
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {extras.whyPoints.map((p, i) => {
            const { variant, span } = LAYOUT[i % LAYOUT.length];
            const v = VARIANT_STYLES[variant];

            return (
              <Reveal key={p.title} delay={i * 80} className={cn(span, "h-full")}>
                <article
                  className={cn(
                    "group relative h-full rounded-2xl p-5 md:p-7 flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1",
                    v.card,
                  )}
                >
                  <div>
                    <h3
                      className={cn(
                        "font-bold leading-[1.05] tracking-tight",
                        variant === "dark"
                          ? "text-2xl md:text-4xl"
                          : "text-xl md:text-2xl",
                        v.title,
                      )}
                    >
                      {p.title}
                    </h3>
                    <p className={cn("mt-3 text-sm font-light leading-relaxed", v.body)}>
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
