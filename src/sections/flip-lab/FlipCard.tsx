import { useState, type ReactNode, type ElementType } from "react";
import { Link } from "react-router-dom";

interface Props {
  eyebrow: string;
  title: string;
  footer: string;
  backTitle: string;
  backBody: string;
  chips: string[];
  ctaLabel: string;
  motif: ReactNode;
  to?: string;
}

/**
 * FlipCard — front shows eyebrow + title with a cyan motif.
 * Back shows backTitle, body, chips, and a CTA.
 * If `to` is provided, the whole card becomes a Link.
 */
export const FlipCard = ({
  eyebrow,
  title,
  footer,
  backTitle,
  backBody,
  chips,
  ctaLabel,
  motif,
  to,
}: Props) => {
  const [hover, setHover] = useState(false);

  const Wrapper = (to ? Link : "div") as ElementType;
  const wrapperProps: Record<string, unknown> = to ? { to } : {};

  return (
    <Wrapper
      {...wrapperProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-hover={hover ? "true" : undefined}
      className="flip-card relative block h-full min-h-[340px] rounded-xl"
    >
      <div className="flip-card-inner relative h-full w-full">
        {/* FRONT */}
        <div className="flip-card-face flip-card-front">
          <div className="relative h-full overflow-hidden p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flip-motif-mask"
            >
              {motif}
            </div>

            <div className="relative flex h-full flex-col">
              <div className="max-w-[75%]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  {eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-snug text-secondary">
                  {title}
                </h3>
              </div>
              <div className="mt-auto">
                <p className="text-xs font-light uppercase tracking-[0.18em] text-muted-foreground">
                  {footer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-face flip-card-back">
          <div className="relative h-full p-6">
            <div className="relative flex h-full flex-col">
              <h3 className="text-lg font-bold leading-snug text-secondary">
                {backTitle}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-secondary/80">
                {backBody}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex w-fit items-center rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.6)]">
                {ctaLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FlipCard;
