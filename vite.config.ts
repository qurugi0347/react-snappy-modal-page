import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import prerender from "@prerenderer/rollup-plugin";
import { docRoutes } from "./src/routes";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wyw(),
    prerender({
      routes: ["/", ...Object.values(docRoutes)],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        // Wait until react-helmet-async has written the page head
        renderAfterElementExists: 'link[rel="canonical"][data-rh]',
        // Render English regardless of the build machine's locale
        pageSetup: page =>
          page.evaluateOnNewDocument(() =>
            Object.defineProperty(navigator, "language", {
              get: () => "en-US",
            }),
          ),
      },
    }),
  ],
});
