export const siteUrl = "https://react.snappy-modal.com";

export const docRoutes = {
  gettingStarted: "/docs/getting-started/",
  api: "/docs/api/",
  asyncConfirmation: "/guides/async-confirmation/",
  modalLayers: "/guides/modal-layers/",
} as const;

export type DocPage = keyof typeof docRoutes;
