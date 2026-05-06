import { useEffect, useRef } from "react";

/**
 * Featured Case Study backdrop — neutral gray gradient anchored on the
 * brand `secondary` hue family. On hover, an aligned page-style grid is
 * revealed around the cursor. The grid's background-position is computed
 * from the card's offset within its parent section so it lines up with
 * the existing page grid behind it.
 */
export const CaseStudyCardBackdropCyan = () => {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const grid = gridRef.current;
    const parent = el?.parentElement;
    if (!el || !grid || !parent) return;

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--hover", "0");

    const CELL = 48;

    const align = () => {
      // Find the nearest <section> ancestor; the page SectionBackdrop grid
      // is positioned relative to it. Falls back to viewport.
      const section = parent.closest("section") ?? document.body;
      const cardRect = parent.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const offX = cardRect.left - sectionRect.left;
      const offY = cardRect.top - sectionRect.top;
      // Negative modulo so our grid cells line up with the section's grid.
      const px = -((offX % CELL) + CELL) % CELL;
      const py = -((offY % CELL) + CELL) % CELL;
      grid.style.backgroundPosition = `${px}px ${py}px`;
    };

    const onEnter = () => {
      align();
      el.style.setProperty("--hover", "1");
    };
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
    };
    const onLeave = () => el.style.setProperty("--hover", "0");

    align();
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", align);
    window.addEventListener("scroll", align, { passive: true });
    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", align);
      window.removeEventListener("scroll", align);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {/* Neutral gray gradient base — same hue family as `secondary`. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(240 3% 28%) 0%, hsl(240 3% 34%) 55%, hsl(240 3% 40%) 100%)",
        }}
      />

      {/* Aligned grid revealed around the cursor on hover. The grid uses
          the same 48px cell size as the page SectionBackdrop, with its
          background-position computed in JS to match. */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(0 0% 100% / 0.16) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.16) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          maskImage:
            "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          opacity: "calc(var(--hover, 0) * 0.9)",
          transition: "opacity 350ms ease",
        }}
      />

      {/* Top cyan rim light — sole brand accent on the surface */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
};

export default CaseStudyCardBackdropCyan;
