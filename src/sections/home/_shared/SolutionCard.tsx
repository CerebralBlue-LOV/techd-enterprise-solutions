import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  featured?: boolean;
  scene: (active: boolean) => ReactNode;
  highlights: readonly string[];
  ctaLabel: string;
  children: ReactNode;
}

/**
 * SolutionCard — card shell with cursor-following spotlight, subtle 3D tilt,
 * and a slide-up reveal panel containing key capabilities + an underlined CTA.
 */
export const SolutionCard = ({ to, featured, scene, highlights, ctaLabel, children }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const raf = useRef<number | null>(null);
  const [active, setActive] = useState(false);

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
      el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 5}deg`);
    });
  };

  const handleEnter = () => setActive(true);
  const handleLeave = () => {
    setActive(false);
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
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-featured={featured ? "true" : undefined}
      data-hover={active ? "true" : undefined}
      className="solution-card group relative block h-full overflow-hidden rounded-xl border bg-background transition-[transform,box-shadow,border-color] duration-300 will-change-transform"
    >
      {/* Particle scene zone */}
      <div className="relative h-[160px] w-full overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        {scene(active)}
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

      {/* Slide-up reveal panel */}
      <div
        aria-hidden="true"
        className="solution-card-reveal pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-background/95 backdrop-blur-md border-t border-primary/30 px-7 py-6 transition-[transform,opacity] duration-300 ease-out opacity-0"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          What you get
        </p>
        <ul className="mt-3 space-y-2">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-sm font-light text-secondary"
            >
              <span aria-hidden="true" className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>
        <span className="story-link mt-5 inline-block text-sm font-bold text-primary">
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
};

export default SolutionCard;
