import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  featured?: boolean;
  motif: ReactNode;
  children: ReactNode;
}

/**
 * SolutionCard — card shell with cursor-following spotlight and subtle 3D tilt.
 * Tilt + spotlight only run on devices that support hover (desktop). Reduced
 * motion users get a static card. Motif fills the top header zone.
 */
export const SolutionCard = ({ to, featured, motif, children }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const raf = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-featured={featured ? "true" : undefined}
      className="solution-card group relative block h-full overflow-hidden rounded-xl border bg-background transition-[transform,box-shadow,border-color] duration-300 will-change-transform"
    >
      {/* Motif header zone */}
      <div className="relative h-[140px] w-full overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        {motif}
        {featured && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Spotlight overlay */}
      <span aria-hidden="true" className="solution-card-spotlight" />

      {/* Body */}
      <div className="relative p-7">{children}</div>
    </Link>
  );
};

export default SolutionCard;
