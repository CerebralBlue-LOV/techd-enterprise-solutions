import { useParams } from "react-router-dom";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ResourcesFigure from "@shared/heroFigures/ResourcesFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import NotFound from "@pages/NotFound";
import { RESOURCES } from "@content/resources";

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

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = RESOURCES.find(
    (r) => r.type === "events" && r.slug === slug && !r.draft,
  );

  if (!event) return <NotFound />;

  return (
    <Layout>
      <SEO
        title={`${event.title} — TechD`}
        description={event.summary}
      />

      <PageHero
        pageLabel="Resources / Events"
        backLink={{ to: "/resources/events", label: "Events" }}
        eyebrow={
          <>
            <span className="inline-block h-px w-8 bg-primary" />
            {formatLabel(event.format) && (
              <>
                <span>{formatLabel(event.format)}</span>
                <span className="text-muted-foreground/60">·</span>
              </>
            )}
            <span>{event.date}</span>
            {event.location && (
              <>
                <span className="text-muted-foreground/60">·</span>
                <span>{event.location}</span>
              </>
            )}
          </>
        }
        headline={event.title}
        lede={event.summary}
        figure={<ResourcesFigure />}
        minHeight="min-h-[55vh]"
        maxWidth="max-w-3xl"
        headlineSize="text-3xl md:text-4xl lg:text-5xl"
      />

      {event.body && event.body.length > 0 && (
        <section id="content" className="section">
          <SectionMarker page="Resources / Events" name="Detail Body" />
          <div className="container-page">
            <Reveal>
              <div className="max-w-2xl space-y-6">
                {event.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg font-light text-secondary/80 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <PageFinalCtaSection
        pageLabel="Resources / Events"
        eyebrow={event.registrationUrl ? "Save your seat" : "Want an invite?"}
        title={
          event.registrationUrl
            ? "Register for this event."
            : "Talk to an architect who's done it."
        }
        lede="Small rooms, senior conversations. Tell us where you are — we'll bring the right people to the first call."
        secondary={{ label: "More events", to: "/resources/events" }}
      />
    </Layout>
  );
};

export default EventDetail;
