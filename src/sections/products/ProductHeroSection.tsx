import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ScrollToSectionLink from "@shared/ScrollToSectionLink";
import PageHeroBackdrop from "@shared/page/PageHeroBackdrop";
import PracticeFigure from "@sections/solutions/_components/PracticeFigure";
import { Button } from "@ui/button";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Product detail hero. Breadcrumb + practice eyebrow, parent practice's
 * wireframe figure on the right, primary "Talk to an expert" CTA matching
 * the site-wide standard, and in-page anchors via `ScrollToSectionLink`
 * (clean URLs, repeatable clicks).
 */
export const ProductHeroSection = ({ practice, product }: Props) => {
  const { pathname } = useLocation();
  const anchors: { href: string; label: string }[] = [
    { href: "#overview", label: "Overview" },
    ...(practice.id === "ai-generative"
      ? [{ href: "#capabilities", label: "Capabilities" }]
      : []),
    { href: "#use-cases", label: "Use cases" },
    { href: "#why-techd", label: "Why TechD" },
    { href: "#related", label: "Related" },
    { href: "#cta", label: "Contact" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden min-h-[60vh] flex items-center scroll-mt-24">
      <SectionMarker page={`Product / ${product.name}`} name="Hero" />
      <PageHeroBackdrop figure={<PracticeFigure practiceId={practice.id} />} />

      <div className="container-page relative z-10 pt-20 pb-16 md:pt-28 w-full">
        <Reveal>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link
              to={`/solutions/${practice.id}`}
              className="hover:text-primary transition-colors"
            >
              {practice.name}
            </Link>
            <ChevronRight className="size-3.5 shrink-0" />
            <span className="text-secondary font-medium">{product.name}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-secondary">
              {product.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
              {product.tagline}
            </p>
          </div>

          <div className="mt-10">
            <Button asChild size="lg" className="btn-glow">
              <Link to="/contact">
                Talk to an expert
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
          </div>

          <nav
            aria-label="On this page"
            className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium text-muted-foreground"
          >
            {anchors.map((a, i) => {
              const sectionId = a.href.replace(/^#/, "");
              return (
                <span key={a.href} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-muted-foreground/40">·</span>
                  )}
                  <ScrollToSectionLink
                    sectionId={sectionId}
                    path={pathname}
                    className="transition-colors hover:text-primary focus-visible:text-primary"
                  >
                    {a.label}
                  </ScrollToSectionLink>
                </span>
              );
            })}
          </nav>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductHeroSection;
