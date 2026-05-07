import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

export const CerebralBlueToolsSection = ({ practice }: Props) => {
  if (!practice.ownTools?.length) return null;

  return (
    <section className="section scroll-mt-24">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Cerebral Blue tools" />
      <div className="container-page">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block h-px w-8 bg-primary" />
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Built by Cerebral Blue
            </p>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {practice.ownTools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 50}>
              <a
                href={(tool.link as { kind: "external"; url: string }).url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block h-full"
              >
                <div className="h-full rounded-xl border border-primary/20 bg-primary/5 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-secondary leading-tight">{tool.name}</h3>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-primary" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-secondary leading-snug">{tool.tagline}</p>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CerebralBlueToolsSection;
