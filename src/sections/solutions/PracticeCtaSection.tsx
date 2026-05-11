import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import IBMPlatinumBadge from "@shared/IBMPlatinumBadge";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

const STATS = [
  { value: "F500", label: "Clients shipped" },
  { value: "15+ yrs", label: "IBM partnership" },
  { value: "Platinum", label: "Tier — top 1%" },
];

export const PracticeCtaSection = ({ practice }: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-secondary">
          {/* Single quiet cyan glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl animate-[blob-drift_22s_ease-in-out_infinite] motion-reduce:animate-none"
          />

          {/* Faint grid */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-background" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>

          {/* Content */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 px-8 py-16 md:px-12 md:py-20">
            {/* Left: pitch + CTA */}
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                {practice.name}
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-background tracking-tight">
                Let's build a plan
              </h2>
              <p className="mt-5 max-w-lg text-base md:text-lg font-light text-background/75 leading-relaxed">
                A senior IBM-certified architect on the call from day one — no pre-sales relay, no junior staffing surprise after signature.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-background font-bold uppercase tracking-wider text-sm rounded-md transition-all duration-300 hover:gap-3 hover:shadow-[0_12px_32px_-8px_hsl(var(--primary)/0.6)]"
                >
                  Talk to an expert
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/company/customers"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold text-background/80 hover:text-background transition-colors"
                >
                  See who we've shipped for
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right: trust grid */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <IBMPlatinumBadge size="md" variant="inline" className="w-full justify-start bg-background/5 border-background/10" />

              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-background/10">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-secondary p-5">
                    <dt className="text-2xl md:text-3xl font-bold text-background leading-none tracking-tight">
                      {s.value}
                    </dt>
                    <dd className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-background/60 leading-snug">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PracticeCtaSection;
