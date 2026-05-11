import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { Button } from "@ui/button";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

const panelBg: CSSProperties = {
  background:
    "linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.92) 60%, hsl(220 15% 12%) 100%)",
};

export const PracticeCtaSection = ({ practice }: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Final CTA" />
    <div className="container-page">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_30px_80px_-30px_hsl(var(--secondary)/0.6)] motion-reduce:[&_*]:!animate-none"
          style={panelBg}
        >
          {/* Animated background layers — mirrors ProductsGridSection */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -inset-1/2 opacity-30 animate-shimmer-rotate"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / 0.35) 60deg, transparent 140deg, hsl(var(--primary) / 0.25) 240deg, transparent 320deg)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute -top-1/4 -left-1/4 h-[80%] w-[80%] rounded-full animate-blob-a"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 60%)",
                filter: "blur(50px)",
              }}
            />
            <div
              className="absolute top-0 -right-1/4 h-[75%] w-[75%] rounded-full animate-blob-b"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />
            <div
              className="absolute -bottom-1/4 left-1/4 h-[70%] w-[70%] rounded-full animate-blob-c"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)",
                filter: "blur(55px)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />
          </div>

          {/* Content — single column, centered, minimal */}
          <div className="relative mx-auto max-w-3xl px-8 py-20 md:px-12 md:py-28 text-center">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
              {practice.name}
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-background tracking-tight">
              Ready when you are.
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-base md:text-lg font-light text-background/75 leading-relaxed">
              One conversation with a senior IBM-certified architect. No relay, no junior swap after signature.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-glow h-14 px-10 text-base">
                <Link to="/contact">Talk to an expert</Link>
              </Button>
              <Link
                to="/company/customers"
                className="group inline-flex items-center gap-2 h-14 px-8 rounded-md border border-background/25 text-sm font-bold uppercase tracking-wider text-background/90 transition-colors duration-200 hover:border-background hover:bg-background/5 hover:text-background"
              >
                View our clients
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PracticeCtaSection;
