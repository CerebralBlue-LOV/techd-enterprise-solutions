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

const items = RESOURCES.filter((r) => r.type === "webinars" && !r.draft);

const Webinars = () => (
  <Layout>
    <SEO
      title="Webinars — TechD"
      description="Live and on-demand technical sessions on the IBM stack — RAG, FinOps, governance, and the work of putting enterprise AI into production."
    />

    <PageHero
      pageLabel="Resources / Webinars"
      parent="Resources"
      child="Webinars"
      headline="Sessions for people who ship."
      lede="Live and on-demand walkthroughs from senior IBM-certified architects — no slideware, no vendor talk track."
      figure={<ResourcesFigure />}
    />

    <section id="list" className="section bg-muted/30">
      <SectionMarker page="Resources / Webinars" name="List" />
      <div className="container-page">
        {items.length === 0 ? (
          <Reveal>
            <div className="max-w-md">
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                New sessions are being scheduled. In the meantime, our principals
                are happy to run a working session for your team directly.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/contact">Request a session</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <Link
                  to={`/resources/webinars/${r.slug}`}
                  className="card-hover group block h-full rounded-xl p-6"
                >
                  {r.products && r.products.length > 0 && (
                    <p className="eyebrow mb-2">{r.products.join(" · ")}</p>
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

    <PageFinalCtaSection
      pageLabel="Resources / Webinars"
      eyebrow="Want it for your team?"
      title="Talk to an architect who's done it."
      lede="We run private working sessions for engineering and platform teams — no recording, no marketing track."
    />
  </Layout>
);

export default Webinars;
