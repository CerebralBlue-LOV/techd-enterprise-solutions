import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "@app/App";
import "./index.css";

// Recover from stale dynamic-import chunks after a redeploy.
// When the browser holds an old index.js that points at a hashed chunk
// that no longer exists, React lazy() throws "error loading dynamically
// imported module". One reload picks up the new manifest.
const RELOAD_FLAG = "lov:chunk-reloaded";
export const hasReloadedForStaleChunk = () => sessionStorage.getItem(RELOAD_FLAG) === "1";
const isStaleChunkError = (value: unknown): boolean => {
  const msg = String(
    (value as { message?: string } | null)?.message ?? value ?? "",
  );
  return (
    msg.includes("dynamically imported module") ||
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("Importing a module script failed") ||
    /ChunkLoadError/i.test(msg)
  );
};
export const tryReloadForStaleChunk = (value: unknown): boolean => {
  if (isStaleChunkError(value) && !hasReloadedForStaleChunk()) {
    sessionStorage.setItem(RELOAD_FLAG, "1");
    window.location.reload();
    return true;
  }
  return false;
};
window.addEventListener("error", (event) => {
  tryReloadForStaleChunk(event.error ?? event.message ?? event);
});
window.addEventListener("unhandledrejection", (event) => {
  tryReloadForStaleChunk(event.reason);
});
window.addEventListener("load", () => {
  sessionStorage.removeItem(RELOAD_FLAG);
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
