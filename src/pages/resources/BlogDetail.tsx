import { useParams } from "react-router-dom";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ResourcesFigure from "@shared/heroFigures/ResourcesFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
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

      <PageHero
        pageLabel="Resources / Blog"
        backLink={{ to: "/resources/blog", label: "Blog" }}
        eyebrow={
          <>
            <span className="inline-block h-px w-8 bg-primary" />
            {post.date}
            {post.author && (
              <>
                <span className="text-muted-foreground/60">·</span>
                <span>{post.author}</span>
              </>
            )}
          </>
        }
        headline={post.title}
        lede={post.summary}
        figure={<ResourcesFigure />}
        minHeight="min-h-[55vh]"
        maxWidth="max-w-3xl"
        headlineSize="text-3xl md:text-4xl lg:text-5xl"
      />

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

      <PageFinalCtaSection
        pageLabel="Resources / Blog"
        eyebrow="Put it into practice"
        title="Talk to an architect who's done it."
        lede="Ideas are worth more in production. Our senior IBM-certified engineers can help you move from concept to delivery."
        secondary={{ label: "More posts", to: "/resources/blog" }}
      />
    </Layout>
  );
};

export default BlogDetail;
