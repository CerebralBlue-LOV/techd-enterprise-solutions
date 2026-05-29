import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "@app/App";
import { installStaleChunkRecovery } from "@app/staleChunkRecovery";
import "./index.css";

installStaleChunkRecovery();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
