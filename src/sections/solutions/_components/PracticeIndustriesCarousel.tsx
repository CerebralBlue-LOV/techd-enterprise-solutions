import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { type Industry } from "@content/industries";

export interface PracticeIndustryItem {
  ind: Industry;
  proof: string;
}

interface Props {
  items: PracticeIndustryItem[];
}

/**
 * Practice-page industries carousel.
 * Single full-width card; crossfades between industries.
 * Auto-advances every 5s, pauses on hover/focus.
 * Controls: dots, prev/next buttons, ←/→ keys, drag/swipe.
 */
export const PracticeIndustriesCarousel = ({ items }: Props) => {
  const N = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % N), [N]);
  const prev = useCallback(() => setActive((i) => (i - 1 + N) % N), [N]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, next]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
  };

  const dragRef = useRef({ down: false, startX: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { down: true, startX: e.clientX };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.down = false;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  return (
    <div className="mt-12">
      {/* Card stage — hover here pauses; hovering controls does not */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Industries served by this practice"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative h-[280px] md:h-[260px] overflow-hidden rounded-2xl border border-border bg-background cursor-grab select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {items.map(({ ind, proof }, i) => (
          <div
            key={ind.id}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              i === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Subtle directional glow — bottom-right */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none" />

            <Link
              to={`/industries/${ind.id}`}
              tabIndex={i === active ? 0 : -1}
              className="group relative flex h-full flex-col justify-between p-8 md:p-10"
            >
              <div>
                <p className="eyebrow">{ind.regulation}</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-bold text-secondary leading-tight">
                  {ind.name}
                </h3>
                <p className="mt-3 max-w-xl text-sm font-light text-muted-foreground leading-relaxed">
                  {proof}
                </p>
              </div>
              <span className="flex w-fit items-center gap-1.5 text-sm font-bold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                View industry <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        ))}

        {/* Progress bar — resets via key when active changes */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-border pointer-events-none">
          {!reducedMotion && (
            <div
              key={active}
              className="h-full w-full bg-primary origin-left"
              style={{
                animation: "practice-progress 5s linear forwards",
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          )}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to industry ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-5 h-1.5 bg-primary"
                : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PracticeIndustriesCarousel;
