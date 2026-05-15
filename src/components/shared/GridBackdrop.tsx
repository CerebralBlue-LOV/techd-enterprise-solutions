import { cn } from "@/lib/utils";

/**
 * Lightweight grid-only backdrop.
 *
 * Renders a faint engineered grid with a soft radial mask. No gradient blobs
 * or vignettes — drop into any `relative overflow-hidden` parent when you
 * want only the structural grid texture.
 *
 * Tone:
 *   - "border"  → neutral border-color lines (default, matches SectionBackdrop)
 *   - "primary" → faint cyan lines (good on white cards that need brand hint)
 */
type Tone = "border" | "primary";

type Props = {
  tone?: Tone;
  /** Grid cell size in px. Default 48 (matches SectionBackdrop). */
  cellSize?: number;
  /** 0–1 line opacity. Default 0.4. */
  opacity?: number;
  /** CSS mask shape — "radial" (centered fade) or "top" (fade from top). */
  mask?: "radial" | "top" | "none";
  className?: string;
};

const LINE: Record<Tone, (o: number) => string> = {
  border: (o) => `hsl(var(--border) / ${o})`,
  primary: (o) => `hsl(var(--primary) / ${o})`,
};

const MASKS: Record<NonNullable<Props["mask"]>, string | undefined> = {
  radial: "radial-gradient(80% 90% at 50% 50%, black 35%, transparent 85%)",
  top: "radial-gradient(ellipse 90% 70% at 50% 0%, black 0%, transparent 75%)",
  none: undefined,
};

export const GridBackdrop = ({
  tone = "border",
  cellSize = 48,
  opacity = 0.4,
  mask = "radial",
  className,
}: Props) => {
  const line = LINE[tone](opacity);
  const maskImg = MASKS[mask];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        WebkitMaskImage: maskImg,
        maskImage: maskImg,
      }}
    />
  );
};

export default GridBackdrop;
