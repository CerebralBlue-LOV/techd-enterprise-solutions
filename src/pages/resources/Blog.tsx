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
import ResourcesQuickLinksSection from "@sections/resources/ResourcesQuickLinksSection";
import { RESOURCES } from "@content/resources";

const posts = RESOURCES.filter((r) => r.type === "blog" && !r.draft);

const Blog = () => (
  <Layout>
    <SEO
      title="Blog — TechD"
      description="Insights on enterprise AI, data governance, security, and the IBM stack — from the TechD team."
    />

    <PageHero
      pageLabel="Resources / Blog"
      parent="Resources"
      child="Blog"
      headline="Thinking out loud on enterprise AI."
      lede="Practical takes on governance, data architecture, and the IBM stack — from practitioners who ship."
      figure={<ResourcesFigure />}
    />

    {/* Card grid / empty state */}
    <section id="list" className="section bg-muted/30">
      <SectionMarker page="Resources / Blog" name="List" />
      <div className="container-page">
        {posts.length === 0 ? (
          <Reveal>
            <div className="max-w-md">
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                Posts coming soon. In the meantime, reach out directly — our architects are
                happy to talk through what you're working on.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <Link
                  to={`/resources/blog/${r.slug}`}
                  className="card-hover group block h-full rounded-xl p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-secondary leading-snug">
                      {r.title}
                    </h3>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {r.summary}
                  </p>
                  {r.tags && r.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground/60">
                    {r.author && <span>{r.author}</span>}
                    {r.author && <span>·</span>}
                    <span>{r.date}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>

    <ResourcesQuickLinksSection current="blog" />

    <PageFinalCtaSection
      pageLabel="Resources / Blog"
      eyebrow="Put it into practice"
      title="Talk to an architect who's done it."
      lede="Ideas are worth more in production. Our senior IBM-certified engineers can help you move from concept to delivery."
    />
  </Layout>
);

export default Blog;
