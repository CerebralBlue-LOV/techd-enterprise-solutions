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
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {extras.whyPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="group relative min-h-[260px] flex flex-col justify-end rounded-xl overflow-hidden cursor-default bg-background border border-border transition-shadow duration-500 hover:shadow-[0_20px_40px_-12px_hsl(var(--primary)/0.5)]">
                {/* Light orbs */}
                <div className="absolute -top-8 -left-8 w-44 h-44 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-muted/60 blur-xl" />

                {/* Content */}
                <div className="relative p-6">
                  <h3 className="text-xl font-bold text-secondary leading-tight">{p.title}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 motion-reduce:duration-0 group-hover:grid-rows-[1fr] group-hover:mt-3">
                    <div className="overflow-hidden">
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
