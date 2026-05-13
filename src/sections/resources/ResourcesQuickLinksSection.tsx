import { Link } from "react-router-dom";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";

const LINKS = [
  {
    name: "Solutions",
    tagline: "Five IBM-aligned practices — AI, data, automation, security, hybrid cloud.",
    to: "/solutions",
  },
  {
    name: "Services",
    tagline: "Advisory, implementation, managed services, and training.",
    to: "/services",
  },
  {
    name: "Industries",
    tagline: "Healthcare, insurance, public sector, media, higher ed, energy.",
    to: "/industries",
  },
];

/**
 * Quiet cross-link block on resource list pages — points to the other
 * top-level sections (Solutions / Services / Industries), mirroring the
 * hairline style of ProductRelatedSection.
 */
export const ResourcesQuickLinksSection = () => (
  <section id="more" className="bg-background scroll-mt-24">
    <SectionMarker page="Resources" name="Quick Links" />
    <div className="container-page py-12 md:py-14">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-3 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Explore the rest of TechD
          </h2>
          <Link
            to="/contact"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:underline shrink-0"
          >
            Talk to an expert
          </Link>
        </div>
      </Reveal>

      <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LINKS.map((r, i) => (
          <Reveal key={r.name} delay={i * 70}>
            <Link
              to={r.to}
              className={`group block shrink-0 snap-start w-64 ${
                i > 0 ? "border-l border-border pl-8" : ""
              }`}
            >
              <h3 className="text-base font-bold text-secondary transition-colors duration-200 group-hover:text-primary">
                {r.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
                {r.tagline}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ResourcesQuickLinksSection;
