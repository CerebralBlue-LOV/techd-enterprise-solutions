import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Solutions from "@pages/Solutions";
import ProductDetail from "@pages/ProductDetail";
import Industries from "@pages/Industries";
import Services from "@pages/Services";
import Resources from "@pages/Resources";
import Contact from "@pages/Contact";
import NotFound from "@pages/NotFound";

/**
 * Central route table. Add new routes here above the catch-all "*".
 * Page components live in `src/pages/` and are thin compositions of
 * sections from `src/sections/<page>/`.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/solutions" element={<Solutions />} />
    <Route path="/solutions/:practice/:product" element={<ProductDetail />} />
    <Route path="/industries" element={<Industries />} />
    <Route path="/services" element={<Services />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/contact" element={<Contact />} />
    {/* Catch-all — must stay last. */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
