import { useEffect, useRef, useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import PracticeHeroBackdrop from "./PracticeHeroBackdrop";
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

type Ripple = { id: number; x: number; y: number };

/**
 * Section: Practice Hero — editorial typographic
 * Compact (~50vh), no image, no CTAs. H1 = practice.outcome.
 * Cursor-driven ripple effect on the engineered grid backdrop.
 */
export const PracticeHeroSection = ({ practice }: Props) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastEmit = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastEmit.current < 140) return;
      lastEmit.current = now;
      const rect = node.getBoundingClientRect();
      const id = ++idRef.current;
      const ripple = { id, x: e.clientX - rect.left, y: e.clientY - rect.top };
      setRipples((prev) => [...prev.slice(-5), ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1400);
    };

    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[50vh] flex items-center"
    >
      <SectionMarker page={`Solutions / ${practice.name}`} name="Hero" />
      <PracticeHeroBackdrop ripples={ripples} />
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
};

export default PracticeHeroSection;
