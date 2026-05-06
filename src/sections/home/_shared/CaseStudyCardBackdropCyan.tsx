import { useRef, type ReactNode } from "react";

/**
 * Cyan/gradient variant of the Featured Case Study backdrop.
 * Tracks the cursor and exposes --mx / --my (0–100%) so a spotlight
 * and shimmer follow the pointer. Kept self-contained: wrap your card
 * content with <CaseStudyCardBackdropCyan>...</CaseStudyCardBackdropCyan>
 * inside a relative container — it provides absolutely-positioned layers
 * underneath the children.
 */
export const CaseStudyCardBackdropCyan = ({ children }: { children?: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="case-cyan group/case relative"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      {/* Base gradient: deep cyan → primary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(195 90% 18%) 0%, hsl(195 95% 28%) 50%, hsl(195 100% 38%) 100%)",
        }}
      />

      {/* Cursor spotlight — soft white-cyan glow that follows the mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover/case:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), hsl(195 100% 85% / 0.35), transparent 60%)",
        }}
      />

      {/* Animated grid that brightens near cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(hsl(195 100% 85% / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(195 100% 85% / 0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage:
            "radial-gradient(360px circle at var(--mx) var(--my), black, transparent 70%)",
          maskImage:
            "radial-gradient(360px circle at var(--mx) var(--my), black, transparent 70%)",
        }}
      />

      {/* Sparse particles in the upper area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
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

      {/* Shimmer beam — sweeps across on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1400ms] ease-out group-hover/case:translate-x-full"
      />

      {/* Top rim light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />

      {children}
    </div>
  );
};

export default CaseStudyCardBackdropCyan;
