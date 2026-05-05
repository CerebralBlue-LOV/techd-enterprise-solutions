import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import GeometricAccent from "@shared/GeometricAccent";
import { Button } from "@/components/ui/button";
import { SOLUTIONS } from "@/content/solutions";
import SectionMarker from "@shared/SectionMarker";

const Solutions = () => (
  <Layout>
    <SEO
      title="Solutions — TechD"
      description="AI & Automation, Data, Security, Cloud & Infrastructure, and Application Modernization for the Fortune 500."
    />

    <section data-section="solutions:hero" className="relative overflow-hidden">
      <SectionMarker page="Solutions" name="Hero" />
      <GeometricAccent />
      <div className="container-page relative pt-20 pb-16 md:pt-28">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Solutions"
            title="Five practices. Engineered for enterprise outcomes."
            subtitle="Each practice is anchored by IBM-certified architects and senior engineers who have shipped for the world's most regulated organizations."
          />
        </Reveal>
      </div>
    </section>

    <section data-section="solutions:list" className="pb-24">
      <SectionMarker page="Solutions" name="Practices List" />
      <div className="container-page space-y-20">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.id}>
            <article id={s.id} className="grid gap-10 lg:grid-cols-[1fr_1.3fr] scroll-mt-24">
              <div>
                <p className="eyebrow">0{i + 1} · {s.name}</p>
                <h2 className="mt-3 text-3xl md:text-4xl leading-[1.1]">{s.outcome}</h2>
              </div>
              <div className="card-hover rounded-xl p-7 md:p-9">
                <p className="text-base font-light text-muted-foreground">{s.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-secondary">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild variant="link" className="px-0 text-primary">
                    <Link to="/contact">Talk to a {s.name} principal <ArrowRight /></Link>
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  </Layout>
);

export default Solutions;
