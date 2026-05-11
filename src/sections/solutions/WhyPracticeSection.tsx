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
    <section id="why" className="section scroll-mt-24">
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
              <div className="group relative min-h-[260px] flex items-center justify-center rounded-xl overflow-hidden cursor-default bg-background border border-border transition-shadow duration-[600ms] hover:shadow-[0_20px_40px_-12px_hsl(var(--primary)/0.5)]">
                {/* Front: white with title */}
                <div className="flex flex-col items-center justify-center p-6 text-center transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-hover:[transform:scale(0)_rotate(-45deg)]">
                  <h3 className="text-xl font-bold text-secondary leading-tight">{p.title}</h3>
                </div>

                {/* Back: white panel rotates in */}
                <div className="absolute top-1/2 left-1/2 w-full h-full p-6 flex flex-col justify-center bg-background opacity-0 [transform:translate(-50%,-50%)_rotate(-45deg)] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-hover:opacity-100 group-hover:[transform:translate(-50%,-50%)_rotate(0deg)]">
                  <h3 className="text-base font-bold text-secondary">{p.title}</h3>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">{p.body}</p>
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
