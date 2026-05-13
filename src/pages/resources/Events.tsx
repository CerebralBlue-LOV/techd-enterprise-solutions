import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ResourcesFigure from "@shared/heroFigures/ResourcesFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import { RESOURCES } from "@content/resources";

const items = RESOURCES.filter((r) => r.type === "events" && !r.draft);

const formatLabel = (f?: string) => {
  switch (f) {
    case "virtual":
      return "Virtual";
    case "in-person":
      return "In-person";
    case "conference":
      return "Conference";
    case "roundtable":
      return "Roundtable";
    default:
      return null;
  }
};

const Events = () => (
  <Layout>
    <SEO
      title="Events — TechD"
      description="Workshops, roundtables, and conference appearances from TechD — practitioner sessions for people delivering enterprise AI on the IBM stack."
    />

    <PageHero
      pageLabel="Resources / Events"
      parent="Resources"
      child="Events"
      headline="Where we'll be next."
      lede="Working sessions, roundtables, and IBM conference appearances — small rooms, senior conversations."
      figure={<ResourcesFigure />}
    />

    <section id="list" className="section bg-muted/30">
      <SectionMarker page="Resources / Events" name="List" />
      <div className="container-page">
        {items.length === 0 ? (
          <Reveal>
            <div className="max-w-md">
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                Our 2026 calendar is being confirmed. Reach out and we'll let
                you know when sessions in your region open up.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/contact">Get on the list</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <Link
                  to={`/resources/events/${r.slug}`}
                  className="card-hover group block h-full rounded-xl p-6"
                >
                  {formatLabel(r.format) && (
                    <p className="eyebrow mb-2">{formatLabel(r.format)}</p>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-secondary leading-snug">
                      {r.title}
                    </h3>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {r.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs font-medium text-muted-foreground/60">
                    <span>{r.date}</span>
                    {r.location && (
                      <>
                        <span>·</span>
                        <span>{r.location}</span>
                      </>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>

    <PageFinalCtaSection
      pageLabel="Resources / Events"
      eyebrow="Can't make it?"
      title="Talk to an architect who's done it."
      lede="We run private working sessions for engineering and platform teams between events."
    />
  </Layout>
);

export default Events;
