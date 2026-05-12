import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import PageHeroBackdrop from "./PageHeroBackdrop";

export interface PageHeroAnchor {
  href: string;
  label: string;
}

interface Props {
  /** SectionMarker "page" label, e.g. "Industries / Healthcare". */
  pageLabel: string;
  /** Breadcrumb parent, e.g. "Solutions". Hidden when `eyebrow` is provided. */
  parent?: string;
  /** Optional href — when set, parent renders as a link back to that route. */
  parentTo?: string;
  /** Breadcrumb child, e.g. practice/industry/service name. */
  child?: string;
  /** Custom eyebrow override (e.g. detail pages: "Healthcare · Apr 2025"). */
  eyebrow?: ReactNode;
  /** Optional back link (detail pages). */
  backLink?: { to: string; label: string };
  /** Main H1. */
  headline: string;
  /** Subhead under the H1. */
  lede?: string;
  /** Small uppercase line below the lede (e.g. industry regulation). */
  meta?: string;
  /** On-page nav anchors. Hidden when empty. */
  anchors?: PageHeroAnchor[];
  /** Right-side wireframe figure for the backdrop. */
  figure?: ReactNode;
  /** Tailwind min-height. Defaults to `min-h-[70vh]`. */
  minHeight?: string;
  /** Constrain headline width. Defaults to `max-w-4xl`. */
  maxWidth?: string;
  /** H1 size class. Defaults to template-page size. */
  headlineSize?: string;
  /** Section id for anchor links. Defaults to "hero". */
  id?: string;
}

/**
 * Shared template-page hero.
 * One shape for Solutions / Industries / Services / Resources / Company.
 *
 * Layout: eyebrow → headline → lede → meta → anchors.
 * Backdrop: grid + figure + cyan washes (`PageHeroBackdrop`).
 */
export const PageHero = ({
  pageLabel,
  parent,
  parentTo,
  child,
  eyebrow,
  backLink,
  headline,
  lede,
  meta,
  anchors,
  figure,
  minHeight = "min-h-[70vh]",
  maxWidth = "max-w-4xl",
  headlineSize = "text-4xl md:text-5xl lg:text-6xl",
  id = "hero",
}: Props) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setCursor({ x, y }));
    };
    const onLeave = () => setCursor(null);

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${minHeight} flex items-center`}
    >
      <SectionMarker page={pageLabel} name="Hero" />
      <PageHeroBackdrop figure={figure} cursor={cursor} />

      <div className="container-page relative z-10 pt-16 pb-12 md:pt-20 md:pb-16">
        <Reveal>
          {backLink ? (
            <Link
              to={backLink.to}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="size-3.5" />
              {backLink.label}
            </Link>
          ) : null}

          <div className={maxWidth}>
            {eyebrow ? (
              <p className="eyebrow flex items-center gap-3">{eyebrow}</p>
            ) : parent || child ? (
              <p className="eyebrow flex items-center gap-3">
                {!parentTo && <span className="inline-block h-px w-8 bg-primary" />}
                {parent ? (
                  parentTo ? (
                    <Link
                      to={parentTo}
                      className="text-muted-foreground underline-offset-4 decoration-muted-foreground/40 hover:text-primary hover:underline hover:decoration-primary transition-colors"
                    >
                      {parent}
                    </Link>
                  ) : (
                    <span>{parent}</span>
                  )
                ) : null}
                {parent && child ? (
                  <span className="text-muted-foreground/60">/</span>
                ) : null}
                {child ? <span>{child}</span> : null}
              </p>
            ) : null}

            <h1
              className={`mt-6 ${headlineSize} font-bold leading-[1.05] tracking-tight text-secondary`}
            >
              {headline}
            </h1>

            {lede ? (
              <p className="mt-6 max-w-2xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
                {lede}
              </p>
            ) : null}

            {meta ? (
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                {meta}
              </p>
            ) : null}

            {anchors && anchors.length > 0 ? (
              <nav
                aria-label="On this page"
                className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-muted-foreground"
              >
                {anchors.map((a, i) => (
                  <span key={a.href} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-muted-foreground/40">·</span>
                    )}
                    <a
                      href={a.href}
                      className="transition-colors hover:text-primary focus-visible:text-primary"
                    >
                      {a.label}
                    </a>
                  </span>
                ))}
              </nav>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PageHero;
