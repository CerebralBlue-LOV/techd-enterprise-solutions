import { Link } from "react-router-dom";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import GeometricAccent from "@shared/GeometricAccent";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/content/industries";
import SectionMarker from "@shared/SectionMarker";

const Industries = () => (
  <Layout>
    <SEO
      title="Industries — TechD"
      description="TechD delivers enterprise AI, data, and security for Healthcare, Financial Services, Insurance, Energy, Higher Education, and Public Sector."
    />

    <section className="relative overflow-hidden">
      <SectionMarker page="Industries" name="Hero" />
      <GeometricAccent />
      <div className="container-page relative pt-20 pb-16 md:pt-28">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Industries"
            title="Built for regulated, complex enterprises."
            subtitle="Our teams have shipped inside the regulators, the auditors, and the tier-1 enterprises that set the standard."
          />
        </Reveal>
      </div>
    </section>

    <section className="pb-24">
      <SectionMarker page="Industries" name="Industries List" />
      <div className="container-page divide-y divide-border border-t border-border">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.id} delay={i * 60}>
            <article
              id={ind.id}
              className="group relative border-l-2 border-transparent hover:border-primary transition-colors duration-200 hover:bg-primary/[0.02] pl-8 py-10 scroll-mt-24"
            >
              <div className="flex gap-6 sm:gap-10">
                {/* Index number */}
                <div className="w-10 sm:w-14 shrink-0 pt-0.5">
                  <span className="text-4xl sm:text-5xl font-bold tabular-nums leading-none select-none text-foreground/10 group-hover:text-primary transition-colors duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name + compliance badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6">
                    <h2 className="text-xl sm:text-2xl font-bold">{ind.name}</h2>
                    <span className="self-start shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      {ind.regulation}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-base font-light text-muted-foreground max-w-2xl">
                    {ind.outcome}
                  </p>

                  {/* Client names */}
                  <p className="mt-2 text-sm text-muted-foreground/60">
                    {ind.clients.join(" · ")}
                  </p>

                  {/* Capability tags */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {ind.examples.map((ex) => (
                      <li
                        key={ex}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-secondary"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <Button asChild variant="link" className="px-0 text-primary">
                      <Link to="/contact">Discuss your {ind.name} program →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  </Layout>
);

export default Industries;
