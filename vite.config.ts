import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import prerender from "@prerenderer/rollup-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wyw(),
    prerender({
      routes: ["/"],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        renderAfterElementExists: "#root",
      },
    }),
  ],
});
