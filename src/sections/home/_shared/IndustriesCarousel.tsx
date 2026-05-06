import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { INDUSTRIES, type Industry } from "@content/industries";

/**
 * IndustriesCarousel — light-theme horizontal card rail.
 * Drag-to-scroll only (no arrow controls). Soft 3D tilt based on distance
 * from center. Centered text on each card with quiet primary motifs behind.
 */

// ---------- Per-industry motifs — light, soft, primary-only ----------

type MotifProps = { id: string };

const MotifGrid = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
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
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
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
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
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
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx={200}
          cy={180}
          r={26 + i * 22}
          strokeWidth={0.7}
          opacity={0.3 - i * 0.028}
        />
      ))}
    </g>
  </svg>
);

const MotifBars = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
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
          <line
            key={i}
            x1={x}
            y1={180 - h / 2}
            x2={x}
            y2={180 + h / 2}
            strokeWidth={1.4}
            opacity={op}
          />
        );
      })}
    </g>
  </svg>
);

const MotifChevrons = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
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
  containerRef: React.RefObject<HTMLDivElement>;
  scrollTick: number;
}

const IndustryCard = ({ ind, index, containerRef, scrollTick }: CardProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [tilt, setTilt] = useState(0);
  const Motif = MOTIFS[index % MOTIFS.length];

  useEffect(() => {
    const el = ref.current;
    const wrap = containerRef.current;
    if (!el || !wrap) return;
    const cardRect = el.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const wrapCenter = wrapRect.left + wrapRect.width / 2;
    const delta = (cardCenter - wrapCenter) / wrapRect.width;
    const next = Math.max(-10, Math.min(10, delta * 18));
    setTilt(next);
  }, [scrollTick, containerRef]);

  return (
    <Link
      ref={ref}
      to={`/industries#${ind.id}`}
      className="group relative block shrink-0 snap-center"
      style={{
        width: "clamp(260px, 30vw, 340px)",
        perspective: "1400px",
      }}
    >
      <div
        className="relative h-[240px] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_8px_20px_-16px_hsl(var(--primary)/0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_10px_24px_-18px_hsl(var(--primary)/0.28)]"
        style={{
          transform: `rotateY(${tilt}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Motif id={ind.id} />

        {/* Soft full-card legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h3 className="text-xl font-bold leading-tight text-secondary">{ind.name}</h3>
          <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground line-clamp-3">
            {ind.outcome}
          </p>
        </div>
      </div>
    </Link>
  );
};

// ---------- Carousel ----------

export const IndustriesCarousel = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [tick, setTick] = useState(0);
  const dragState = useRef<{
    down: boolean;
    startX: number;
    scroll: number;
    moved: boolean;
    lastX: number;
    lastT: number;
    velocity: number;
  }>({ down: false, startX: 0, scroll: 0, moved: false, lastX: 0, lastT: 0, velocity: 0 });
  const momentumRaf = useRef<number | null>(null);

  const updateState = useCallback(() => setTick((t) => t + 1), []);

  const cancelMomentum = () => {
    if (momentumRaf.current != null) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  };

  const startMomentum = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    let v = dragState.current.velocity; // px per ms
    if (Math.abs(v) < 0.05) return;
    const step = () => {
      if (!el) return;
      el.scrollLeft -= v * 16;
      v *= 0.94;
      if (Math.abs(v) > 0.05) {
        momentumRaf.current = requestAnimationFrame(step);
      } else {
        momentumRaf.current = null;
      }
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, []);

  // Scroll listener for tilt updates
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateState);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateState();
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateState]);

  // Edge-hover auto-scroll. When the cursor is near the left/right edge of the
  // rail, slowly pan in that direction. Speed scales with proximity to the edge.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let pointerX: number | null = null;
    let inside = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!inside || pointerX == null || dragState.current.down) return;
      const rect = el.getBoundingClientRect();
      const zone = 110; // corner-only sensitivity zone (px)
      const distLeft = pointerX - rect.left;
      const distRight = rect.right - pointerX;
      const maxSpeed = 5; // ~300px/s at 60fps
      let speed = 0;
      if (distLeft < zone) {
        const t = 1 - distLeft / zone; // 0..1
        speed = -(0.4 + t * 0.6) * maxSpeed; // gentle floor + slight ramp
      } else if (distRight < zone) {
        const t = 1 - distRight / zone;
        speed = (0.4 + t * 0.6) * maxSpeed;
      }
      if (speed !== 0) el.scrollLeft += speed;
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      inside = true;
    };
    const onLeave = () => {
      inside = false;
      pointerX = null;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    cancelMomentum();
    dragState.current = {
      down: true,
      startX: e.pageX,
      scroll: el.scrollLeft,
      moved: false,
      lastX: e.pageX,
      lastT: performance.now(),
      velocity: 0,
    };
    el.classList.add("cursor-grabbing");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.down) return;
    const el = wrapRef.current;
    if (!el) return;
    const dx = e.pageX - dragState.current.startX;
    if (Math.abs(dx) > 5) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scroll - dx;
    const now = performance.now();
    const dt = now - dragState.current.lastT;
    if (dt > 0) {
      // velocity in px/ms (positive = moving cursor right => scrollLeft decreases)
      dragState.current.velocity = (e.pageX - dragState.current.lastX) / dt;
    }
    dragState.current.lastX = e.pageX;
    dragState.current.lastT = now;
  };
  const stopDrag = () => {
    if (!dragState.current.down) return;
    dragState.current.down = false;
    wrapRef.current?.classList.remove("cursor-grabbing");
    startMomentum();
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onClickCapture={onClickCapture}
        className="flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto overflow-y-hidden py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: "max(1.5rem, calc((100% - 1200px) / 2))" }}
      >
        {INDUSTRIES.map((ind, i) => (
          <IndustryCard
            key={ind.id}
            ind={ind}
            index={i}
            containerRef={wrapRef}
            scrollTick={tick}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent transition-opacity duration-300"
        style={{ opacity: (wrapRef.current?.scrollLeft ?? 0) > 8 ? 1 : 0 }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent transition-opacity duration-300"
        style={{
          opacity:
            wrapRef.current &&
            wrapRef.current.scrollLeft >=
              wrapRef.current.scrollWidth - wrapRef.current.clientWidth - 8
              ? 0
              : 1,
        }}
      />
    </div>
  );
};

export default IndustriesCarousel;
