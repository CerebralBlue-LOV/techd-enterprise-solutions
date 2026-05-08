import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import ResourceHeroBackdrop from "@/sections/resources/_components/ResourceHeroBackdrop";
import { RESOURCES } from "@content/resources";

const items = RESOURCES.filter((r) => r.type === "case-studies" && !r.draft);

const CaseStudies = () => (
  <Layout>
    <SEO
      title="Case Studies — TechD"
      description="Named enterprise engagements from TechD. Client stories from health systems, media companies, insurers, and more — each one verified, none invented."
    />

    {/* Hero */}
    <section className="relative overflow-hidden min-h-[40vh] flex items-center">
      <SectionMarker page="Resources / Case Studies" name="Hero" />
      <ResourceHeroBackdrop />
      <div className="container-page relative z-10 pt-20 pb-16 md:pt-28 md:pb-20">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Resources / Case Studies"
            title="Named in the work, not the slides."
            subtitle="A growing record of enterprise engagements — each one verified, none invented."
          />
        </Reveal>
      </div>
    </section>

    {/* Card grid */}
    <section className="section bg-muted/30">
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

    {/* CTA */}
    <section className="section">
      <SectionMarker page="Resources / Case Studies" name="CTA" />
      <div className="container-page">
        <Reveal>
          <div className="rounded-2xl border border-border bg-background p-10 md:p-14 text-center">
            <p className="eyebrow mb-3">Ready to be the next story?</p>
            <h2 className="text-3xl md:text-4xl leading-[1.1] max-w-3xl mx-auto">
              Let's talk about what we can build together.
            </h2>
            <p className="mt-5 text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto">
              Every engagement starts with a discovery conversation — senior IBM-certified architects,
              no boilerplate deck.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="btn-glow">
                <Link to="/contact">
                  Talk to an expert <ArrowRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </Layout>
);

export default CaseStudies;
