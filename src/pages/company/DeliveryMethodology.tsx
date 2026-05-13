import { Compass, Layout as LayoutIcon, Hammer, GraduationCap, LifeBuoy } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import CompanyFigure from "@shared/heroFigures/CompanyFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import DarkSection from "@shared/DarkSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { cn } from "@/lib/utils";
import {
  ENGAGEMENT_STAGES,
  IBM_PLATFORM_ASSESSMENT,
  COMPLIANCE_FRAMEWORKS,
  SAME_PRACTITIONERS_COMMITMENT,
} from "@content/about";

const STAGE_ICONS = [Compass, LayoutIcon, Hammer, GraduationCap, LifeBuoy];

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

      {/* Engagement stages — vertical timeline / zigzag */}
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

          <ol className="mt-14 relative">
            {/* central rail */}
            <span
              aria-hidden
              className="absolute left-3.5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-primary/20 md:-translate-x-1/2"
            />
            {ENGAGEMENT_STAGES.map((s, i) => {
              const Icon = STAGE_ICONS[i] ?? Compass;
              const right = i % 2 === 1;
              return (
                <Reveal key={s.name} delay={i * 60}>
                  <li
                    className={cn(
                      "relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 pb-10 last:pb-0",
                    )}
                  >
                    {/* node */}
                    <span
                      aria-hidden
                      className="absolute left-0 md:left-1/2 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-primary bg-background text-[11px] font-bold text-primary md:-translate-x-1/2"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={cn(
                        "relative overflow-hidden rounded-xl border border-border bg-background p-5 md:p-6",
                        right ? "md:col-start-2" : "md:col-start-1",
                      )}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-6 -right-2 text-[100px] font-bold leading-none text-primary/[0.05]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Stage 0{i + 1}
                          </p>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-secondary leading-tight">
                          {s.name}
                        </h3>
                        <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                          {s.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* IBM Platform Assessment — accordion */}
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
          <Reveal delay={60}>
            <div className="mt-12 rounded-xl border border-border bg-background">
              <Accordion type="single" collapsible defaultValue="scope">
                <AccordionItem value="scope" className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                        Scope
                      </span>
                      <span className="text-base font-bold text-secondary">
                        What we review
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-2.5">
                      {IBM_PLATFORM_ASSESSMENT.scope.map((s) => (
                        <li
                          key={s}
                          className="text-sm font-light text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-px before:w-2 before:bg-primary"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deliverable" className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                        Deliverable
                      </span>
                      <span className="text-base font-bold text-secondary">
                        Written findings report
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-2.5">
                      {IBM_PLATFORM_ASSESSMENT.deliverable.map((d) => (
                        <li
                          key={d}
                          className="text-sm font-light text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-px before:w-2 before:bg-primary"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="next" className="border-b border-border last:border-0">
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <span className="flex items-center gap-3 text-left">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                        Next step
                      </span>
                      <span className="text-base font-bold text-secondary">
                        After the report
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {IBM_PLATFORM_ASSESSMENT.next}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Reveal>
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
                  <p className="mt-2 text-sm font-bold text-secondary">{f.industry}</p>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
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
      <DarkSection id="commitment" intensity="vivid" className="scroll-mt-24 py-24 md:py-32">
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
