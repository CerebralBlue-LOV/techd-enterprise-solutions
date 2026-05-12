import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { Button } from "@ui/button";
import { type Product, type Solution } from "@content/solutions";
import { PRACTICE_MOTIFS } from "@content/practice-motifs";
import { cn } from "@/lib/utils";

interface Props {
  practice: Solution;
}

const GLOW_POSITIONS = [
  { x: "20%", y: "15%" },
  { x: "80%", y: "20%" },
  { x: "75%", y: "85%" },
  { x: "15%", y: "80%" },
  { x: "50%", y: "10%" },
  { x: "50%", y: "90%" },
];

const AUTO_MS = 7000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const productHref = (practiceId: string, product: Product) =>
  product.link.kind === "external"
    ? product.link.url
    : `/solutions/${practiceId}/${product.link.slug}`;

const ProductLink = ({
  practiceId,
  product,
  className,
  children,
  ariaLabel,
}: {
  practiceId: string;
  product: Product;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) => {
  if (product.link.kind === "external") {
    return (
      <a
        href={product.link.url}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={`/solutions/${practiceId}/${product.link.slug}`}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

const SlideContent = ({
  product,
  direction,
  reverse,
  className,
}: {
  product: Product;
  direction: "in" | "out";
  reverse: boolean;
  className?: string;
}) => {
  const isIn = direction === "in";
  // Forward: out → left, in ← right. Reverse: out → right, in ← left.
  const anim = isIn
    ? reverse
      ? "animate-slide-in-left"
      : "animate-slide-in-right"
    : reverse
      ? "animate-slide-out-right"
      : "animate-slide-out-left";
  // Incoming waits for the outgoing exit (1400ms) before starting.
  const baseDelay = isIn ? 1400 : 0;
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div
        className={cn("flex items-start gap-3", anim)}
        style={{ animationDelay: `${baseDelay}ms` }}
      >
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-white tracking-tight">
          {product.name}
        </h3>
      </div>
      <div
        className={cn("mt-auto pt-10", anim)}
        style={{ animationDelay: `${baseDelay + (isIn ? 160 : 0)}ms` }}
      >
        <p className="text-base md:text-lg font-bold text-white leading-snug">
          {product.tagline}
        </p>
        <p
          className={cn(
            "mt-3 text-sm md:text-base font-light text-white/75 leading-relaxed line-clamp-3",
            anim,
          )}
          style={{ animationDelay: `${baseDelay + (isIn ? 300 : 0)}ms` }}
        >
          {product.description}
        </p>
      </div>
    </div>
  );
};

export const ProductsGridSection = ({ practice }: Props) => {
  const products = practice.products;
  const total = products.length;
  const motif = PRACTICE_MOTIFS[practice.id];
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [reverse, setReverse] = useState(false);
  const [paused, setPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Track outgoing slide for exit animation. `dir` overrides direction
  // detection (used for auto-advance wrap-around).
  const goTo = (next: number, dir?: "forward" | "reverse") => {
    setIndex((curr) => {
      if (next === curr) return curr;
      const isReverse = dir ? dir === "reverse" : next < curr;
      setReverse(isReverse);
      setPrevIndex(curr);
      return next;
    });
  };

  // Clear outgoing layer once its animation finishes
  useEffect(() => {
    if (prevIndex === null) return;
    const t = window.setTimeout(() => setPrevIndex(null), 1500);
    return () => window.clearTimeout(t);
  }, [prevIndex, index]);

  // Auto-advance (always forward, including last → first wrap)
  useEffect(() => {
    if (paused || total <= 1) return;
    if (prefersReducedMotion()) return;
    const t = window.setTimeout(() => {
      goTo((index + 1) % total, "forward");
    }, AUTO_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, total]);

  // Keyboard navigation
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goTo((index + 1) % total, "forward");
      } else if (e.key === "ArrowLeft") {
        goTo((index - 1 + total) % total, "reverse");
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [total, index]);

  const active = products[index];
  const glow = GLOW_POSITIONS[index % GLOW_POSITIONS.length];

  const cardBg: CSSProperties = {
    background:
      "linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.92) 60%, hsl(220 15% 12%) 100%)",
  };

  return (
    <section
      id="products"
      className="section bg-muted/30 scroll-mt-24"
      aria-labelledby="products-heading"
    >
      <SectionMarker page={`Solutions / ${practice.name}`} name="Products" />
      <div className="container-page">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          {/* Left: headline */}
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-3">Products in this practice</p>
            <h2
              id="products-heading"
              className="text-4xl md:text-5xl leading-[1.05]"
            >
              The platforms and tools we deliver
            </h2>
            <p className="mt-5 text-lg text-muted-foreground font-light">
              Select any product to explore capabilities, use cases, and how we engage.
            </p>

            {/* Product quick-jump — quiet inline text links */}
            <p className="mt-6 text-sm font-light text-muted-foreground leading-relaxed">
              <span className="mr-1">Jump to:</span>
              {products.map((p, i) => {
                const isActive = i === index;
                return (
                  <span key={p.name}>
                    <ProductLink
                      practiceId={practice.id}
                      product={p}
                      className={cn(
                        "underline-offset-4 hover:underline transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-secondary hover:text-primary",
                      )}
                    >
                      {p.name}
                    </ProductLink>
                    {i < products.length - 1 && (
                      <span className="mx-1.5 text-muted-foreground/60">·</span>
                    )}
                  </span>
                );
              })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="btn-glow">
                <Link to="/contact">Talk to an expert</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources/case-studies">View case studies</Link>
              </Button>
            </div>
          </Reveal>

          {/* Right: featured card */}
          <Reveal className="lg:col-span-7">
            <div
              ref={cardRef}
              role="region"
              aria-roledescription="carousel"
              aria-label={`${practice.name} products`}
              tabIndex={0}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_30px_80px_-30px_hsl(var(--secondary)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:[&_*]:!animate-none"
              style={cardBg}
            >
              {/* Animated background layers */}
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Rotating conic shimmer */}
                <div
                  className="absolute -inset-1/2 opacity-60 animate-shimmer-rotate"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / 0.7) 60deg, transparent 140deg, hsl(var(--primary) / 0.5) 240deg, transparent 320deg)",
                    filter: "blur(40px)",
                  }}
                />
                {/* Drifting cyan blob A */}
                <div
                  className="absolute -top-1/4 -left-1/4 h-[80%] w-[80%] rounded-full animate-blob-a"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--primary) / 0.9) 0%, transparent 60%)",
                    filter: "blur(50px)",
                  }}
                />
                {/* Drifting cyan blob B */}
                <div
                  className="absolute top-0 -right-1/4 h-[75%] w-[75%] rounded-full animate-blob-b"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, transparent 65%)",
                    filter: "blur(60px)",
                  }}
                />
                {/* Drifting cyan blob C */}
                <div
                  className="absolute -bottom-1/4 left-1/4 h-[70%] w-[70%] rounded-full animate-blob-c"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--primary) / 0.75) 0%, transparent 60%)",
                    filter: "blur(55px)",
                  }}
                />
                {/* Active-slide spotlight, cross-fades with index */}
                {prevIndex !== null && (
                  <div
                    key={`glow-out-${prevIndex}`}
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${GLOW_POSITIONS[prevIndex % GLOW_POSITIONS.length].x} ${GLOW_POSITIONS[prevIndex % GLOW_POSITIONS.length].y}, hsl(var(--primary) / 0.55), transparent 55%)`,
                      animation: "glow-fade-out 700ms ease-out forwards",
                    }}
                  />
                )}
                <div
                  key={`glow-in-${index}`}
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${glow.x} ${glow.y}, hsl(var(--primary) / 0.55), transparent 55%)`,
                    animation: "glow-fade-in 700ms ease-out forwards",
                  }}
                />

                <div
                  className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                  }}
                />
              </div>

              <div className="relative flex flex-col p-8 md:p-10 lg:p-12 min-h-[520px] md:min-h-[600px]">
                {/* Top chip row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 ring-1 ring-white/15">
                    <span className="text-xs font-normal text-white/90">
                      Featured product
                    </span>
                  </div>
                  <ProductLink
                    practiceId={practice.id}
                    product={active}
                    ariaLabel={`Open ${active.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-primary hover:ring-primary transition-colors"
                  >
                    <ArrowUpRight className="size-4" />
                  </ProductLink>
                </div>

                {/* Focal display + body, with overlapping enter/exit layers */}
                <div
                  className="relative mt-10 flex-1"
                  aria-live="polite"
                >
                  {/* Outgoing slide */}
                  {prevIndex !== null && (
                    <SlideContent
                      key={`out-${prevIndex}`}
                      product={products[prevIndex]}
                      direction="out"
                      reverse={reverse}
                      className="absolute inset-0"
                    />
                  )}
                  {/* Incoming slide */}
                  <SlideContent
                    key={`in-${index}`}
                    product={active}
                    direction="in"
                    reverse={reverse}
                    className="absolute inset-0"
                  />
                </div>

                {/* Segmented progress bar */}
                <div
                  className="mt-10 flex items-center gap-2 w-full"
                  role="tablist"
                  aria-label="Select product"
                >
                  {products.map((p, i) => {
                    const isActive = i === index;
                    return (
                      <button
                        key={p.name}
                        role="tab"
                        aria-selected={isActive}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`Show product ${i + 1} of ${total}: ${p.name}`}
                        onClick={() => goTo(i)}
                        className={cn(
                          "relative h-[3px] flex-1 overflow-hidden rounded-full transition-colors",
                          isActive
                            ? "bg-primary/30"
                            : "bg-white/15 hover:bg-white/30",
                        )}
                      >
                        {isActive && (
                          <span
                            key={`fill-${index}`}
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-full origin-left bg-white"
                            style={{
                              animation: `progress-fill ${AUTO_MS}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ProductsGridSection;
