import { useEffect, useRef } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const OutcomesSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.style.setProperty("--hover", "0");

    const onEnter = () => el.style.setProperty("--hover", "1");
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    const onLeave = () => el.style.setProperty("--hover", "0");

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section bg-secondary relative overflow-hidden">
      {/* Cursor-following grid over the full section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(0 0% 100% / 0.16) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.16) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          maskImage:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          opacity: "calc(var(--hover, 0) * 0.9)",
          transition: "opacity 350ms ease",
        }}
      />

      <SectionMarker page={`Solutions / ${practice.name}`} name="Outcomes" />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
          <Reveal>
            <p className="eyebrow mb-3">The bottom line</p>
            <p className="text-2xl md:text-3xl leading-[1.25] text-secondary-foreground font-light">
              {practice.pitch}
            </p>
          </Reveal>
          {extras?.stats?.length ? (
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-5">
                {extras.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-secondary-foreground/15 p-6">
                    <p className="text-3xl md:text-4xl font-bold text-primary leading-none">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm font-light text-secondary-foreground/60 leading-snug">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
