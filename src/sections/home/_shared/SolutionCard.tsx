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
 * SolutionCard — card shell with cursor-following spotlight and a front/back
 * hover flip that reveals key capabilities on the back face.
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
      className="solution-card group relative block h-full overflow-hidden rounded-xl border bg-background transition-[box-shadow,border-color] duration-300"
    >
      <div className="solution-card-inner relative grid h-full [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <div className="solution-card-face solution-card-front relative grid [grid-area:1/1] bg-background [backface-visibility:hidden]">
          {/* Particle scene zone */}
          <div className="relative h-[160px] w-full overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
            {scene(active)}
            {featured && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          <span aria-hidden="true" className="solution-card-spotlight" />

          <div className="relative p-7">{children}</div>
        </div>

        <div className="solution-card-face solution-card-back relative grid [grid-area:1/1] bg-background [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-b from-accent/40 via-background to-background p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {ctaLabel}
              </p>
              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm font-light text-secondary">
                    <span aria-hidden="true" className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <span className="story-link mt-8 inline-block text-sm font-bold text-primary">
              {ctaLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SolutionCard;
