import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const SEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");

    const href = canonical ?? window.location.href.split("#")[0];
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, [title, description, canonical]);

  return null;
};

export default SEO;
