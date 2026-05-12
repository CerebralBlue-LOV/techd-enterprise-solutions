import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkGlowPanel from "@shared/DarkGlowPanel";
import { Button } from "@ui/button";

interface CtaLink {
  label: string;
  to: string;
}

interface Props {
  pageLabel: string;
  /** Small uppercase label at top of panel. */
  eyebrow?: string;
  /** Main H2. Defaults to "Ready when you are." */
  title?: string;
  /** Subhead. */
  lede?: string;
  /** Primary CTA. Defaults to "Talk to an expert" → /contact. */
  primary?: CtaLink;
  /** Optional secondary link (rendered as outline-style button). */
  secondary?: CtaLink;
  markerName?: string;
}

const DEFAULT_PRIMARY: CtaLink = { label: "Talk to an expert", to: "/contact" };
const DEFAULT_LEDE =
  "One conversation with a senior IBM-certified architect. No relay, no junior swap after signature.";

/**
 * Shared Final CTA panel — animated cyan-on-dark via DarkGlowPanel.
 * Primary CTA always `btn-glow` and defaults to "Talk to an expert" → /contact.
 */
export const PageFinalCtaSection = ({
  pageLabel,
  eyebrow,
  title = "Ready when you are.",
  lede = DEFAULT_LEDE,
  primary = DEFAULT_PRIMARY,
  secondary,
  markerName = "Final CTA",
}: Props) => (
  <section className="section bg-muted/30">
    <SectionMarker page={pageLabel} name={markerName} />
    <div className="container-page">
      <Reveal>
        <DarkGlowPanel intensity="soft">
          <div className="relative mx-auto max-w-3xl px-8 py-20 md:px-12 md:py-28 text-center">
            {eyebrow ? (
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-background tracking-tight">
              {title}
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-base md:text-lg font-light text-background/75 leading-relaxed">
              {lede}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-glow h-14 px-10 text-base">
                <Link to={primary.to}>
                  {primary.label}
                  <ArrowRight className="ml-1" />
                </Link>
              </Button>
              {secondary ? (
                <Link
                  to={secondary.to}
                  className="group inline-flex items-center gap-2 h-14 px-8 rounded-md border border-background/25 text-sm font-bold uppercase tracking-wider text-background/90 transition-colors duration-200 hover:border-background hover:bg-background/5 hover:text-background"
                >
                  {secondary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </DarkGlowPanel>
      </Reveal>
    </div>
  </section>
);

export default PageFinalCtaSection;
