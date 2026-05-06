import { useState, type ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  meta: string;
  footer: string;
  icon: ReactNode;
  backTitle: string;
  backBody: string;
  ctaLabel: string;
  motif: ReactNode;
}

/**
 * FlipCard — light-theme card with icon tile, eyebrow, bold title and footer.
 * Hover flips to a back face displaying an animated SVG motif and CTA.
 */
export const FlipCard = ({
  eyebrow,
  title,
  meta,
  footer,
  icon,
  backTitle,
  backBody,
  ctaLabel,
  motif,
}: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-hover={hover ? "true" : undefined}
      className="flip-card relative block h-full min-h-[280px] rounded-xl"
    >
      <div className="flip-card-inner relative h-full w-full">
        {/* FRONT */}
        <div className="flip-card-face flip-card-front">
          <div className="relative flex h-full flex-col p-6">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary shadow-[inset_0_1px_0_hsl(var(--background))]">
                {icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {meta}
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-snug text-secondary">
                {title}
              </h3>
              <p className="mt-6 text-xs font-light uppercase tracking-[0.18em] text-muted-foreground">
                {footer}
              </p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-face flip-card-back">
          <div className="relative h-full overflow-hidden p-6">
            {motif}
            <div className="relative flex h-full flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-secondary">
                {backTitle}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-secondary/80">
                {backBody}
              </p>
              <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.6)]">
                {ctaLabel}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
