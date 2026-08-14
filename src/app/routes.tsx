import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import TrailingSlashRedirect from "./TrailingSlashRedirect";
import LegacySlugRouter from "./LegacySlugRouter";
import { recoverableLazyImport } from "./staleChunkRecovery";

// All page components are lazy-loaded so three.js and page-specific code
// stay out of the main bundle and only download on first navigation.
const Home = lazy(recoverableLazyImport(() => import("@pages/Home")));
const ProductDetail = lazy(recoverableLazyImport(() => import("@pages/ProductDetail")));
const Contact = lazy(recoverableLazyImport(() => import("@pages/Contact")));
const ClientsLab = lazy(recoverableLazyImport(() => import("@pages/ClientsLab")));

// Company
const About = lazy(recoverableLazyImport(() => import("@pages/company/About")));
const IBMPartnership = lazy(recoverableLazyImport(() => import("@pages/company/IBMPartnership")));
const DeliveryMethodology = lazy(recoverableLazyImport(() => import("@pages/company/DeliveryMethodology")));

// Solutions
const AIGenerative = lazy(recoverableLazyImport(() => import("@pages/solutions/AIGenerative")));
const DataAnalytics = lazy(recoverableLazyImport(() => import("@pages/solutions/DataAnalytics")));
const AutomationFinOps = lazy(recoverableLazyImport(() => import("@pages/solutions/AutomationFinOps")));
const SecurityCompliance = lazy(recoverableLazyImport(() => import("@pages/solutions/SecurityCompliance")));
const Infrastructure = lazy(recoverableLazyImport(() => import("@pages/solutions/Infrastructure")));

// Services
const Advisory = lazy(recoverableLazyImport(() => import("@pages/services/Advisory")));
const Implementation = lazy(recoverableLazyImport(() => import("@pages/services/Implementation")));
const ManagedServices = lazy(recoverableLazyImport(() => import("@pages/services/ManagedServices")));
const Training = lazy(recoverableLazyImport(() => import("@pages/services/Training")));

// Industries
const Healthcare = lazy(recoverableLazyImport(() => import("@pages/industries/Healthcare")));
const MediaEntertainment = lazy(recoverableLazyImport(() => import("@pages/industries/MediaEntertainment")));
const EnergyUtilities = lazy(recoverableLazyImport(() => import("@pages/industries/EnergyUtilities")));
const HigherEducation = lazy(recoverableLazyImport(() => import("@pages/industries/HigherEducation")));
const PublicSector = lazy(recoverableLazyImport(() => import("@pages/industries/PublicSector")));
const FinancialServices = lazy(recoverableLazyImport(() => import("@pages/industries/FinancialServices")));
const Manufacturing = lazy(recoverableLazyImport(() => import("@pages/industries/Manufacturing")));

// Resources
const CaseStudies = lazy(recoverableLazyImport(() => import("@pages/resources/CaseStudies")));
const CaseStudyDetail = lazy(recoverableLazyImport(() => import("@pages/resources/CaseStudyDetail")));
const Blog = lazy(recoverableLazyImport(() => import("@pages/resources/Blog")));
const BlogDetail = lazy(recoverableLazyImport(() => import("@pages/resources/BlogDetail")));
const Webinars = lazy(recoverableLazyImport(() => import("@pages/resources/Webinars")));
const WebinarDetail = lazy(recoverableLazyImport(() => import("@pages/resources/WebinarDetail")));
const Events = lazy(recoverableLazyImport(() => import("@pages/resources/Events")));
const EventDetail = lazy(recoverableLazyImport(() => import("@pages/resources/EventDetail")));

/**
 * Central route table.
 *
 * IA model: top-level Solutions/Services/Industries/Resources are nav dropdown
 * triggers only — they do NOT have parent routes. Each child gets its own page.
 * Old parent paths redirect to a sensible first-child page.
 */
export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <TrailingSlashRedirect />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Solutions — children only; parent redirects */}
        <Route path="/solutions" element={<Navigate to="/solutions/ai-generative" replace />} />
        <Route path="/solutions/ai-generative" element={<AIGenerative />} />
        <Route path="/solutions/data-analytics" element={<DataAnalytics />} />
        <Route path="/solutions/automation-finops" element={<AutomationFinOps />} />
        <Route path="/solutions/security-compliance" element={<SecurityCompliance />} />
        <Route path="/solutions/infrastructure" element={<Infrastructure />} />
        {/* Legacy practice slug redirects */}
        <Route path="/solutions/ai" element={<Navigate to="/solutions/ai-generative" replace />} />
        <Route path="/solutions/automation" element={<Navigate to="/solutions/automation-finops" replace />} />
        <Route path="/solutions/security" element={<Navigate to="/solutions/security-compliance" replace />} />
        {/* Removed product slugs — redirect to parent practice */}
        <Route path="/solutions/ai-generative/watsonx-assistant" element={<Navigate to="/solutions/ai-generative" replace />} />
        <Route path="/solutions/ai-generative/ibm-knowledge-catalog" element={<Navigate to="/solutions/ai-generative" replace />} />
        <Route path="/solutions/data-analytics/cognos-controller" element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/solutions/data-analytics/ibm-mdm" element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/solutions/security-compliance/ibm-mdm" element={<Navigate to="/solutions/security-compliance" replace />} />
        <Route path="/solutions/security-compliance/ibm-data-replication" element={<Navigate to="/solutions/security-compliance" replace />} />
        {/* Legacy product URLs under old practice slugs */}
        <Route path="/solutions/ai/:product" element={<LegacyProductRedirect practice="ai-generative" />} />
        <Route path="/solutions/automation/:product" element={<LegacyProductRedirect practice="automation-finops" />} />
        <Route path="/solutions/security/:product" element={<LegacyProductRedirect practice="security-compliance" />} />
        {/* Product detail (current slugs) */}
        <Route path="/solutions/:practice/:product" element={<ProductDetail />} />

        {/* Services */}
        <Route path="/services" element={<Navigate to="/services/advisory" replace />} />
        <Route path="/services/advisory" element={<Advisory />} />
        <Route path="/services/implementation" element={<Implementation />} />
        <Route path="/services/managed-services" element={<ManagedServices />} />
        <Route path="/services/training" element={<Training />} />

        {/* Industries */}
        <Route path="/industries" element={<Navigate to="/industries/financial-services" replace />} />
        <Route path="/industries/healthcare" element={<Healthcare />} />
        <Route path="/industries/media-entertainment" element={<MediaEntertainment />} />
        <Route path="/industries/insurance" element={<Navigate to="/industries/financial-services" replace />} />
        <Route path="/industries/energy-utilities" element={<EnergyUtilities />} />
        <Route path="/industries/higher-education" element={<HigherEducation />} />
        <Route path="/industries/public-sector" element={<PublicSector />} />
        <Route path="/industries/financial-services" element={<FinancialServices />} />
        <Route path="/industries/manufacturing" element={<Manufacturing />} />

        {/* Resources */}
        <Route path="/resources" element={<Navigate to="/resources/case-studies" replace />} />
        <Route path="/resources/case-studies" element={<CaseStudies />} />
        <Route path="/resources/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/resources/blog" element={<Blog />} />
        <Route path="/resources/blog/:slug" element={<BlogDetail />} />
        <Route path="/resources/webinars" element={<Webinars />} />
        {/* Renamed Aug 2026 — "Internal Chat" dropped from the title. The old URL was
            shared before the rename, so it keeps resolving. Must sit here rather than in
            LegacySlugRouter, which only handles single-segment paths. */}
        <Route
          path="/resources/webinars/secured-ai-internal-chat"
          element={<Navigate to="/resources/webinars/secured-ai" replace />}
        />
        <Route path="/resources/webinars/:slug" element={<WebinarDetail />} />
        <Route path="/resources/events" element={<Events />} />
        <Route path="/resources/events/:slug" element={<EventDetail />} />

        {/* Company */}
        <Route path="/company" element={<Navigate to="/company/about" replace />} />
        <Route path="/company/about" element={<About />} />
        <Route path="/company/ibm-partnership" element={<IBMPartnership />} />
        <Route path="/company/delivery-methodology" element={<DeliveryMethodology />} />
        <Route path="/company/customers" element={<Navigate to="/company/about" replace />} />

        <Route path="/contact" element={<Contact />} />

        {/* Internal sizing tool — hidden, no nav link, noindex */}
        <Route path="/clients-lab" element={<ClientsLab />} />

        {/* ── Legacy WordPress redirects ──────────────────────────────────────
            Source: techd.com sitemap crawled 2026-05-29 (~228 indexed URLs).
            These are client-side navigations, not HTTP 301s. True server-side
            301s require Cloudflare in front of GitHub Pages (deferred post-launch).
            TrailingSlashRedirect (mounted above) strips the WP trailing slash
            before these routes are evaluated, so we only write each path once.
        ─────────────────────────────────────────────────────────────────────── */}

        {/* Company / contact */}
        <Route path="/about-us"            element={<Navigate to="/company/about" replace />} />
        <Route path="/our-story"           element={<Navigate to="/company/about" replace />} />
        <Route path="/our-customers"       element={<Navigate to="/company/about" replace />} />
        <Route path="/depth-of-experience" element={<Navigate to="/company/about" replace />} />
        <Route path="/contact-us"          element={<Navigate to="/contact" replace />} />
        <Route path="/ibm-business-partner" element={<Navigate to="/company/ibm-partnership" replace />} />
        <Route path="/privacy-policy"      element={<Navigate to="/" replace />} />

        {/* Services */}
        <Route path="/services/strategy-and-consulting"                              element={<Navigate to="/services/advisory" replace />} />
        <Route path="/services/strategy-and-consulting/implementation"               element={<Navigate to="/services/implementation" replace />} />
        <Route path="/services/strategy-and-consulting/solution-design"              element={<Navigate to="/services/advisory" replace />} />
        <Route path="/services/strategy-and-consulting/field-services"               element={<Navigate to="/services/managed-services" replace />} />
        <Route path="/services/strategy-and-consulting/lifecycle-services-and-customer-success" element={<Navigate to="/services/managed-services" replace />} />
        <Route path="/services/technology-expertise"                                 element={<Navigate to="/services/advisory" replace />} />
        <Route path="/services/advisory-assessment-services"                         element={<Navigate to="/services/advisory" replace />} />
        <Route path="/services/advisory-assessment-services/security"                element={<Navigate to="/solutions/security-compliance" replace />} />
        <Route path="/services/advisory-assessment-services/analytics"               element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/services/advisory-assessment-services/data-assessment"         element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/services/techd-ibm-ai-data-quick-start-advisory-service"      element={<Navigate to="/services/advisory" replace />} />

        {/* Data solutions taxonomy → new solutions */}
        <Route path="/data-solutions"      element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/ibm-data-solutions"  element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/data-solutions/ibm-business-intelligence-and-analytics/*"      element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/data-solutions/ibm-data-science-platform/*"                    element={<Navigate to="/solutions/ai-generative" replace />} />
        <Route path="/data-solutions/unified-governance-and-integration/*"            element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/data-solutions/hybrid-data-management/*"                        element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/data-solutions/security-intelligence/*"                         element={<Navigate to="/solutions/security-compliance" replace />} />
        <Route path="/data-solutions/enterprise-insights/*"                           element={<Navigate to="/solutions/infrastructure" replace />} />
        <Route path="/data-solutions/ibm-cloud/*"                                    element={<Navigate to="/solutions/infrastructure" replace />} />
        <Route path="/data-solutions/ibm-cognos-analytics-administration"             element={<Navigate to="/solutions/data-analytics" replace />} />
        <Route path="/data-solutions/watson-assisstant-ai-chatbot-transformative-ai-applications-techd-ibm" element={<Navigate to="/solutions/ai-generative" replace />} />

        {/* Flagship product landing pages */}
        <Route path="/ibm-turbonomic-cloud-cost-optimization"  element={<Navigate to="/solutions/automation-finops" replace />} />
        <Route path="/real-time-observability-with-ibm-instana" element={<Navigate to="/solutions/automation-finops" replace />} />
        <Route path="/apptio-setup-implementation-services"    element={<Navigate to="/solutions/automation-finops" replace />} />

        {/* News / resources hubs */}
        <Route path="/news-and-events"                                           element={<Navigate to="/resources/events" replace />} />
        <Route path="/news-and-events/white-papers"                              element={<Navigate to="/resources/blog" replace />} />
        <Route path="/news-and-events/user-group-presentations"                  element={<Navigate to="/resources/events" replace />} />
        <Route path="/news-and-events/user-group-presentations/user-group-downloads" element={<Navigate to="/resources/events" replace />} />
        <Route path="/case-studies"                                              element={<Navigate to="/resources/case-studies" replace />} />
        <Route path="/resources-big-data-solutions"                              element={<Navigate to="/resources/case-studies" replace />} />
        <Route path="/resources-big-data-solutions/success-stories"              element={<Navigate to="/resources/case-studies" replace />} />
        <Route path="/resources-big-data-solutions/blogs-and-insights"           element={<Navigate to="/resources/blog" replace />} />
        <Route path="/resources-big-data-solutions/white-papers"                 element={<Navigate to="/resources/blog" replace />} />
        <Route path="/resources-big-data-solutions/events-and-webinars"          element={<Navigate to="/resources/webinars" replace />} />
        <Route path="/resources-big-data-solutions/past-events"                  element={<Navigate to="/resources/events" replace />} />
        <Route path="/resources-big-data-solutions/social-media"                 element={<Navigate to="/resources/blog" replace />} />
        <Route path="/techd-and-ibm-publications"                                element={<Navigate to="/resources/blog" replace />} />
        <Route path="/software-downloads"                                        element={<Navigate to="/" replace />} />
        <Route path="/software-downloads/thanks"                                 element={<Navigate to="/" replace />} />
        <Route path="/download-free-trial-versions-of-techds-ibm-cogsuite-software-tools" element={<Navigate to="/" replace />} />

        {/* WordPress category taxonomy */}
        <Route path="/category/blogs-and-insights/*"  element={<Navigate to="/resources/blog" replace />} />
        <Route path="/category/success-stories/*"     element={<Navigate to="/resources/case-studies" replace />} />
        <Route path="/category/events/*"              element={<Navigate to="/resources/events" replace />} />
        <Route path="/category/webinars/*"            element={<Navigate to="/resources/webinars" replace />} />
        <Route path="/category/cognos-user-groups/*"  element={<Navigate to="/resources/events" replace />} />
        <Route path="/category/techd-news/*"          element={<Navigate to="/resources/blog" replace />} />
        <Route path="/category/publications/*"        element={<Navigate to="/resources/blog" replace />} />
        <Route path="/category/white-papers/*"        element={<Navigate to="/resources/blog" replace />} />
        <Route path="/category/ibm-data-solutions/*"  element={<Navigate to="/solutions/data-analytics" replace />} />

        {/* Catch-all: keyword-routes WP post slugs; falls through to NotFound for true unknowns */}
        <Route path="*" element={<LegacySlugRouter />} />
      </Routes>
    </Suspense>
  </>
);

import { useParams } from "react-router-dom";
const LegacyProductRedirect = ({ practice }: { practice: string }) => {
  const { product } = useParams<{ product: string }>();
  return <Navigate to={`/solutions/${practice}/${product ?? ""}`} replace />;
};
