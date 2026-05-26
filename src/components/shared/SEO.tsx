import { Helmet } from "react-helmet-async";

const SITE_URL = "https://techd.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.jpg`;

interface SEOProps {
  title: string;
  description: string;
  /** Path-only canonical (e.g. "/solutions/ai-generative"). Auto-prefixed with https://techd.com. Defaults to current pathname. */
  canonical?: string;
  /** Absolute or root-relative OG image URL. Defaults to /og/default.jpg. */
  ogImage?: string;
  /** Defaults to "website". Use "article" for blog/case-study/event detail pages. */
  ogType?: "website" | "article";
  /** JSON-LD structured data (object or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set true on legal/internal pages we don't want indexed. */
  noindex?: boolean;
}

const toAbsolute = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
  noindex,
}: SEOProps) => {
  const path =
    canonical ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const canonicalUrl = toAbsolute(path);
  const imageUrl = toAbsolute(ogImage ?? DEFAULT_OG_IMAGE);

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="TechD" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
