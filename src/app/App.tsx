import { BrowserRouter } from "react-router-dom";
import { Providers } from "@app/providers";
import { AppRoutes } from "@app/routes";

/**
 * App shell. Composes global providers + router + route table.
 * Keep this file boring — feature work belongs in pages/sections.
 */
const App = () => (
  <Providers>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  </Providers>
);

export default App;
