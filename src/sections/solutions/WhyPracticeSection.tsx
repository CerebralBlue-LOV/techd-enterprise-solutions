import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border-l border-t border-border">
          {extras.whyPoints.map((p, i) => {
            const tag = ["ARCH", "CORE", "FLOW", "SYST"][i % 4];
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={p.title} delay={i * 60}>
                <div className="group relative h-full p-10 border-r border-b border-border bg-background hover:bg-muted/20 transition-colors duration-500 overflow-hidden min-h-[280px]">
                  {/* Top-right technical metadata */}
                  <div className="absolute top-0 right-0 p-3 text-[10px] font-mono tracking-tight text-secondary/40">
                    {num} / {tag}
                  </div>
                  {/* Bottom-left cyan L-bracket */}
                  <div className="absolute bottom-0 left-0 w-8 h-px bg-primary" />
                  <div className="absolute bottom-0 left-0 w-px h-8 bg-primary" />

                  {/* Decorative circle */}
                  <div
                    aria-hidden
                    className="absolute -right-4 -bottom-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                  >
                    <svg width="140" height="140" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="hsl(var(--secondary))" strokeWidth="0.5" />
                      <path d="M0 50 L100 50 M50 0 L50 100" stroke="hsl(var(--secondary))" strokeWidth="0.5" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <span className="block text-primary text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                      Section {num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary leading-tight tracking-tight uppercase mb-5">
                      {p.title}
                    </h3>
                    <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-sm">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
