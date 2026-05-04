import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import HeroBackdrop from "@/components/HeroBackdrop";
import HeroFloatingCards from "@/components/HeroFloatingCards";
import { lazy, Suspense } from "react";
const HeroParticleField = lazy(() => import("@/components/HeroParticleField"));
import SectionHeading from "@/components/SectionHeading";
import LogoStrip from "@/components/LogoStrip";
import { Button } from "@/components/ui/button";
import { SOLUTIONS } from "@/content/solutions";
import { INDUSTRIES } from "@/content/industries";
import SectionMarker from "@/components/SectionMarker";

const Index = () => {
  return (
    <Layout>
      <SEO
        title="TechD — Enterprise AI, Engineered for Outcomes"
        description="IBM Platinum Business Partner delivering enterprise AI, data, security, and automation to Fortune 500 organizations."
      />

      {/* Hero */}
      <section
        data-section="home:hero"
        className="relative overflow-hidden min-h-[88vh] flex items-center"
      >
        <SectionMarker page="Home" name="Hero" />
        <HeroBackdrop />
        <Suspense fallback={null}>
          <HeroParticleField />
        </Suspense>
        <HeroFloatingCards />
        <div className="container-page relative z-10 pt-32 pb-32 md:pt-40 md:pb-40">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">IBM Platinum Business Partner</p>
              <h1 className="mt-4 text-6xl md:text-8xl leading-[1.02] font-bold tracking-tight">
                Enterprise AI,
                <br />
                <span className="text-primary">engineered for outcomes.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-xl md:text-2xl font-light text-muted-foreground">
                We design, build, and run the AI, data, security, and automation
                platforms that move Fortune 500 P&Ls — not pilots.
              </p>
              <div className="mt-12 flex flex-wrap gap-3">
                <Button asChild size="lg" className="transition-transform duration-200 hover:-translate-y-0.5">
                  <Link to="/contact">Talk to an Expert <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/solutions">Explore Solutions</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div data-section="home:logo-strip">
        <SectionMarker page="Home" name="Customer Logo Strip" />
        <LogoStrip />
      </div>

      {/* Solutions */}
      <section data-section="home:solutions" className="section">
        <SectionMarker page="Home" name="Solutions Grid" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Solutions"
              title="Five practices. One outcome: leverage."
              subtitle="Each practice is led by senior practitioners with two decades of enterprise delivery."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.id} delay={i * 50}>
                <Link
                  to={`/solutions#${s.id}`}
                  className="card-hover block h-full rounded-xl p-7 group"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {s.name}
                  </p>
                  <h3 className="mt-3 text-2xl leading-tight">{s.outcome}</h3>
                  <p className="mt-4 text-sm font-light text-muted-foreground">
                    {s.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Learn more <ArrowRight className="!size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section data-section="home:industries" className="section bg-muted/40">
        <SectionMarker page="Home" name="Industries Grid" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Built for regulated, complex enterprises."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.id} delay={i * 50}>
                <Link
                  to={`/industries#${ind.id}`}
                  className="card-hover block h-full rounded-xl p-7"
                >
                  <h3 className="text-xl">{ind.name}</h3>
                  <p className="mt-3 text-sm font-light text-muted-foreground">{ind.outcome}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case study */}
      <section data-section="home:case-study" className="section">
        <SectionMarker page="Home" name="Featured Case Study" />
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary text-secondary-foreground p-10 md:p-16">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured Case Study</p>
              <h2 className="mt-4 max-w-3xl text-4xl md:text-5xl text-secondary-foreground leading-[1.05]">
                Global pharma cuts trial review time by 62% with agentic AI.
              </h2>
              <div className="mt-10 grid gap-10 md:grid-cols-3">
                <div>
                  <div className="text-5xl font-bold text-primary">62%</div>
                  <p className="mt-2 text-sm font-light opacity-80">Faster protocol review cycles</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary">$18M</div>
                  <p className="mt-2 text-sm font-light opacity-80">Annualized operating savings</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary">11wk</div>
                  <p className="mt-2 text-sm font-light opacity-80">From kickoff to first production agent</p>
                </div>
              </div>
              <blockquote className="mt-10 max-w-3xl border-l-2 border-primary pl-5 text-lg font-light italic opacity-90">
                "TechD shipped what three other firms had only diagrammed. The
                difference was senior people on the keyboard."
                <footer className="mt-3 text-sm not-italic font-bold opacity-100">
                  — VP, Clinical Operations, Top-5 Pharmaceutical
                </footer>
              </blockquote>
              <div className="mt-10">
                <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                  <Link to="/resources?tab=case-studies">Read the case study <ArrowRight /></Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why TechD */}
      <section data-section="home:why-techd" className="section bg-muted/40">
        <SectionMarker page="Home" name="Why TechD" />
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">
          <Reveal>
            <SectionHeading eyebrow="Why TechD" title="A different kind of partner." />
            <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-border bg-background px-5 py-4">
              <div className="h-12 w-12 rounded-md bg-secondary text-background grid place-items-center font-bold">
                IBM
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">Platinum</div>
                <div className="text-base font-bold text-secondary">Business Partner</div>
                <div className="text-xs text-muted-foreground">25+ years · Top-tier delivery</div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Sparkles, title: "Senior people on the keyboard", body: "Principals deliver, not just sell. Average team tenure: 14 years." },
              { icon: ShieldCheck, title: "Built for regulators", body: "Auditable AI, governed data, defensible architecture." },
              { icon: Workflow, title: "Outcome contracts", body: "We commit to business outcomes — not staff augmentation hours." },
              { icon: Sparkles, title: "IBM-deep, multi-cloud fluent", body: "watsonx, OpenShift, Z, plus AWS, Azure, and GCP at scale." },
            ].map((d, i) => (
              <Reveal key={d.title} delay={i * 50}>
                <div className="card-hover h-full rounded-xl p-6">
                  <d.icon className="text-primary" />
                  <h3 className="mt-4 text-lg">{d.title}</h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section data-section="home:final-cta" className="section">
        <SectionMarker page="Home" name="Final CTA" />
        <div className="container-page">
          <Reveal>
            <div className="rounded-2xl border border-border bg-background p-10 md:p-16 text-center">
              <p className="eyebrow">Ready to talk?</p>
              <h2 className="mt-4 text-4xl md:text-5xl max-w-2xl mx-auto leading-[1.05]">
                Tell us where you want the next 18 months to land.
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-lg font-light text-muted-foreground">
                A 30-minute conversation with a TechD principal, not a sales pass-through.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="transition-transform duration-200 hover:-translate-y-0.5">
                  <Link to="/contact">Talk to an Expert <ArrowRight /></Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
