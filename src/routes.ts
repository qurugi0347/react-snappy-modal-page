export const siteUrl = "https://react.snappy-modal.com";

export const supportedLanguages = ["en", "ko", "zh"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const docRoutes = {
  gettingStarted: "/docs/getting-started/",
  api: "/docs/api/",
  asyncConfirmation: "/guides/async-confirmation/",
  modalLayers: "/guides/modal-layers/",
} as const;

export type DocPage = keyof typeof docRoutes;

export const pagePaths = ["/", ...Object.values(docRoutes)];

export function localizedPath(path: string, language: SupportedLanguage) {
  return language === "en" ? path : `/${language}${path}`;
}

export function resolveRoute(pathname: string) {
  const normalizedPath = pathname.replace(/\/?$/, "/");
  const prefix = normalizedPath.split("/")[1];
  const language = prefix === "ko" || prefix === "zh" ? prefix : "en";
  const path = language === "en" ? normalizedPath : normalizedPath.slice(3);
  const found = pagePaths.includes(path);

  // Preserve the home fallback, but do not advertise unknown URLs for indexing.
  return { language, path: found ? path : "/", found } as const;
}
