import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "@app/providers";
import { AppRoutes } from "@app/routes";
import { prefetchHeroFigures } from "@app/prefetchFigures";
import IntroSplash from "@shared/IntroSplash";

/**
 * App shell. Composes global providers + router + route table.
 * Keep this file boring — feature work belongs in pages/sections.
 */
const App = () => {
  // Warm the three.js hero figure chunks during idle time so route
  // changes don't pay the chunk-download cost.
  useEffect(() => {
    prefetchHeroFigures();
  }, []);

  return (
    <Providers>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <IntroSplash force />
        <AppRoutes />
      </BrowserRouter>
    </Providers>
  );
};

export default App;
