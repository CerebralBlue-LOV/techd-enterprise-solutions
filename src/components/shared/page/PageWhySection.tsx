import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { cn } from "@/lib/utils";

export type WhyPoint = { title: string; body: string };

interface Props {
  pageLabel: string;
  eyebrow?: string;
  title: string;
  points: WhyPoint[];
  /** Section id for anchor links. Defaults to "why". */
  id?: string;
  markerName?: string;
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

/**
 * Shared "Why TechD" bento grid. Standardized treatment lifted from Solutions.
 * Cycles through 4 card variants — works with 1–N points; LAYOUT[i % 4].
 */
export const PageWhySection = ({
  pageLabel,
  eyebrow = "Why TechD",
  title,
  points,
  id = "why",
  markerName = "Why TechD",
}: Props) => {
  if (!points?.length) return null;

  return (
    <section id={id} className="py-14 md:py-20 scroll-mt-24 border-t border-border">
      <SectionMarker page={pageLabel} name={markerName} />
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {points.map((p, i) => {
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
                  {variant === "dark" ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                    />
                  ) : null}
                  <div className="relative">
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

export default PageWhySection;
