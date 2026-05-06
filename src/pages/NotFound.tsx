import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import GeometricAccent from "@shared/GeometricAccent";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO title="Page not found — TechD" description="The page you're looking for doesn't exist." />
      <section className="relative overflow-hidden">
        <GeometricAccent />
        <div className="container-page relative grid place-items-center text-center py-32 md:py-44">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 text-6xl md:text-8xl leading-none">
            We couldn't find that page.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-muted-foreground">
            The link may be out of date — or the page may have moved. Let's get
            you back on course.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
