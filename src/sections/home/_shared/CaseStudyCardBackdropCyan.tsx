import { useEffect, useRef } from "react";

/**
 * Cyan/gradient variant of the Featured Case Study backdrop.
 * Self-positions absolutely inside the nearest positioned ancestor (the card).
 * Tracks mouse on that ancestor and exposes --mx / --my (0–100%) so the
 * spotlight + grid mask follow the cursor.
 */
export const CaseStudyCardBackdropCyan = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
      el.dataset.hover = "true";
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
      delete el.dataset.hover;
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="case-cyan pointer-events-none absolute inset-0"
    >
      {/* Base cyan gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(195 90% 16%) 0%, hsl(195 95% 26%) 55%, hsl(195 100% 36%) 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(195 100% 88% / 0.35), transparent 60%)",
        }}
      />

      {/* Grid that brightens around the cursor */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(hsl(195 100% 88% / 0.22) 1px, transparent 1px), linear-gradient(90deg, hsl(195 100% 88% / 0.22) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          maskImage:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
        }}
      />

      {/* Sparse particles (upper area) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 18% 24%, hsl(0 0% 100% / 0.75), transparent 50%),
            radial-gradient(1.5px 1.5px at 72% 14%, hsl(195 100% 92% / 0.7), transparent 50%),
            radial-gradient(1px 1px at 42% 48%, hsl(0 0% 100% / 0.45), transparent 50%),
            radial-gradient(1px 1px at 88% 36%, hsl(0 0% 100% / 0.55), transparent 50%),
            radial-gradient(1.5px 1.5px at 58% 22%, hsl(0 0% 100% / 0.6), transparent 50%)
          `,
          backgroundSize:
            "240px 240px, 200px 200px, 320px 320px, 180px 180px, 220px 220px",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 35%, transparent 65%)",
          maskImage:
            "linear-gradient(180deg, black 0%, black 35%, transparent 65%)",
        }}
      />

      {/* Top rim light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
};

export default CaseStudyCardBackdropCyan;
