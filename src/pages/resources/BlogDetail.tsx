import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SonarHeroBackdrop from "@shared/SonarHeroBackdrop";
import NotFound from "@pages/NotFound";
import { RESOURCES } from "@content/resources";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = RESOURCES.find(
    (r) => r.type === "blog" && r.slug === slug && !r.draft,
  );

  if (!post) return <NotFound />;

  return (
    <Layout>
      <SEO
        title={`${post.title} — TechD`}
        description={post.summary}
      />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[35vh] flex items-center">
        <SectionMarker page="Resources / Blog" name="Detail Hero" />
        <SonarHeroBackdrop />
        <div className="container-page relative z-10 pt-20 pb-16 md:pt-28 md:pb-20">
          <Reveal>
            <Link
              to="/resources/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="size-3.5" />
              Blog
            </Link>
            <div className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 mb-4">
                <span className="inline-block h-px w-8 bg-primary" />
                {post.date}
                {post.author && (
                  <>
                    <span className="text-muted-foreground/60">·</span>
                    <span>{post.author}</span>
                  </>
                )}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-secondary">
                {post.title}
              </h1>
              <p className="mt-5 text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-2xl">
                {post.summary}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      {post.body && post.body.length > 0 && (
        <section className="section">
          <SectionMarker page="Resources / Blog" name="Detail Body" />
          <div className="container-page">
            <Reveal>
              <div className="max-w-2xl space-y-6">
                {post.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg font-light text-secondary/80 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-muted/30">
        <SectionMarker page="Resources / Blog" name="Detail CTA" />
        <div className="container-page">
          <Reveal>
            <div className="rounded-2xl border border-border bg-background p-10 md:p-14 text-center">
              <p className="eyebrow mb-3">Put it into practice</p>
              <h2 className="text-3xl md:text-4xl leading-[1.1] max-w-3xl mx-auto">
                Talk to an architect who's done it.
              </h2>
              <p className="mt-5 text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Ideas are worth more in production. Our senior IBM-certified engineers
                can help you move from concept to delivery.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="btn-glow">
                  <Link to="/contact">
                    Talk to an expert <ArrowRight className="ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources/blog">More posts</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
