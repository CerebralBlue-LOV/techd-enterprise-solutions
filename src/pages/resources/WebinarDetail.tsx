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

const WebinarDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const webinar = RESOURCES.find(
    (r) => r.type === "webinars" && r.slug === slug && !r.draft,
  );

  if (!webinar) return <NotFound />;

  const cta = webinar.registrationUrl
    ? {
        label: "Register",
        to: webinar.registrationUrl,
      }
    : undefined;

  return (
    <Layout>
      <SEO
        title={`${webinar.title} — TechD`}
        description={webinar.summary}
      />

      <PageHero
        pageLabel="Resources / Webinars"
        backLink={{ to: "/resources/webinars", label: "Webinars" }}
        eyebrow={
          <>
            <span className="inline-block h-px w-8 bg-primary" />
            <span>{webinar.date}</span>
            {webinar.products && webinar.products.length > 0 && (
              <>
                <span className="text-muted-foreground/60">·</span>
                <span>{webinar.products.join(" · ")}</span>
              </>
            )}
          </>
        }
        headline={webinar.title}
        lede={webinar.summary}
        figure={<ResourcesFigure />}
        minHeight="min-h-[55vh]"
        maxWidth="max-w-3xl"
        headlineSize="text-3xl md:text-4xl lg:text-5xl"
      />

      {webinar.body && webinar.body.length > 0 && (
        <section id="content" className="section">
          <SectionMarker page="Resources / Webinars" name="Detail Body" />
          <div className="container-page">
            <Reveal>
              <div className="max-w-2xl space-y-6">
                {webinar.body.map((para, i) => (
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
        pageLabel="Resources / Webinars"
        eyebrow={cta ? "Save your seat" : "Want it for your team?"}
        title={cta ? "Register for this session." : "Talk to an architect who's done it."}
        lede="Senior IBM-certified engineers, no slideware. Tell us where you are — we'll bring the right people to the first call."
        secondary={{ label: "More webinars", to: "/resources/webinars" }}
      />
    </Layout>
  );
};

export default WebinarDetail;
