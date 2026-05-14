import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkGlowPanel from "@shared/DarkGlowPanel";
import { Button } from "@ui/button";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS, type ClientEntry } from "@content/industries-extras";
import { CUSTOMERS, type Customer } from "@content/site";
import { cn } from "@/lib/utils";

interface Props {
  industry: Industry;
}

type ResolvedClient = ClientEntry & { customer?: Customer };

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

const initialsOf = (name: string) =>
  name
    .replace(/[^A-Za-z0-9& ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const SlideContent = ({
  client,
  direction,
  reverse,
  className,
}: {
  client: ResolvedClient;
  direction: "in" | "out";
  reverse: boolean;
  className?: string;
}) => {
  const isIn = direction === "in";
  const anim = isIn
    ? reverse
      ? "animate-slide-in-left"
      : "animate-slide-in-right"
    : reverse
      ? "animate-slide-out-right"
      : "animate-slide-out-left";
  const baseDelay = isIn ? 1400 : 0;
  const c = client.customer;
  const logoSrc = c?.logo
    ? `${import.meta.env.BASE_URL}${(c.logoOnDark ?? c.logo).replace(/^\//, "")}`
    : null;

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Logo */}
      <div
        className={cn("flex flex-1 items-center justify-center", anim)}
        style={{ animationDelay: `${baseDelay}ms` }}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={`${client.name} logo`}
            loading="lazy"
            className={cn(
              "max-h-24 md:max-h-32 w-auto max-w-[280px] md:max-w-[360px] object-contain",
              !c?.logoOnDark && "brightness-0 invert",
            )}
          />
        ) : (
          <span className="text-6xl md:text-7xl font-bold text-white/85 tracking-tight leading-none">
            {initialsOf(client.name)}
          </span>
        )}
      </div>

      {/* Name + note */}
      <div
        className={cn("mt-8 pt-6 border-t border-white/10", anim)}
        style={{ animationDelay: `${baseDelay + (isIn ? 160 : 0)}ms` }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
          {client.name}
        </h3>
        <p
          className={cn(
            "mt-3 text-sm md:text-base font-light text-white/70 leading-relaxed",
            anim,
          )}
          style={{ animationDelay: `${baseDelay + (isIn ? 300 : 0)}ms` }}
        >
          {client.note}
        </p>
      </div>
    </div>
  );
};

export const IndustryClientsSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  const cardRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [reverse, setReverse] = useState(false);
  const [paused, setPaused] = useState(false);

  const resolved: ResolvedClient[] = (extras?.clients ?? []).slice(0, 12).map(
    (c) => ({
      ...c,
      customer: CUSTOMERS.find((x) => x.name === c.name),
    }),
  );
  const total = resolved.length;
  const active = resolved[index];
  const glow = GLOW_POSITIONS[index % GLOW_POSITIONS.length];

  const goTo = (next: number, dir?: "forward" | "reverse") => {
    setIndex((curr) => {
      if (next === curr) return curr;
      const isReverse = dir ? dir === "reverse" : next < curr;
      setReverse(isReverse);
      setPrevIndex(curr);
      return next;
    });
  };

  useEffect(() => {
    if (prevIndex === null) return;
    const t = window.setTimeout(() => setPrevIndex(null), 1500);
    return () => window.clearTimeout(t);
  }, [prevIndex, index]);

  useEffect(() => {
    if (paused || total <= 1) return;
    if (prefersReducedMotion()) return;
    const t = window.setTimeout(() => {
      goTo((index + 1) % total, "forward");
    }, AUTO_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, total]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || total <= 1) return;
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

  if (!extras?.clients?.length || !active) return null;

  return (
    <section id="clients" className="section scroll-mt-24 px-0">
      <SectionMarker page={`Industries / ${industry.name}`} name="Clients" />
      <Reveal>
        <DarkGlowPanel intensity="soft" rounded="rounded-none">
          <div className="container-page relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-12 py-16 md:py-20 lg:py-24 items-center">
            {/* Left — copy */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="space-y-4">
                <p className="eyebrow text-primary">Clients we serve</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight">
                  {extras.headline}
                </h2>
                <p className="text-base font-light text-white/65 leading-relaxed max-w-md">
                  Every logo here represents a live or completed project — we
                  don't list a name we haven't earned.
                </p>
              </div>

              {extras.stats?.length ? (
                <dl className="flex flex-wrap gap-x-8 gap-y-5">
                  {extras.stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                        {s.label}
                      </dt>
                      <dd className="text-2xl font-bold text-white leading-none">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <dl className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Featured clients
                    </dt>
                    <dd className="text-4xl font-bold text-white leading-none">
                      {total}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Regulation
                    </dt>
                    <dd className="text-2xl font-bold text-white leading-none uppercase">
                      {industry.regulation}
                    </dd>
                  </div>
                </dl>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild className="btn-glow">
                  <Link to="/contact">Talk to an expert</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
                >
                  <Link to="/resources/case-studies">View case studies</Link>
                </Button>
              </div>
            </div>

            {/* Right — featured client carousel (plain, no wrapper) */}
            <div
              className="lg:col-span-7"
              ref={cardRef}
              role="region"
              aria-roledescription="carousel"
              aria-label={`${industry.name} clients`}
              tabIndex={0}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {/* Cross-fading radial glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
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
                </div>

                <div className="relative flex flex-col p-8 md:p-10 lg:p-12 min-h-[480px] md:min-h-[540px]">
                  {/* Top chip row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-md bg-white/10 backdrop-blur-sm px-3 py-1.5 ring-1 ring-white/15">
                      <span className="text-xs font-normal text-white/90">
                        Featured client
                      </span>
                    </div>
                    {active.customer?.url ? (
                      <a
                        href={active.customer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${active.name}`}
                        className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 bg-white/10 ring-1 ring-white/15 text-white hover:bg-primary hover:ring-primary transition-colors"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : null}
                  </div>

                  {/* Slide stage */}
                  <div className="relative mt-6 flex-1" aria-live="polite">
                    {prevIndex !== null && (
                      <SlideContent
                        key={`out-${prevIndex}`}
                        client={resolved[prevIndex]}
                        direction="out"
                        reverse={reverse}
                        className="absolute inset-0"
                      />
                    )}
                    <SlideContent
                      key={`in-${index}`}
                      client={active}
                      direction="in"
                      reverse={reverse}
                      className="absolute inset-0"
                    />
                  </div>

                  {/* Segmented progress bar */}
                  {total > 1 && (
                    <div
                      className="mt-10 flex items-center gap-2 w-full"
                      role="tablist"
                      aria-label="Select client"
                    >
                      {resolved.map((c, i) => {
                        const isActive = i === index;
                        return (
                          <button
                            key={c.name}
                            role="tab"
                            aria-selected={isActive}
                            aria-current={isActive ? "true" : undefined}
                            aria-label={`Show client ${i + 1} of ${total}: ${c.name}`}
                            onClick={() => goTo(i)}
                            className="relative flex-1 py-3 flex items-center"
                          >
                            <div
                              className={cn(
                                "relative h-[3px] w-full overflow-hidden rounded-full transition-colors",
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
                                    animationPlayState: paused
                                      ? "paused"
                                      : "running",
                                  }}
                                />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

              <p className="mt-4 text-center text-[10px] font-light uppercase tracking-widest text-white/25">
                Logos remain the property of their respective owners.
              </p>
            </div>
          </div>
        </DarkGlowPanel>
      </Reveal>
    </section>
  );
};

export default IndustryClientsSection;
