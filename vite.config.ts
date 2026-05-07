import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { saveLogoSizesPlugin } from "./vite-plugins/save-logo-sizes";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/techd-enterprise-solutions/" : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    saveLogoSizesPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@sections": path.resolve(__dirname, "./src/sections"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@seo": path.resolve(__dirname, "./src/components/shared"),
      "@content": path.resolve(__dirname, "./src/content"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
