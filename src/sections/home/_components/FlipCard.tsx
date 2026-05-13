import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

export type FlipChip = {
  label: string;
  to?: string;
  external?: boolean;
};

interface Props {
  eyebrow: string;
  title: string;
  footer: string;
  backTitle: string;
  backBody: string;
  chips: FlipChip[];
  ctaLabel: string;
  motif: ReactNode;
  to?: string;
  compact?: boolean;
}

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
  compact = false,
}: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-hover={hover ? "true" : undefined}
      className={`flip-card relative block h-full rounded-xl ${compact ? "min-h-[180px]" : "min-h-[340px]"}`}
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
          <div className={`relative h-full ${compact ? "p-5" : "p-6"}`}>
            <div className="relative flex h-full flex-col">
              <h3 className={`font-bold leading-snug text-secondary ${compact ? "text-base" : "text-lg"}`}>
                {backTitle}
              </h3>
              <p className={`mt-2 font-light leading-relaxed text-secondary/80 ${compact ? "text-xs line-clamp-3" : "text-sm mt-3"}`}>
                {backBody}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {chips.map((chip) => {
                  const baseClass =
                    "rounded-md border border-border bg-background/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary transition-colors";
                  if (chip.to && chip.external) {
                    return (
                      <a
                        key={chip.label}
                        href={chip.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseClass} hover:border-primary hover:text-primary`}
                      >
                        {chip.label}
                      </a>
                    );
                  }
                  if (chip.to) {
                    return (
                      <Link
                        key={chip.label}
                        to={chip.to}
                        className={`${baseClass} hover:border-primary hover:text-primary`}
                      >
                        {chip.label}
                      </Link>
                    );
                  }
                  return (
                    <span key={chip.label} className={baseClass}>
                      {chip.label}
                    </span>
                  );
                })}
              </div>
              {to ? (
                <Link
                  to={to}
                  className="mt-auto inline-flex w-fit items-center rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.6)] transition-transform hover:-translate-y-0.5"
                >
                  {ctaLabel}
                </Link>
              ) : (
                <span className="mt-auto inline-flex w-fit items-center rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.6)]">
                  {ctaLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
