import { useEffect, useRef } from "react";

/**
 * Featured Case Study backdrop — dark neutral base with a cursor-reactive
 * cyan spotlight + faint grid that only lights up near the pointer.
 * On-brand: cyan as accent on a dark surface, not as the surface itself.
 */
export const CaseStudyCardBackdropCyan = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--hover", "0");

    const onEnter = () => el.style.setProperty("--hover", "1");
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
    };
    const onLeave = () => el.style.setProperty("--hover", "0");

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ transition: "opacity 600ms ease" }}
    >
      {/* Dark brand base + soft static cyan glow (matches the rest of the site) */}
      <div
        className="absolute inset-0 bg-secondary"
        style={{
          backgroundImage: `
            radial-gradient(55% 50% at 95% 5%, hsl(var(--primary) / 0.22) 0%, transparent 70%),
            radial-gradient(60% 40% at 10% 90%, hsl(var(--primary) / 0.07) 0%, transparent 70%)
          `,
        }}
      />

      {/* Cursor spotlight — only visible on hover, fades smoothly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.22), transparent 65%)",
          opacity: "var(--hover, 0)",
          transition: "opacity 500ms ease",
        }}
      />

      {/* Faint grid revealed only around the cursor */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          maskImage:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          opacity: "calc(var(--hover, 0) * 0.6)",
          transition: "opacity 500ms ease",
        }}
      />

      {/* Sparse static stars in upper third (kept from original) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, hsl(0 0% 100% / 0.7), transparent 50%),
            radial-gradient(1px 1px at 70% 15%, hsl(195 100% 85% / 0.55), transparent 50%),
            radial-gradient(1.5px 1.5px at 45% 55%, hsl(0 0% 100% / 0.4), transparent 50%),
            radial-gradient(1px 1px at 85% 40%, hsl(0 0% 100% / 0.45), transparent 50%),
            radial-gradient(1px 1px at 10% 70%, hsl(195 100% 85% / 0.3), transparent 50%),
            radial-gradient(1.5px 1.5px at 60% 25%, hsl(0 0% 100% / 0.55), transparent 50%)
          `,
          backgroundSize:
            "240px 240px, 200px 200px, 320px 320px, 180px 180px, 280px 280px, 220px 220px",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 30%, transparent 60%)",
          maskImage:
            "linear-gradient(180deg, black 0%, black 30%, transparent 60%)",
        }}
      />

      {/* Top cyan rim light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
};

export default CaseStudyCardBackdropCyan;
