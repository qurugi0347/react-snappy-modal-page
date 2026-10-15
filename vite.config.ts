import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import prerender from "@prerenderer/rollup-plugin";
import {
  localizedPath,
  pagePaths,
  siteUrl,
  supportedLanguages,
} from "./src/routes";

const routes = supportedLanguages.flatMap(language =>
  pagePaths.map(path => localizedPath(path, language)),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pagePaths
  .flatMap(path => {
    const alternates = [...supportedLanguages, "x-default" as const]
      .map(language => {
        const url =
          siteUrl +
          localizedPath(path, language === "x-default" ? "en" : language);
        return `    <xhtml:link rel="alternate" hreflang="${language}" href="${url}" />`;
      })
      .join("\n");
    return supportedLanguages.map(
      language => `  <url>
    <loc>${siteUrl + localizedPath(path, language)}</loc>
${alternates}
  </url>`,
    );
  })
  .join("\n")}
</urlset>
`;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wyw(),
    {
      name: "localized-sitemap",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: sitemap,
        });
      },
    },
    prerender({
      routes,
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        // Wait until react-helmet-async has written the page head
        renderAfterElementExists: 'link[rel="canonical"][data-rh]',
      },
    }),
  ],
});
