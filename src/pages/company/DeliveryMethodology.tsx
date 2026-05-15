import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import DarkSection from "@shared/DarkSection";
import { cn } from "@/lib/utils";
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

      <div className="border-t border-border" />

      {/* Engagement stages — dark zigzag */}
      <DarkSection id="stages" className="section scroll-mt-24">
        <SectionMarker page="Company / Delivery Methodology" name="Engagement stages" />
        <div className="container-page">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Engagement model
              </p>
              <h2 className="text-4xl md:text-5xl leading-[1.05] font-bold tracking-tight text-background">
                Advisory → Architecture → Implementation → Knowledge Transfer → Support
              </h2>
              <p className="mt-4 text-base font-light text-background/70 leading-relaxed">
                Each stage has a defined deliverable. No generic consulting language — only what we hand back to you.
              </p>
            </div>
          </Reveal>

          <ol className="mt-14 relative">
            {/* central rail */}
            <span
              aria-hidden
              className="absolute left-3.5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-white/20 to-primary/30 md:-translate-x-1/2"
            />
            {ENGAGEMENT_STAGES.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={s.name} delay={i * 70}>
                  <li className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-10 pb-10 last:pb-0">
                    {/* node */}
                    <span
                      aria-hidden
                      className="absolute left-0 md:left-1/2 top-[7px] z-10 h-3 w-3 rounded-full border-2 border-primary bg-primary/30 md:-translate-x-1/2"
                    />

                    <div
                      className={cn(
                        "group relative overflow-hidden rounded-xl border border-white/10 bg-background/[0.04] backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.55)] hover:-translate-y-0.5",
                        right ? "md:col-start-2" : "md:col-start-1",
                      )}
                    >
                      {/* shimmer sweep */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                      />
                      {/* large bg numeral */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-4 -right-2 text-[100px] font-bold leading-none text-background/[0.06] transition-colors duration-300 group-hover:text-background/[0.12]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          Stage 0{i + 1}
                        </p>
                        <h3 className="mt-3 text-xl font-bold text-background leading-tight">
                          {s.name}
                        </h3>
                        <p className="mt-2 text-sm font-light text-background/70 leading-relaxed">
                          {s.detail}
                        </p>
                      </div>
                      {/* bottom border sweep */}
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full"
                      />
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </DarkSection>

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

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {/* Scope */}
            <Reveal delay={0}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.2)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Scope</p>
                <p className="mt-2 text-base font-bold text-secondary">What we review</p>
                <ul className="mt-5 space-y-2.5">
                  {IBM_PLATFORM_ASSESSMENT.scope.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm font-light text-muted-foreground leading-relaxed">
                      <span className="mt-[9px] shrink-0 h-px w-2.5 bg-primary/50" />
                      {s}
                    </li>
                  ))}
                </ul>
                <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>

            {/* Deliverable */}
            <Reveal delay={60}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.2)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Deliverable</p>
                <p className="mt-2 text-base font-bold text-secondary">Written findings report</p>
                <ul className="mt-5 space-y-2.5">
                  {IBM_PLATFORM_ASSESSMENT.deliverable.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm font-light text-muted-foreground leading-relaxed">
                      <span className="mt-[9px] shrink-0 h-px w-2.5 bg-primary/50" />
                      {d}
                    </li>
                  ))}
                </ul>
                <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>

            {/* Next step */}
            <Reveal delay={120}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.2)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Next step</p>
                <p className="mt-2 text-base font-bold text-secondary">After the report</p>
                <p className="mt-5 text-sm font-light text-muted-foreground leading-relaxed">
                  {IBM_PLATFORM_ASSESSMENT.next}
                </p>
                <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
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
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.2)]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {f.framework}
                  </p>
                  <p className="mt-2 text-base font-bold text-secondary">{f.industry}</p>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {f.detail}
                  </p>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Same-practitioners commitment — dark */}
      <DarkSection id="commitment" intensity="vivid" className="section scroll-mt-24">
        <SectionMarker page="Company / Delivery Methodology" name="Commitment" />
        <div className="container-page">
          <Reveal>
            <div className="max-w-3xl relative">
              <span
                aria-hidden
                className="absolute -top-12 -left-2 text-[160px] leading-none font-bold text-primary/30 select-none"
              >
                “
              </span>
              <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Same practitioners
              </p>
              <h2 className="relative mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">
                Advisory and delivery are not separate teams.
              </h2>
              <p className="relative mt-6 text-base md:text-lg font-light text-white/80 leading-relaxed">
                {SAME_PRACTITIONERS_COMMITMENT}
              </p>
            </div>
          </Reveal>
        </div>
      </DarkSection>

      <PageFinalCtaSection
        pageLabel="Company / Delivery Methodology"
        eyebrow="Methodology"
        title="Walk through the engagement model with us."
      />
    </Layout>
  );
};

export default DeliveryMethodology;
