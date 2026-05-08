import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import ProductDetail from "@pages/ProductDetail";
import Contact from "@pages/Contact";
import NotFound from "@pages/NotFound";
import IconLab from "@pages/IconLab";
import LogoLab from "@pages/LogoLab";
import FigureLab from "@pages/FigureLab";

// Company
import About from "@pages/company/About";
import IBMPartnership from "@pages/company/IBMPartnership";
import Customers from "@pages/company/Customers";

// Solutions
import AIGenerative from "@pages/solutions/AIGenerative";
import DataAnalytics from "@pages/solutions/DataAnalytics";
import AutomationFinOps from "@pages/solutions/AutomationFinOps";
import SecurityCompliance from "@pages/solutions/SecurityCompliance";
import HybridCloud from "@pages/solutions/HybridCloud";

// Services
import Advisory from "@pages/services/Advisory";
import Implementation from "@pages/services/Implementation";
import ManagedServices from "@pages/services/ManagedServices";
import Training from "@pages/services/Training";

// Industries
import Healthcare from "@pages/industries/Healthcare";
import MediaEntertainment from "@pages/industries/MediaEntertainment";
import Insurance from "@pages/industries/Insurance";
import EnergyUtilities from "@pages/industries/EnergyUtilities";
import HigherEducation from "@pages/industries/HigherEducation";
import PublicSector from "@pages/industries/PublicSector";

// Resources
import CaseStudies from "@pages/resources/CaseStudies";
import CaseStudyDetail from "@pages/resources/CaseStudyDetail";
import Blog from "@pages/resources/Blog";
import BlogDetail from "@pages/resources/BlogDetail";
import Webinars from "@pages/resources/Webinars";
import Events from "@pages/resources/Events";

/**
 * Central route table.
 *
 * IA model: top-level Solutions/Services/Industries/Resources are nav dropdown
 * triggers only — they do NOT have parent routes. Each child gets its own page.
 * Old parent paths redirect to a sensible first-child page.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    {/* Solutions — children only; parent redirects */}
    <Route path="/solutions" element={<Navigate to="/solutions/ai-generative" replace />} />
    <Route path="/solutions/ai-generative" element={<AIGenerative />} />
    <Route path="/solutions/data-analytics" element={<DataAnalytics />} />
    <Route path="/solutions/automation-finops" element={<AutomationFinOps />} />
    <Route path="/solutions/security-compliance" element={<SecurityCompliance />} />
    <Route path="/solutions/hybrid-cloud" element={<HybridCloud />} />
    {/* Legacy practice slug redirects */}
    <Route path="/solutions/ai" element={<Navigate to="/solutions/ai-generative" replace />} />
    <Route path="/solutions/automation" element={<Navigate to="/solutions/automation-finops" replace />} />
    <Route path="/solutions/security" element={<Navigate to="/solutions/security-compliance" replace />} />
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
    <Route path="/industries" element={<Navigate to="/industries/healthcare" replace />} />
    <Route path="/industries/healthcare" element={<Healthcare />} />
    <Route path="/industries/media-entertainment" element={<MediaEntertainment />} />
    <Route path="/industries/insurance" element={<Insurance />} />
    <Route path="/industries/energy-utilities" element={<EnergyUtilities />} />
    <Route path="/industries/higher-education" element={<HigherEducation />} />
    <Route path="/industries/public-sector" element={<PublicSector />} />

    {/* Resources */}
    <Route path="/resources" element={<Navigate to="/resources/case-studies" replace />} />
    <Route path="/resources/case-studies" element={<CaseStudies />} />
    <Route path="/resources/case-studies/:slug" element={<CaseStudyDetail />} />
    <Route path="/resources/blog" element={<Blog />} />
    <Route path="/resources/blog/:slug" element={<BlogDetail />} />
    <Route path="/resources/webinars" element={<Webinars />} />
    <Route path="/resources/events" element={<Events />} />

    {/* Company */}
    <Route path="/company" element={<Navigate to="/company/about" replace />} />
    <Route path="/company/about" element={<About />} />
    <Route path="/company/ibm-partnership" element={<IBMPartnership />} />
    <Route path="/company/customers" element={<Customers />} />

    <Route path="/contact" element={<Contact />} />
    <Route path="/icon-lab" element={<IconLab />} />
    <Route path="/logo-lab" element={<LogoLab />} />
    <Route path="/figure-lab" element={<FigureLab />} />
    {/* Catch-all — must stay last. */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

import { useParams } from "react-router-dom";
const LegacyProductRedirect = ({ practice }: { practice: string }) => {
  const { product } = useParams<{ product: string }>();
  return <Navigate to={`/solutions/${practice}/${product ?? ""}`} replace />;
};
