import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "@app/App";
import "./index.css";

// Recover from stale dynamic-import chunks after a redeploy.
// When the browser holds an old index.js that points at a hashed chunk
// that no longer exists, React lazy() throws "error loading dynamically
// imported module". One reload picks up the new manifest.
const RELOAD_FLAG = "lov:chunk-reloaded";
window.addEventListener("error", (event) => {
  const msg = String(event?.message ?? "");
  if (
    msg.includes("dynamically imported module") &&
    !sessionStorage.getItem(RELOAD_FLAG)
  ) {
    sessionStorage.setItem(RELOAD_FLAG, "1");
    window.location.reload();
  }
});
window.addEventListener("load", () => {
  sessionStorage.removeItem(RELOAD_FLAG);
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
