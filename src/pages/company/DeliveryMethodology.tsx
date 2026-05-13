import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import {
  ENGAGEMENT_STAGES,
  IBM_PLATFORM_ASSESSMENT,
  COMPLIANCE_FRAMEWORKS,
  SAME_PRACTITIONERS_COMMITMENT,
} from "@content/about";

const DeliveryMethodology = () => {
  return (
    <Layout>
      <SEO
        title="Delivery Methodology — TechD"
        description="Five engagement stages, one team. IBM Platform Assessment, regulated-industry compliance frameworks, and a same-practitioners commitment from advisory through go-live."
      />

      <PageHero
        pageLabel="Company / Delivery Methodology"
        parent="Company"
        parentTo="/company/about"
        child="Delivery Methodology"
        headline="Five engagement stages. One team, advisory through go-live."
        lede="The certified practitioners who scope your engagement design the architecture and execute the implementation. No translation layer between recommendation and build."
        figure={<CompanyFigure />}
        anchors={[
          { href: "#stages", label: "Engagement stages" },
          { href: "#assessment", label: "Platform Assessment" },
          { href: "#compliance", label: "Compliance" },
          { href: "#commitment", label: "Commitment" },
        ]}
      />

      {/* Engagement stages */}
      <section id="stages" className="section scroll-mt-24">
        <SectionMarker page="Company / Delivery Methodology" name="Engagement stages" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Engagement model"
              title="Advisory → Architecture → Implementation → Knowledge Transfer → Support"
              subtitle="Each stage has a defined deliverable. No generic consulting language — only what we hand back to you."
            />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-5">
            {ENGAGEMENT_STAGES.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <li className="h-full rounded-xl border border-border p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Stage {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-secondary leading-tight">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {s.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* IBM Platform Assessment */}
      <section id="assessment" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / Delivery Methodology" name="IBM Platform Assessment" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Named offer"
              title={IBM_PLATFORM_ASSESSMENT.name}
              subtitle={IBM_PLATFORM_ASSESSMENT.format}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-xl border border-border bg-background p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Scope</p>
                <p className="mt-2 text-sm font-bold text-secondary">What we review</p>
                <ul className="mt-4 space-y-2.5">
                  {IBM_PLATFORM_ASSESSMENT.scope.map((s) => (
                    <li
                      key={s}
                      className="text-sm font-light text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-px before:w-2 before:bg-primary"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-xl border border-border bg-background p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Deliverable
                </p>
                <p className="mt-2 text-sm font-bold text-secondary">Written findings report</p>
                <ul className="mt-4 space-y-2.5">
                  {IBM_PLATFORM_ASSESSMENT.deliverable.map((d) => (
                    <li
                      key={d}
                      className="text-sm font-light text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-px before:w-2 before:bg-primary"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-xl border border-border bg-background p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Next step
                </p>
                <p className="mt-2 text-sm font-bold text-secondary">After the report</p>
                <p className="mt-4 text-sm font-light text-muted-foreground leading-relaxed">
                  {IBM_PLATFORM_ASSESSMENT.next}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Regulated-industry depth */}
      <section id="compliance" className="section scroll-mt-24">
        <SectionMarker page="Company / Delivery Methodology" name="Compliance" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Regulated-industry depth"
              title="Four frameworks we configure to"
              subtitle="The compliance posture is part of the architecture, not a separate workstream bolted on at the end."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE_FRAMEWORKS.map((f, i) => (
              <Reveal key={f.framework} delay={i * 50}>
                <div className="h-full rounded-xl border border-border p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {f.framework}
                  </p>
                  <p className="mt-2 text-sm font-bold text-secondary">{f.industry}</p>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {f.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Same-practitioners commitment */}
      <section id="commitment" className="section bg-muted/30 scroll-mt-24">
        <SectionMarker page="Company / Delivery Methodology" name="Commitment" />
        <div className="container-page">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Same practitioners
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary leading-tight">
                Advisory and delivery are not separate teams.
              </h2>
              <p className="mt-6 text-base md:text-lg font-light text-muted-foreground leading-relaxed">
                {SAME_PRACTITIONERS_COMMITMENT}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <PageFinalCtaSection
        pageLabel="Company / Delivery Methodology"
        eyebrow="Methodology"
        title="Walk through the engagement model with us."
      />
    </Layout>
  );
};

export default DeliveryMethodology;
