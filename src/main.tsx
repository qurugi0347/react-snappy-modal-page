import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnappyModalProvider } from "react-snappy-modal";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import "./i18n/i18n"; // Import i18n initialization

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <SnappyModalProvider>
        <App />
      </SnappyModalProvider>
    </HelmetProvider>
  </StrictMode>,
);
