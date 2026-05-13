import { Link } from "react-router-dom";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";

type ResourceKey = "case-studies" | "blog" | "webinars" | "events";

const ALL: { key: ResourceKey; name: string; tagline: string; to: string }[] = [
  {
    key: "case-studies",
    name: "Case Studies",
    tagline: "Named enterprise engagements — verified, not invented.",
    to: "/resources/case-studies",
  },
  {
    key: "blog",
    name: "Blog",
    tagline: "Practical takes on the IBM stack from practitioners who ship.",
    to: "/resources/blog",
  },
  {
    key: "webinars",
    name: "Webinars",
    tagline: "Live and on-demand walkthroughs — no slideware.",
    to: "/resources/webinars",
  },
  {
    key: "events",
    name: "Events",
    tagline: "Working sessions, roundtables, and IBM conference appearances.",
    to: "/resources/events",
  },
];

interface Props {
  current: ResourceKey;
}

/**
 * Quiet "More in Resources" cross-link block — mirrors ProductRelatedSection.
 * Hairline header + horizontally scrollable typographic row of sibling
 * resource sections separated by vertical hairlines.
 */
export const ResourcesQuickLinksSection = ({ current }: Props) => {
  const siblings = ALL.filter((r) => r.key !== current);

  return (
    <section className="bg-background">
      <SectionMarker page="Resources" name="Quick Links" />
      <div className="container-page py-12 md:py-14">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-border pb-3 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              More in Resources
            </h2>
            <Link
              to="/resources/case-studies"
              className="text-xs font-bold uppercase tracking-wider text-primary hover:underline shrink-0"
            >
              View all resources
            </Link>
          </div>
        </Reveal>

        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {siblings.map((r, i) => (
            <Reveal key={r.key} delay={i * 70}>
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
};

export default ResourcesQuickLinksSection;
