import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import HeroBackdrop from "@/sections/home/_shared/HeroBackdrop";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

const ANCHORS = [
  { href: "#why", label: "Why this practice" },
  { href: "#products", label: "Products" },
  { href: "#industries", label: "Industries" },
  { href: "#approach", label: "Approach" },
];

/**
 * Section: Practice Hero — editorial typographic
 * Compact (~50vh), no image, no CTAs. H1 = practice.outcome.
 * Eyebrow rule + animated cyan accent stroke + quick-jump anchors.
 */
export const PracticeHeroSection = ({ practice }: Props) => (
  <section className="relative overflow-hidden min-h-[50vh] flex items-center">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Hero" />
    <GeometricAccent className="opacity-50" />
    <div className="container-page relative z-10 pt-16 pb-12 md:pt-20 md:pb-16">
      <Reveal>
        <div className="max-w-4xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-primary" />
            Solutions
            <span className="text-muted-foreground/60">/</span>
            <span>{practice.name}</span>
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-secondary">
            {practice.outcome}
          </h1>

          <svg
            aria-hidden="true"
            viewBox="0 0 80 4"
            className="mt-6 h-[3px] w-20 overflow-visible"
          >
            <line
              x1="0"
              y1="2"
              x2="80"
              y2="2"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="80"
              strokeDashoffset="80"
              style={{
                animation: "practice-stroke-draw 900ms cubic-bezier(.2,.8,.2,1) 200ms forwards",
              }}
            />
          </svg>
          <style>{`@keyframes practice-stroke-draw { to { stroke-dashoffset: 0; } }`}</style>

          <p className="mt-6 max-w-2xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
            {practice.description}
          </p>

          <nav
            aria-label="On this page"
            className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-muted-foreground"
          >
            {ANCHORS.map((a, i) => (
              <span key={a.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-muted-foreground/40">·</span>}
                <a
                  href={a.href}
                  className="transition-colors hover:text-primary focus-visible:text-primary"
                >
                  {a.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PracticeHeroSection;
