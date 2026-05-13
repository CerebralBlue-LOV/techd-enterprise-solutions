import { useEffect, useRef } from "react";

/**
 * Reusable hover-reveal backdrop.
 *
 * Renders a base gradient surface with a grid pattern that is revealed in a
 * soft circular spotlight around the cursor. The grid's background-position
 * is computed from the parent's offset within the nearest <section>, so the
 * cells line up with the page-level SectionBackdrop grid (same 48px cells).
 *
 * Drop inside a `relative overflow-hidden` parent (typically a card). The
 * parent receives the mouse listeners.
 *
 * Variants:
 *   - "dark"    → neutral gray gradient (good on dark cards, default)
 *   - "light"   → subtle near-white gradient (good on light surfaces)
 *   - "primary" → cyan gradient with white grid lines (good on primary-colored cards)
 *
 * Optional `topRim` adds a thin cyan rim light along the top edge.
 */
type Variant = "dark" | "light" | "primary";

type Props = {
  variant?: Variant;
  /** Spotlight radius in pixels. Default 280. */
  spotlightRadius?: number;
  /** Grid cell size in px — keep at 48 to match SectionBackdrop. */
  cellSize?: number;
  /** Show the cyan top rim line. Default true. */
  topRim?: boolean;
  /** Render the base gradient background. Set false to overlay on an existing background. Default true. */
  background?: boolean;
};

const GRADIENTS: Record<Variant, string> = {
  dark: "linear-gradient(135deg, hsl(240 3% 28%) 0%, hsl(240 3% 34%) 55%, hsl(240 3% 40%) 100%)",
  light: "linear-gradient(135deg, hsl(0 0% 99%) 0%, hsl(0 0% 97%) 55%, hsl(0 0% 95%) 100%)",
  primary: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%)",
};

const GRID_LINE: Record<Variant, string> = {
  dark: "hsl(0 0% 100% / 0.16)",
  light: "hsl(var(--border) / 0.6)",
  primary: "hsl(0 0% 100% / 0.20)",
};

export const HoverGridBackdrop = ({
  variant = "dark",
  spotlightRadius = 280,
  cellSize = 48,
  topRim = true,
  background = true,
}: Props) => {
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

    const align = () => {
      const section = parent.closest("section") ?? document.body;
      const cardRect = parent.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const offX = cardRect.left - sectionRect.left;
      const offY = cardRect.top - sectionRect.top;
      const px = -((offX % cellSize) + cellSize) % cellSize;
      const py = -((offY % cellSize) + cellSize) % cellSize;
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
  }, [cellSize]);

  const lineColor = GRID_LINE[variant];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {background && (
        <div
          className="absolute inset-0"
          style={{ background: GRADIENTS[variant] }}
        />
      )}

      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          WebkitMaskImage: `radial-gradient(${spotlightRadius}px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)`,
          maskImage: `radial-gradient(${spotlightRadius}px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)`,
          opacity: "calc(var(--hover, 0) * 0.9)",
          transition: "opacity 350ms ease",
        }}
      />

      {topRim && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      )}
    </div>
  );
};

export default HoverGridBackdrop;
