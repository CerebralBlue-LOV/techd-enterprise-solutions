import { useEffect, useRef, useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import IndustryHeroBackdrop from "./_components/IndustryHeroBackdrop";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

const ANCHORS = [
  { href: "#why", label: "Why TechD" },
  { href: "#clients", label: "Clients" },
  { href: "#solutions", label: "Solutions" },
  { href: "#approach", label: "Approach" },
];

/**
 * Section: Industry Hero — editorial typographic
 * Same shape as the practice hero (compact ~50vh, bulge-grid backdrop).
 */
export const IndustryHeroSection = ({ industry }: Props) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const extras = INDUSTRIES_EXTRAS[industry.id];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setCursor({ x, y }));
    };
    const onLeave = () => setCursor(null);

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const headline = extras?.headline ?? industry.outcome;
  const lede = extras?.lede ?? industry.outcome;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[50vh] flex items-center"
    >
      <SectionMarker page={`Industries / ${industry.name}`} name="Hero" />
      <IndustryHeroBackdrop cursor={cursor} />
      <div className="container-page relative z-10 pt-16 pb-12 md:pt-20 md:pb-16">
        <Reveal>
          <div className="max-w-4xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-primary" />
              Industries
              <span className="text-muted-foreground/60">/</span>
              <span>{industry.name}</span>
            </p>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-secondary">
              {headline}
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
              {lede}
            </p>

            <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {industry.regulation}
            </p>

            <nav
              aria-label="On this page"
              className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-muted-foreground"
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

export default IndustryHeroSection;
