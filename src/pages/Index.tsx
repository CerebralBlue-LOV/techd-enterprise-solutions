import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Workflow, Bot, Database, Cloud, Lock, RefreshCw } from "lucide-react";

const SOLUTION_ICONS: Record<string, typeof Bot> = {
  "ai-automation": Bot,
  "data": Database,
  "cloud": Cloud,
  "security": Lock,
  "app-mod": RefreshCw,
};
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import HeroBackdrop from "@/components/HeroBackdrop";
import SectionBackdrop from "@/components/SectionBackdrop";
import { lazy, Suspense } from "react";
const HeroParticleField = lazy(() => import("@/components/HeroParticleField"));
const ParticleGlobe = lazy(() => import("@/components/ParticleGlobe"));
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
        title="TechD — IBM Platinum Partner for Enterprise AI, Data & Hybrid Cloud"
        description="TechD has helped Fortune 500 enterprises turn data into trustworthy AI since 2009. IBM Platinum Business Partner specializing in watsonx, Db2, hybrid cloud, and security for regulated industries."
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

        <div className="container-page relative z-10 pt-32 pb-32 md:pt-40 md:pb-40">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">IBM Platinum Business Partner · Since 2009</p>
              <h1 className="mt-4 text-6xl md:text-8xl leading-[1.02] font-bold tracking-tight">
                Turn enterprise data into
                <br />
                <span className="text-primary">trustworthy AI.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-xl md:text-2xl font-light text-muted-foreground">
                We design, build, and run secure AI, data, and hybrid cloud
                systems for Fortune 500 healthcare, media, energy, and public
                sector organizations — on IBM watsonx, Db2, and the open stack
                around them.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="transition-transform duration-200 hover:-translate-y-0.5">
                  <Link to="/contact">Talk to a principal <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/solutions">See our solutions</Link>
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
              subtitle="Each practice is led by senior IBM-certified practitioners with a decade-plus of enterprise delivery on watsonx, Db2, OpenShift, and the modern data stack."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => {
              const Icon = SOLUTION_ICONS[s.id] ?? Sparkles;
              const featured = s.id === "ai-automation";
              return (
                <Reveal key={s.id} delay={i * 50}>
                  <Link
                    to={`/solutions#${s.id}`}
                    className={
                      "group relative block h-full rounded-xl p-7 border transition-all duration-300 hover:-translate-y-0.5 " +
                      (featured
                        ? "bg-background border-primary ring-1 ring-primary/20 shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)] hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.5)]"
                        : "bg-background border-border hover:border-primary hover:shadow-lg")
                    }
                  >
                    {featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        Featured
                      </span>
                    )}
                    <div
                      className={
                        "inline-flex h-14 w-14 items-center justify-center rounded-xl border transition-colors duration-300 " +
                        (featured
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/50 text-secondary group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary")
                      }
                    >
                      <Icon className="!size-6" strokeWidth={1.5} />
                    </div>
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      {s.name}
                    </p>
                    <h3 className="mt-3 text-2xl leading-tight">{s.outcome}</h3>
                    <p className="mt-4 text-sm font-light text-muted-foreground">
                      {s.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.capabilities.slice(0, 3).map((cap) => (
                        <li
                          key={cap}
                          className={
                            "rounded-full border px-3 py-1 text-[11px] font-light " +
                            (featured
                              ? "border-primary/40 bg-primary/5 text-secondary"
                              : "border-border text-muted-foreground")
                          }
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-7 inline-flex items-center gap-1 text-sm font-bold text-primary">
                      Learn more{" "}
                      <ArrowRight className="!size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineered Field — Industries + Case Study share one continuous backdrop */}
      <div className="relative overflow-hidden">
        <SectionBackdrop intensity="soft" vignettes={false} />
        <Suspense fallback={null}>
          <ParticleGlobe />
        </Suspense>

        {/* Industries */}
        <section data-section="home:industries" className="section relative z-10">
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
                    className="card-hover block h-full rounded-xl p-7 bg-background/70 backdrop-blur-sm"
                  >
                    <h3 className="text-xl">{ind.name}</h3>
                    <p className="mt-3 text-sm font-light text-muted-foreground">{ind.outcome}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured case study — real, IBM-published */}
        <section data-section="home:case-study" className="section relative z-10">
          <SectionMarker page="Home" name="Featured Case Study" />
          <div className="container-page">
            <Reveal>
              <div
                className="relative overflow-hidden rounded-2xl border border-border ring-1 ring-white/[0.06] text-white p-10 md:p-16"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(220 40% 8%) 0%, hsl(220 45% 5%) 100%)",
                }}
              >
                {/* Starfield (static, two layered radial-gradient tiles, masked top-right) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(1px 1px at 20% 30%, hsl(0 0% 100% / 0.7), transparent 50%),
                      radial-gradient(1px 1px at 70% 15%, hsl(195 100% 80% / 0.5), transparent 50%),
                      radial-gradient(1.5px 1.5px at 45% 70%, hsl(0 0% 100% / 0.35), transparent 50%),
                      radial-gradient(1px 1px at 85% 55%, hsl(0 0% 100% / 0.4), transparent 50%),
                      radial-gradient(1px 1px at 10% 80%, hsl(195 100% 80% / 0.3), transparent 50%),
                      radial-gradient(1.5px 1.5px at 60% 40%, hsl(0 0% 100% / 0.5), transparent 50%)
                    `,
                    backgroundSize: "240px 240px, 200px 200px, 320px 320px, 180px 180px, 280px 280px, 220px 220px",
                    WebkitMaskImage:
                      "radial-gradient(120% 100% at 80% 0%, black 0%, black 35%, transparent 80%)",
                    maskImage:
                      "radial-gradient(120% 100% at 80% 0%, black 0%, black 35%, transparent 80%)",
                  }}
                />
                {/* Directional glows */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -left-24 bottom-[-6rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
                {/* Top rim light */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
                <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured Case · Published by IBM</p>
                <h2 className="mt-4 max-w-3xl text-4xl md:text-5xl text-secondary-foreground leading-[1.05]">
                  A US family-owned retailer rebuilt online shopping on IBM Db2, watsonx Assistant, and NeuralSeek.
                </h2>
                <div className="mt-10 grid gap-8 md:grid-cols-3">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-primary">Personalization</div>
                    <p className="mt-3 text-base font-light opacity-90">
                      Personalized product descriptions delivered through retrieval-augmented generation.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-primary">Service efficiency</div>
                    <p className="mt-3 text-base font-light opacity-90">
                      Call-center efficiency gains and reduced customer frustration.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-primary">Shopper insight</div>
                    <p className="mt-3 text-base font-light opacity-90">
                      Real-time insight into shopper behavior across virtual and in-store channels.
                    </p>
                  </div>
                </div>
                <p className="mt-10 max-w-3xl text-sm font-light opacity-75">
                  Co-authored by Scott Nichols, Senior Developer Analyst at TechD, and Garrett Rowe, President of Cerebral Blue.
                </p>
                <div className="mt-8">
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                    <a
                      href="https://www.ibm.com/case-studies/blog/ibm-and-techd-partner-to-securely-share-data-and-power-insights-with-gen-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read on IBM.com <ArrowRight />
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

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
                <div className="text-xs text-muted-foreground">15+ years · Platinum since 2009</div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Sparkles, title: "Senior people on the keyboard", body: "Principals deliver, not just sell. Our technical team averages 10+ years of certified IBM delivery." },
              { icon: ShieldCheck, title: "Built for regulators", body: "Auditable AI, governed data, and defensible architecture across HIPAA, FedRAMP, and PCI environments." },
              { icon: Workflow, title: "Outcome-aligned engagements", body: "We commit to business outcomes — not staff augmentation hours." },
              { icon: Sparkles, title: "IBM-deep, multi-cloud fluent", body: "watsonx, Db2, OpenShift, and Z — plus AWS, Azure, and GCP at enterprise scale." },
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
                Talk to a TechD principal.
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-lg font-light text-muted-foreground">
                30-minute conversation. No sales pass-through, no slide deck. Just engineering.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="transition-transform duration-200 hover:-translate-y-0.5">
                  <Link to="/contact">Start the conversation <ArrowRight /></Link>
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
