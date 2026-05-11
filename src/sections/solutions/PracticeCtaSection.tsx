import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

export const PracticeCtaSection = ({ practice }: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-background">
          {/* Engineered grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              WebkitMaskImage:
                "radial-gradient(85% 90% at 50% 50%, black 40%, transparent 90%)",
              maskImage:
                "radial-gradient(85% 90% at 50% 50%, black 40%, transparent 90%)",
            }}
          />

          {/* Gradients + movement */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
          >
            {/* Slow conic shimmer — barely perceptible rotation across the whole card */}
            <div
              className="absolute -inset-1/2 animate-shimmer-rotate opacity-[0.06]"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary)) 80deg, transparent 160deg, hsl(var(--primary) / 0.6) 260deg, transparent 340deg)",
                filter: "blur(50px)",
              }}
            />
            {/* Blob A — top-left, large, slow drift */}
            <div
              className="absolute -top-1/4 -left-1/4 h-[85%] w-[65%] rounded-full animate-blob-a"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, transparent 60%)",
                filter: "blur(38px)",
              }}
            />
            {/* Blob B — bottom-right */}
            <div
              className="absolute -bottom-1/4 -right-1/4 h-[80%] w-[60%] rounded-full animate-blob-b"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 60%)",
                filter: "blur(42px)",
              }}
            />
            {/* Blob C — center-right, smaller, faster drift */}
            <div
              className="absolute top-1/4 right-[10%] h-[55%] w-[40%] rounded-full animate-blob-c"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.13) 0%, transparent 65%)",
                filter: "blur(30px)",
              }}
            />
            {/* Slow drifting gradient wash across the bottom */}
            <div
              className="absolute bottom-0 left-0 w-full h-[60%] animate-gradient-drift"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--primary) / 0.06) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center text-center px-8 py-20 md:py-28">
            <p className="eyebrow mb-6">{practice.name}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-secondary max-w-2xl">
              Let's build a plan
            </h2>
            <p className="mt-5 text-lg font-light text-muted-foreground max-w-md leading-relaxed">
              A senior IBM-certified architect, ready for your first call.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-colors shadow-[0_8px_28px_-6px_hsl(var(--primary)/0.55)]"
              >
                Talk to an expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PracticeCtaSection;
