import { useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ResourcesFigure from "@shared/heroFigures/ResourcesFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import NotFound from "@pages/NotFound";
import { RESOURCES } from "@content/resources";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const resource = RESOURCES.find(
    (r) => r.type === "case-studies" && r.slug === slug && !r.draft,
  );

  if (!resource) return <NotFound />;

  return (
    <Layout>
      <SEO
        title={`${resource.title} — TechD`}
        description={resource.summary}
      />

      <PageHero
        pageLabel="Resources / Case Studies"
        backLink={{ to: "/resources/case-studies", label: "Case Studies" }}
        eyebrow={
          <>
            <span className="inline-block h-px w-8 bg-primary" />
            {resource.industry ?? "Case Study"}
            <span className="text-muted-foreground/60">·</span>
            <span>{resource.date}</span>
          </>
        }
        headline={resource.title}
        lede={resource.summary}
        figure={<ResourcesFigure />}
        minHeight="min-h-[55vh]"
        maxWidth="max-w-3xl"
        headlineSize="text-3xl md:text-4xl lg:text-5xl"
      />

      {resource.body && resource.body.length > 0 && (
        <section className="section">
          <SectionMarker page="Resources / Case Studies" name="Detail Body" />
          <div className="container-page">
            <Reveal>
              <div className="max-w-2xl space-y-6">
                {resource.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg font-light text-secondary/80 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            {resource.externalUrl && (
              <Reveal delay={80}>
                <div className="mt-10">
                  <a
                    href={resource.externalUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Read the IBM-published case study
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <PageFinalCtaSection
        pageLabel="Resources / Case Studies"
        eyebrow="Build something like this"
        title="Talk to the team that delivered it."
        lede="Senior IBM-certified architects, no boilerplate deck. Tell us where you are — we'll bring the right people to the first call."
        secondary={{ label: "More case studies", to: "/resources/case-studies" }}
      />
    </Layout>
  );
};

export default CaseStudyDetail;
