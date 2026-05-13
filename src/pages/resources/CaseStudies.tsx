import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ResourcesFigure from "@shared/heroFigures/ResourcesFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import ResourcesQuickLinksSection from "@sections/resources/ResourcesQuickLinksSection";
import { RESOURCES } from "@content/resources";

const items = RESOURCES.filter((r) => r.type === "case-studies" && !r.draft);

const CaseStudies = () => (
  <Layout>
    <SEO
      title="Case Studies — TechD"
      description="Named enterprise engagements from TechD. Client stories from health systems, media companies, insurers, and more — each one verified, none invented."
    />

    <PageHero
      pageLabel="Resources / Case Studies"
      parent="Resources"
      child="Case Studies"
      headline="Named in the work, not the slides."
      lede="A growing record of enterprise engagements — each one verified, none invented."
      figure={<ResourcesFigure />}
    />

    {/* Card grid */}
    <section id="list" className="section bg-muted/30">
      <SectionMarker page="Resources / Case Studies" name="List" />
      <div className="container-page">
        {items.length === 0 ? (
          <Reveal>
            <p className="text-muted-foreground font-light">
              Case studies coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <Link
                  to={`/resources/case-studies/${r.slug}`}
                  className="card-hover group block h-full rounded-xl p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {r.industry && (
                        <p className="eyebrow mb-2">{r.industry}</p>
                      )}
                      <h3 className="text-base font-bold text-secondary leading-snug">
                        {r.title}
                      </h3>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {r.summary}
                  </p>
                  {r.products && r.products.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.products.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-xs font-medium text-muted-foreground/60">
                    {r.date}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>

    <ResourcesQuickLinksSection current="case-studies" />

    <PageFinalCtaSection
      pageLabel="Resources / Case Studies"
      eyebrow="Ready to be the next story?"
      title="Let's talk about what we can build together."
      lede="Every engagement starts with a discovery conversation — senior IBM-certified architects, no boilerplate deck."
    />
  </Layout>
);

export default CaseStudies;
