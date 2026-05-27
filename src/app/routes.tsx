import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "@pages/NotFound";
import ScrollToTop from "./ScrollToTop";

// All page components are lazy-loaded so three.js and page-specific code
// stay out of the main bundle and only download on first navigation.
const Home = lazy(() => import("@pages/Home"));
const ProductDetail = lazy(() => import("@pages/ProductDetail"));
const Contact = lazy(() => import("@pages/Contact"));
const ClientsLab = lazy(() => import("@pages/ClientsLab"));

// Company
const About = lazy(() => import("@pages/company/About"));
const IBMPartnership = lazy(() => import("@pages/company/IBMPartnership"));
const DeliveryMethodology = lazy(() => import("@pages/company/DeliveryMethodology"));

// Solutions
const AIGenerative = lazy(() => import("@pages/solutions/AIGenerative"));
const DataAnalytics = lazy(() => import("@pages/solutions/DataAnalytics"));
const AutomationFinOps = lazy(() => import("@pages/solutions/AutomationFinOps"));
const SecurityCompliance = lazy(() => import("@pages/solutions/SecurityCompliance"));
const Infrastructure = lazy(() => import("@pages/solutions/Infrastructure"));

// Services
const Advisory = lazy(() => import("@pages/services/Advisory"));
const Implementation = lazy(() => import("@pages/services/Implementation"));
const ManagedServices = lazy(() => import("@pages/services/ManagedServices"));
const Training = lazy(() => import("@pages/services/Training"));

// Industries
const Healthcare = lazy(() => import("@pages/industries/Healthcare"));
const MediaEntertainment = lazy(() => import("@pages/industries/MediaEntertainment"));
const EnergyUtilities = lazy(() => import("@pages/industries/EnergyUtilities"));
const HigherEducation = lazy(() => import("@pages/industries/HigherEducation"));
const PublicSector = lazy(() => import("@pages/industries/PublicSector"));
const FinancialServices = lazy(() => import("@pages/industries/FinancialServices"));
const Manufacturing = lazy(() => import("@pages/industries/Manufacturing"));

// Resources
const CaseStudies = lazy(() => import("@pages/resources/CaseStudies"));
const CaseStudyDetail = lazy(() => import("@pages/resources/CaseStudyDetail"));
const Blog = lazy(() => import("@pages/resources/Blog"));
const BlogDetail = lazy(() => import("@pages/resources/BlogDetail"));
const Webinars = lazy(() => import("@pages/resources/Webinars"));
const WebinarDetail = lazy(() => import("@pages/resources/WebinarDetail"));
const Events = lazy(() => import("@pages/resources/Events"));
const EventDetail = lazy(() => import("@pages/resources/EventDetail"));

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
        {/* Catch-all — must stay last. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);

import { useParams } from "react-router-dom";
const LegacyProductRedirect = ({ practice }: { practice: string }) => {
  const { product } = useParams<{ product: string }>();
  return <Navigate to={`/solutions/${practice}/${product ?? ""}`} replace />;
};
