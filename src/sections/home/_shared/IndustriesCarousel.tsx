import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { INDUSTRIES, type Industry } from "@content/industries";

/**
 * IndustriesCarousel — horizontal, perspective-tilted card carousel.
 * Inspired by editorial card-rail interactions: cards rotate in 3D based on
 * their distance from the viewport center, creating a sense of depth and
 * motion as the user scrolls or drags. Brand palette only (cyan + secondary).
 */

// ---------- Per-industry motifs (single cyan hue, varied form) ----------

const MotifGrid = () => (
  <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id="m-grid-glow" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="600" fill="hsl(var(--secondary))" />
    <rect width="400" height="600" fill="url(#m-grid-glow)" />
    <g stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35">
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 30} y1={0} x2={i * 30 - 80} y2={600} />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40 + 30} />
      ))}
    </g>
  </svg>
);

const MotifWaves = () => (
  <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <rect width="400" height="600" fill="hsl(var(--secondary))" />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 26 }).map((_, i) => {
        const y = 60 + i * 20;
        const op = 0.18 + (i / 26) * 0.55;
        return (
          <path
            key={i}
            d={`M -20 ${y} C 100 ${y - 40 + Math.sin(i) * 10}, 300 ${y + 40 + Math.cos(i) * 10}, 420 ${y - 10}`}
            strokeWidth={1 + (i / 26) * 1.4}
            opacity={op}
          />
        );
      })}
    </g>
  </svg>
);

const MotifNodes = () => {
  const seed = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const pts = Array.from({ length: 36 }).map((_, i) => ({
    x: seed(i + 1) * 400,
    y: seed(i + 99) * 600,
    r: 1.2 + seed(i + 33) * 2.6,
    op: 0.25 + seed(i + 7) * 0.6,
  }));
  return (
    <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="400" height="600" fill="hsl(var(--secondary))" />
      <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25">
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

const MotifPulse = () => (
  <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <rect width="400" height="600" fill="hsl(var(--secondary))" />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 18 }).map((_, i) => (
        <circle
          key={i}
          cx={200}
          cy={300}
          r={20 + i * 18}
          strokeWidth={0.8 + i * 0.05}
          opacity={0.45 - i * 0.022}
        />
      ))}
    </g>
    <g stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5">
      <line x1="0" y1="300" x2="400" y2="300" />
      <line x1="200" y1="0" x2="200" y2="600" />
    </g>
  </svg>
);

const MotifLines = () => (
  <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <rect width="400" height="600" fill="hsl(var(--secondary))" />
    <g stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i / 60) * 400;
        const h = 40 + Math.abs(Math.sin(i * 0.7)) * 380;
        const op = 0.2 + Math.abs(Math.sin(i * 0.35)) * 0.65;
        return (
          <line
            key={i}
            x1={x}
            y1={300 - h / 2}
            x2={x}
            y2={300 + h / 2}
            strokeWidth={2}
            opacity={op}
          />
        );
      })}
    </g>
  </svg>
);

const MotifChevrons = () => (
  <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <rect width="400" height="600" fill="hsl(var(--secondary))" />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 80 + i * 38;
        const op = 0.25 + (i / 14) * 0.5;
        return (
          <path
            key={i}
            d={`M 60 ${y + 30} L 200 ${y} L 340 ${y + 30}`}
            strokeWidth={1.6}
            opacity={op}
          />
        );
      })}
    </g>
  </svg>
);

const MOTIFS = [MotifWaves, MotifNodes, MotifGrid, MotifLines, MotifPulse, MotifChevrons];

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
    // -22deg .. +22deg
    const next = Math.max(-22, Math.min(22, delta * 38));
    setTilt(next);
  }, [scrollTick, containerRef]);

  return (
    <Link
      ref={ref}
      to={`/industries#${ind.id}`}
      className="group relative block shrink-0 snap-center"
      style={{
        width: "clamp(240px, 28vw, 320px)",
        perspective: "1200px",
      }}
    >
      <div
        className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out will-change-transform group-hover:!rotate-y-0"
        style={{
          transform: `rotateY(${tilt}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Motif />
        {/* legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/10" />
        {/* edge glow on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-1 ring-inset ring-primary/40" />

        <div className="relative flex h-full flex-col justify-between p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              {ind.regulation}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold leading-tight text-white">{ind.name}</h3>
            <p className="mt-3 text-xs font-light leading-relaxed text-white/70 line-clamp-3">
              {ind.outcome}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ---------- Carousel ----------

export const IndustriesCarousel = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [tick, setTick] = useState(0);
  const dragState = useRef<{ down: boolean; startX: number; scroll: number }>({
    down: false,
    startX: 0,
    scroll: 0,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTick((t) => t + 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    setTick((t) => t + 1);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    dragState.current = { down: true, startX: e.pageX, scroll: el.scrollLeft };
    el.classList.add("cursor-grabbing");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.down) return;
    const el = wrapRef.current;
    if (!el) return;
    el.scrollLeft = dragState.current.scroll - (e.pageX - dragState.current.startX);
  };
  const stopDrag = () => {
    dragState.current.down = false;
    wrapRef.current?.classList.remove("cursor-grabbing");
  };

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth py-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        Drag · scroll to explore
      </p>
    </div>
  );
};

export default IndustriesCarousel;
