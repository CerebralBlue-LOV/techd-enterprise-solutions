import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  featured?: boolean;
  pitch: string;
  ctaLabel: string;
  icon?: ReactNode;
  back?: ReactNode;
  children: ReactNode;
}

/**
 * SolutionCard — full-card flip on hover with a slow rotating cyan→white
 * border beam. Front holds practice content; back holds a short pitch + CTA.
 */
export const SolutionCard = ({ to, featured, pitch, ctaLabel, icon, back, children }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      data-featured={featured ? "true" : undefined}
      data-hover={active ? "true" : undefined}
      className="solution-card group relative block h-full min-h-[440px] lg:min-h-[480px] rounded-xl"
    >
      <div className="solution-card-inner relative h-full w-full">
        {/* FRONT */}
        <div className="solution-card-face solution-card-front">
          <span aria-hidden="true" className="solution-card-beam" />
          <div className="solution-card-surface flex h-full flex-col p-8 lg:p-10">
            {featured && (
              <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Featured
              </span>
            )}
            {icon && <div className="mb-6">{icon}</div>}
            {children}
          </div>
        </div>

        {/* BACK */}
        <div className="solution-card-face solution-card-back">
          <span aria-hidden="true" className="solution-card-beam" />
          <div className="solution-card-surface flex h-full flex-col justify-between p-8 lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {ctaLabel}
              </p>
              <p className="mt-6 text-base font-light leading-relaxed text-secondary">
                {pitch}
              </p>
              {back}
            </div>
            <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.6)] transition-transform duration-200 group-hover:translate-x-0.5">
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SolutionCard;
