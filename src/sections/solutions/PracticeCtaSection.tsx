import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import IBMPlatinumBadge from "@shared/IBMPlatinumBadge";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

export const PracticeCtaSection = ({ practice }: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="relative bg-background border border-border shadow-[0_32px_64px_-16px_hsl(var(--secondary)/0.08)] overflow-hidden rounded-lg">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" aria-hidden="true" />

          <div className="grid lg:grid-cols-12">
            {/* Primary engagement column */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 lg:border-r border-border">
              <p className="eyebrow mb-6">Ready when you are</p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-secondary">
                {practice.outcome}
              </h2>

              <p className="mt-6 text-lg md:text-xl font-light text-muted-foreground max-w-xl">
                Tell us where you are with {practice.name.toLowerCase()} — we'll bring senior
                IBM-certified architects who've shipped in production for Fortune 500
                organizations to the first call.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-colors"
                >
                  Talk to an expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center px-8 py-4 border border-secondary text-secondary font-bold uppercase tracking-wider rounded-md hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Browse products
                </a>
              </div>
            </div>

            {/* Trust & contact column */}
            <div className="lg:col-span-5 bg-muted/40 p-8 sm:p-12 md:p-16 flex flex-col justify-between gap-12">
              <div className="space-y-10">
                {/* Response promise */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Response promise
                  </h4>
                  <p className="text-2xl font-bold text-secondary leading-snug">
                    A senior architect replies within{" "}
                    <span className="text-primary">one business day.</span>
                  </p>
                </div>

                {/* Partner credential */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Accreditation
                  </h4>
                  <IBMPlatinumBadge size="md" />
                </div>

                {/* Engagement model */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    What you get
                  </h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-px w-3 bg-primary shrink-0" aria-hidden="true" />
                      Direct line to senior IBM-certified architects
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-px w-3 bg-primary shrink-0" aria-hidden="true" />
                      Working session, not a sales pitch
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-px w-3 bg-primary shrink-0" aria-hidden="true" />
                      Reference architectures from Fortune 500 deployments
                    </li>
                  </ul>
                </div>
              </div>

              {/* Direct line */}
              <div className="pt-8 border-t border-border">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Direct line
                </p>
                <a
                  href="tel:8889883243"
                  className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
                >
                  888-98-TECHD
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PracticeCtaSection;
