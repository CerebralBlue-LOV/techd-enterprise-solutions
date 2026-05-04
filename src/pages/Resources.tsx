import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GeometricAccent from "@/components/GeometricAccent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RESOURCES, type Resource } from "@/content/resources";
import SectionMarker from "@/components/SectionMarker";

const TABS: { value: Resource["type"]; label: string }[] = [
  { value: "case-studies", label: "Case Studies" },
  { value: "blog", label: "Blog" },
  { value: "webinars", label: "Webinars" },
  { value: "events", label: "Events" },
];

const Resources = () => {
  const [params, setParams] = useSearchParams();
  const tab = (params.get("tab") as Resource["type"]) || "case-studies";

  const grouped = useMemo(
    () =>
      TABS.reduce<Record<string, Resource[]>>((acc, t) => {
        acc[t.value] = RESOURCES.filter((r) => r.type === t.value);
        return acc;
      }, {}),
    [],
  );

  return (
    <Layout>
      <SEO
        title="Resources — TechD"
        description="Case studies, blog posts, webinars, and events from the TechD team."
      />

      <section data-section="resources:hero" className="relative overflow-hidden">
        <SectionMarker page="Resources" name="Hero" />
        <GeometricAccent />
        <div className="container-page relative pt-20 pb-12 md:pt-28">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Resources"
              title="Field notes from enterprise delivery."
              subtitle="Case studies, briefings, and events from the practitioners doing the work."
            />
          </Reveal>
        </div>
      </section>

      <section data-section="resources:tabs" className="pb-24">
        <SectionMarker page="Resources" name="Tabbed Content (Case Studies / Blog / Webinars / Events)" />
        <div className="container-page">
          <Tabs
            value={tab}
            onValueChange={(v) => setParams({ tab: v }, { replace: true })}
          >
            <TabsList className="mb-10 bg-muted">
              {TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {TABS.map((t) => (
              <TabsContent key={t.value} value={t.value}>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {grouped[t.value].map((r, i) => (
                    <Reveal key={r.id} delay={i * 50}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="card-hover block h-full rounded-xl p-7"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          {r.meta}
                        </p>
                        <h3 className="mt-3 text-xl leading-snug">{r.title}</h3>
                        <p className="mt-3 text-sm font-light text-muted-foreground">{r.summary}</p>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
