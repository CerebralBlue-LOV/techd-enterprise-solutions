import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GeometricAccent from "@/components/GeometricAccent";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/content/industries";

const Industries = () => (
  <Layout>
    <SEO
      title="Industries — TechD"
      description="TechD delivers enterprise AI, data, and security for Healthcare, Financial Services, Insurance, Energy, Higher Education, and Public Sector."
    />

    <section className="relative overflow-hidden">
      <GeometricAccent />
      <div className="container-page relative pt-20 pb-16 md:pt-28">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Industries"
            title="Six sectors. Deep operating context."
            subtitle="Our teams have shipped inside the regulators, the auditors, and the tier-1 enterprises that set the standard."
          />
        </Reveal>
      </div>
    </section>

    <section className="pb-24">
      <div className="container-page grid gap-6 md:grid-cols-2">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.id} delay={i * 50}>
            <article id={ind.id} className="card-hover rounded-xl p-8 scroll-mt-24 h-full">
              <h2 className="text-2xl">{ind.name}</h2>
              <p className="mt-3 text-base font-light text-muted-foreground">{ind.outcome}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ind.examples.map((ex) => (
                  <li
                    key={ex}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild variant="link" className="px-0 text-primary">
                  <Link to="/contact">Discuss your {ind.name} program →</Link>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  </Layout>
);

export default Industries;
