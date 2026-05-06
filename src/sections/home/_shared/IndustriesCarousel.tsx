import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INDUSTRIES, type Industry } from "@content/industries";

/**
 * IndustriesCarousel — on-brand, light-theme horizontal card rail.
 * Cards use the white/border/primary system (no dark fills). A subtle
 * 3D tilt based on distance-from-center adds motion without breaking
 * the editorial feel. Prev/Next arrow controls make interaction obvious.
 */

// ---------- Per-industry motifs — light theme, primary-only accents ----------

type MotifProps = { id: string };

const MotifGrid = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="80%" cy="20%" r="70%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.35">
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 30} y1={0} x2={i * 30 - 60} y2={360} />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 38} x2={400} y2={i * 38 + 18} />
      ))}
    </g>
  </svg>
);

const MotifWaves = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="80%" cy="20%" r="70%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 18 }).map((_, i) => {
        const y = 30 + i * 18;
        const op = 0.18 + (i / 18) * 0.5;
        return (
          <path
            key={i}
            d={`M -20 ${y} C 100 ${y - 30 + Math.sin(i) * 8}, 300 ${y + 30 + Math.cos(i) * 8}, 420 ${y - 8}`}
            strokeWidth={1 + (i / 18) * 1.2}
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
  const pts = Array.from({ length: 26 }).map((_, i) => ({
    x: seed(i + 1) * 400,
    y: seed(i + 99) * 360,
    r: 1.4 + seed(i + 33) * 2.4,
    op: 0.3 + seed(i + 7) * 0.55,
  }));
  return (
    <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={`g-${id}`} cx="80%" cy="20%" r="70%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="360" fill={`url(#g-${id})`} />
      <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3">
        {pts.map((p, i) =>
          pts
            .slice(i + 1)
            .filter((q) => Math.hypot(p.x - q.x, p.y - q.y) < 110)
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
      <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 14 }).map((_, i) => (
        <circle
          key={i}
          cx={200}
          cy={180}
          r={18 + i * 16}
          strokeWidth={0.7 + i * 0.04}
          opacity={0.5 - i * 0.028}
        />
      ))}
    </g>
  </svg>
);

const MotifBars = ({ id }: MotifProps) => (
  <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
    <defs>
      <radialGradient id={`g-${id}`} cx="80%" cy="80%" r="70%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.16" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g stroke="hsl(var(--primary))" strokeLinecap="round">
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (i / 50) * 400;
        const h = 30 + Math.abs(Math.sin(i * 0.7)) * 240;
        const op = 0.22 + Math.abs(Math.sin(i * 0.35)) * 0.6;
        return (
          <line
            key={i}
            x1={x}
            y1={180 - h / 2}
            x2={x}
            y2={180 + h / 2}
            strokeWidth={1.6}
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
      <radialGradient id={`g-${id}`} cx="50%" cy="80%" r="70%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="360" fill={`url(#g-${id})`} />
    <g fill="none" stroke="hsl(var(--primary))" strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: 10 }).map((_, i) => {
        const y = 60 + i * 32;
        const op = 0.28 + (i / 10) * 0.5;
        return (
          <path
            key={i}
            d={`M 60 ${y + 26} L 200 ${y} L 340 ${y + 26}`}
            strokeWidth={1.6}
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
    // softer tilt: -10..+10
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
        className="relative h-[260px] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.25)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.45)]"
        style={{
          transform: `rotateY(${tilt}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Motif id={ind.id} />

        {/* subtle right-side fade so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />

        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              {String(index + 1).padStart(2, "0")} · Industry
            </span>
            <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
              {ind.regulation}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold leading-tight text-secondary">{ind.name}</h3>
            <p className="mt-2 text-xs font-light leading-relaxed text-muted-foreground line-clamp-3">
              {ind.outcome}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Explore
              <ChevronRight className="h-3 w-3" />
            </span>
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
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const dragState = useRef<{ down: boolean; startX: number; scroll: number; moved: boolean }>({
    down: false,
    startX: 0,
    scroll: 0,
    moved: false,
  });

  const updateState = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    setTick((t) => t + 1);
  }, []);

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

  const scrollByCards = (dir: 1 | -1) => {
    const el = wrapRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("a");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.6;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // drag-to-scroll, but suppress click only after meaningful drag
  const onMouseDown = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    dragState.current = { down: true, startX: e.pageX, scroll: el.scrollLeft, moved: false };
    el.classList.add("cursor-grabbing");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.down) return;
    const el = wrapRef.current;
    if (!el) return;
    const dx = e.pageX - dragState.current.startX;
    if (Math.abs(dx) > 5) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scroll - dx;
  };
  const stopDrag = () => {
    dragState.current.down = false;
    wrapRef.current?.classList.remove("cursor-grabbing");
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
        className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

      {/* Arrow controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          aria-label="Previous industries"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-secondary transition-all duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          aria-label="Next industries"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-secondary transition-all duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default IndustriesCarousel;
