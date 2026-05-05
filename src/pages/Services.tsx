import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import GeometricAccent from "@shared/GeometricAccent";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/content/services";
import SectionMarker from "@shared/SectionMarker";

const Services = () => (
  <Layout>
    <SEO
      title="Services — TechD"
      description="Advisory, Implementation, Managed Services, and Training from senior practitioners. IBM Platinum Business Partner."
    />

    <section className="relative overflow-hidden">
      <SectionMarker page="Services" name="Hero" />
      <GeometricAccent />
      <div className="container-page relative pt-20 pb-16 md:pt-28">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="From boardroom strategy to 24×7 operations."
            subtitle="Four service tiers. One bench of senior practitioners. We staff every engagement with the people who will actually do the work."
          />
        </Reveal>
      </div>
    </section>

    <section className="pb-24">
      <SectionMarker page="Services" name="Service Tiers" />
      <div className="container-page grid gap-6 md:grid-cols-2">
        {SERVICES.map((svc, i) => (
          <Reveal key={svc.id} delay={i * 50}>
            <article id={svc.id} className="card-hover rounded-xl p-8 scroll-mt-24 h-full flex flex-col">
              <p className="eyebrow">{svc.name}</p>
              <h2 className="mt-2 text-3xl leading-tight">{svc.promise}</h2>
              <p className="mt-4 text-base font-light text-muted-foreground">{svc.description}</p>
              <ul className="mt-6 space-y-2">
                {svc.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 text-primary shrink-0" />
                    <span className="text-secondary">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Button asChild variant="link" className="px-0 text-primary">
                  <Link to="/contact">Engage TechD {svc.name} <ArrowRight /></Link>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  </Layout>
);

export default Services;
