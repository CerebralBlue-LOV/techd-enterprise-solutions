import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  featured?: boolean;
  pitch: string;
  ctaLabel: string;
  children: ReactNode;
}

/**
 * SolutionCard — full-card flip on hover with a slow rotating cyan→white
 * border beam. Front holds practice content; back holds a short pitch + CTA.
 */
export const SolutionCard = ({ to, featured, pitch, ctaLabel, children }: Props) => {
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
            </div>
            <span className="story-link mt-8 inline-block text-sm font-bold text-primary">
              {ctaLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SolutionCard;
