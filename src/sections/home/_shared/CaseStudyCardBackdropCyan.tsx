import { useEffect, useRef } from "react";

/**
 * Featured Case Study backdrop — neutral gray gradient anchored on the
 * brand `secondary` token. On hover, the surface fades to transparent
 * around the cursor, revealing the page's own grid through the card so
 * the grid lines stay aligned with the rest of the section.
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
    >
      {/* Brand-aligned gray gradient base.
          Anchored on secondary (#56565A) — same hue family, ±6% lightness. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(240 3% 28%) 0%, hsl(240 3% 34%) 55%, hsl(240 3% 40%) 100%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), transparent 0%, black 70%)",
          maskImage:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), transparent 0%, black 70%)",
          transition: "-webkit-mask-image 200ms ease, mask-image 200ms ease",
        }}
      />
      {/* Fallback solid layer so non-hover state stays opaque even if mask
          var hasn't been read yet. Disabled when --hover=1 via opacity. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(240 3% 28%) 0%, hsl(240 3% 34%) 55%, hsl(240 3% 40%) 100%)",
          opacity: "calc(1 - var(--hover, 0))",
          transition: "opacity 200ms ease",
        }}
      />

      {/* Top cyan rim light — sole brand accent on the surface */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
};

export default CaseStudyCardBackdropCyan;
