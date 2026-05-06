import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES, type Industry } from "@content/industries";

/**
 * IndustriesCarousel — 3D stacked-deck presentation.
 * The active card sits in front; the next few peek behind with progressive
 * scale / translate / opacity. Auto-advances; pauses on hover/focus.
 * Controls: click peek card, drag/swipe, ←/→ keys, dot indicators.
 */

// ---------- Per-industry motifs (reused) ----------

type MotifProps = { id: string };

const MotifGrid = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.22">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 46} y1={0} x2={i * 46 - 40} y2={360} />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 54} x2={400} y2={i * 54 + 14} />
      ))}
    </g>
  </svg>
);

const MotifWaves = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 11 }).map((_, i) => {
        const y = 50 + i * 28;
        const op = 0.14 + (i / 11) * 0.22;
        return (
          <path
            key={i}
            d={`M -20 ${y} C 100 ${y - 28 + Math.sin(i) * 8}, 300 ${y + 28 + Math.cos(i) * 8}, 420 ${y - 6}`}
            strokeWidth={1 + (i / 11) * 0.9}
            opacity={op}
          />
        );
      })}
    </g>
  </svg>
);

const MotifNodes = ({ id }: MotifProps) => {
  const seed = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const pts = Array.from({ length: 16 }).map((_, i) => ({
    x: seed(i + 1) * 400,
    y: seed(i + 99) * 360,
    r: 1.2 + seed(i + 33) * 1.8,
    op: 0.18 + seed(i + 7) * 0.25,
  }));
  return (
    <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="360" fill={`url(#g-${id})`} />
      <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.18">
        {pts.map((p, i) =>
          pts
            .slice(i + 1)
            .filter((q) => Math.hypot(p.x - q.x, p.y - q.y) < 130)
            .map((q, j) => <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />),
        )}
      </g>
      <g fill="hsl(var(--primary))">
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} opacity={p.op} />
        ))}
      </g>
    </svg>
  );
};

const MotifPulse = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={200} cy={180} r={26 + i * 22} strokeWidth={0.7} opacity={0.3 - i * 0.028} />
      ))}
    </g>
  </svg>
);

const MotifBars = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i / 30) * 400;
        const h = 24 + Math.abs(Math.sin(i * 0.7)) * 200;
        const op = 0.14 + Math.abs(Math.sin(i * 0.35)) * 0.28;
        return (
          <line key={i} x1={x} y1={180 - h / 2} x2={x} y2={180 + h / 2} strokeWidth={1.4} opacity={op} />
        );
      })}
    </g>
  </svg>
);

const MotifChevrons = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: 6 }).map((_, i) => {
        const y = 90 + i * 40;
        const op = 0.18 + (i / 6) * 0.22;
        return (
          <path
            key={i}
            d={`M 60 ${y + 26} L 200 ${y} L 340 ${y + 26}`}
            strokeWidth={1.4}
            opacity={op}
          />
        );
      })}
    </g>
  </svg>
);

const MOTIFS = [MotifWaves, MotifNodes, MotifGrid, MotifBars, MotifPulse, MotifChevrons];

// ---------- Card ----------

interface CardProps {
  ind: Industry;
  index: number;
  depth: number; // 0 = active, 1.. peek
  isActive: boolean;
  total: number;
  onActivate: () => void;
  reducedMotion: boolean;
}

interface CardPropsExt extends CardProps {
  signedDepth: number; // negative = left side, positive = right side, 0 = center
}

const StackedCard = ({ ind, index, depth, signedDepth, isActive, total, onActivate, reducedMotion }: CardPropsExt) => {
  const Motif = MOTIFS[index % MOTIFS.length];

  // Visual depth tiers (cap at 3). depth >= 4 = hidden.
  const d = Math.min(depth, 4);
  const visible = d <= 3;
  const side = Math.sign(signedDepth); // -1 left, 0 center, +1 right

  const scale = [1, 0.86, 0.74, 0.64, 0.58][d];
  // Lateral fan-out — neighbors sit to the sides, not behind.
  const translateX = side * [0, 62, 110, 150, 180][d]; // percent of card width
  const translateZ = -[0, 80, 160, 230, 290][d];
  const rotateY = -side * [0, 28, 38, 44, 48][d];
  const opacity = visible ? [1, 0.7, 0.35, 0.15, 0][d] : 0;
  const blur = d >= 2 ? `blur(${(d - 1) * 1.4}px)` : "none";
  const zIndex = total - d;

  const transform = reducedMotion
    ? "none"
    : `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

  const handleClick = (e: React.MouseEvent) => {
    if (!isActive) {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        transform,
        opacity,
        zIndex,
        filter: reducedMotion ? "none" : blur,
        pointerEvents: visible && d <= 1 ? "auto" : "none",
      }}
      aria-hidden={!isActive}
    >
      <Link
        to={`/industries#${ind.id}`}
        onClick={handleClick}
        tabIndex={isActive ? 0 : -1}
        className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-background shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.4),0_8px_20px_-16px_hsl(var(--primary)/0.18)]"
      >
        <Motif id={ind.id} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />

        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            {ind.regulation}
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-secondary md:text-3xl">
            {ind.name}
          </h3>
          {isActive && (
            <>
              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground line-clamp-3">
                {ind.outcome}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                See industry
                <ArrowRight className="h-4 w-4" />
              </span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

// ---------- Deck ----------

export const IndustriesCarousel = () => {
  const N = INDUSTRIES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragRef = useRef<{ down: boolean; startX: number; dx: number }>({
    down: false,
    startX: 0,
    dx: 0,
  });

  const next = useCallback(() => setActive((i) => (i + 1) % N), [N]);
  const prev = useCallback(() => setActive((i) => (i - 1 + N) % N), [N]);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(next, 6000);
    const onVis = () => {
      if (document.hidden) window.clearInterval(id);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [paused, reducedMotion, next]);

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // Drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { down: true, startX: e.clientX, dx: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.down) return;
    dragRef.current.dx = e.clientX - dragRef.current.startX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.down) return;
    const dx = dragRef.current.dx;
    dragRef.current.down = false;
    if (Math.abs(dx) > 60) {
      if (dx < 0) next();
      else prev();
      // Suppress the click that follows on the active <Link>
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const blocker = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          link.removeEventListener("click", blocker, true);
        };
        link.addEventListener("click", blocker, true);
      }
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Industries"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-[340px] cursor-grab touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl md:h-[360px]"
        style={{ perspective: "1400px" }}
      >
        {INDUSTRIES.map((ind, i) => {
          // Signed offset in [-N/2, N/2] so cards fan to the nearest side.
          let signed = i - active;
          if (signed > N / 2) signed -= N;
          if (signed < -N / 2) signed += N;
          const depth = Math.abs(signed);
          return (
            <StackedCard
              key={ind.id}
              ind={ind}
              index={i}
              depth={depth}
              signedDepth={signed}
              isActive={depth === 0}
              total={N}
              onActivate={() => setActive(i)}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {INDUSTRIES.map((ind, i) => (
          <button
            key={ind.id}
            type="button"
            aria-label={`Go to ${ind.name}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default IndustriesCarousel;
