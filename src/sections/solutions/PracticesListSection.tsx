import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";

/**
 * Section: Solutions / Practices List
 * Purpose: One row per practice area with full capability list.
 * Order:   2 of 2 on the Solutions page.
 * Data:    @content/solutions (SOLUTIONS array).
 * Notes:   Each <article> uses scroll-mt-24 so deep links from the home grid
 *          (e.g. /solutions#ai-automation) land below the sticky header.
 */
export const PracticesListSection = () => (
  <section className="pb-24">
    <SectionMarker page="Solutions" name="Practices List" />
    <div className="container-page space-y-20">
      {SOLUTIONS.map((s, i) => (
        <Reveal key={s.id}>
          <article
            id={s.id}
            className="grid gap-10 lg:grid-cols-[1fr_1.3fr] scroll-mt-24"
          >
            <div>
              <p className="eyebrow">
                0{i + 1} · {s.name}
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl leading-[1.1]">
                {s.outcome}
              </h2>
            </div>
            <div className="card-hover rounded-xl p-7 md:p-9">
              <p className="text-base font-light text-muted-foreground">
                {s.description}
              </p>
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
                  <Link to="/contact">
                    Talk to a {s.name} principal <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default PracticesListSection;
