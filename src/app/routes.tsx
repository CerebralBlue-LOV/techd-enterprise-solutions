import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "@pages/NotFound";
import ScrollToTop from "./ScrollToTop";
import { hasReloadedForStaleChunk, tryReloadForStaleChunk } from "../main";

// All page components are lazy-loaded so three.js and page-specific code
// stay out of the main bundle and only download on first navigation.
const lazyPage = <T extends Promise<unknown>>(loader: () => T) =>
  lazy(async () => {
    try {
      return (await loader()) as Awaited<T>;
    } catch (error) {
      if (!tryReloadForStaleChunk(error) && hasReloadedForStaleChunk()) {
        window.location.assign(window.location.href);
      }
      throw error;
    }
  });

const Home = lazyPage(() => import("@pages/Home"));
const ProductDetail = lazyPage(() => import("@pages/ProductDetail"));
const Contact = lazyPage(() => import("@pages/Contact"));
const ClientsLab = lazyPage(() => import("@pages/ClientsLab"));

// Company
const About = lazyPage(() => import("@pages/company/About"));
const IBMPartnership = lazyPage(() => import("@pages/company/IBMPartnership"));
const DeliveryMethodology = lazyPage(() => import("@pages/company/DeliveryMethodology"));

// Solutions
const AIGenerative = lazyPage(() => import("@pages/solutions/AIGenerative"));
const DataAnalytics = lazyPage(() => import("@pages/solutions/DataAnalytics"));
const AutomationFinOps = lazyPage(() => import("@pages/solutions/AutomationFinOps"));
const SecurityCompliance = lazyPage(() => import("@pages/solutions/SecurityCompliance"));
const Infrastructure = lazyPage(() => import("@pages/solutions/Infrastructure"));

// Services
const Advisory = lazyPage(() => import("@pages/services/Advisory"));
const Implementation = lazyPage(() => import("@pages/services/Implementation"));
const ManagedServices = lazyPage(() => import("@pages/services/ManagedServices"));
const Training = lazyPage(() => import("@pages/services/Training"));

// Industries
const Healthcare = lazyPage(() => import("@pages/industries/Healthcare"));
const MediaEntertainment = lazyPage(() => import("@pages/industries/MediaEntertainment"));
const EnergyUtilities = lazyPage(() => import("@pages/industries/EnergyUtilities"));
const HigherEducation = lazyPage(() => import("@pages/industries/HigherEducation"));
const PublicSector = lazyPage(() => import("@pages/industries/PublicSector"));
const FinancialServices = lazyPage(() => import("@pages/industries/FinancialServices"));
const Manufacturing = lazyPage(() => import("@pages/industries/Manufacturing"));

// Resources
const CaseStudies = lazyPage(() => import("@pages/resources/CaseStudies"));
const CaseStudyDetail = lazyPage(() => import("@pages/resources/CaseStudyDetail"));
const Blog = lazyPage(() => import("@pages/resources/Blog"));
const BlogDetail = lazyPage(() => import("@pages/resources/BlogDetail"));
const Webinars = lazyPage(() => import("@pages/resources/Webinars"));
const WebinarDetail = lazyPage(() => import("@pages/resources/WebinarDetail"));
const Events = lazyPage(() => import("@pages/resources/Events"));
const EventDetail = lazyPage(() => import("@pages/resources/EventDetail"));

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
