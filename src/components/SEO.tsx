import React from "react";
import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title?: string;
  description?: string;
  lang?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "React Snappy Modal - Modern React Modal Library",
  description = "A lightweight, promise-based modal component for React that makes handling modals simple, intuitive, and type-safe",
  lang = "en",
}) => {
  const metaTags = [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "keywords",
      content:
        "react modal, react dialog, popup component, modal library, alert dialog, confirm dialog, modal form, promise modal, async modal, typescript modal, react component, UI component, modal popup, lightbox, overlay, react hooks modal",
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={metaTags}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "React Snappy Modal",
          description: description,
          keywords:
            "react modal, react snappy modal, react dialog, popup component, modal library, alert dialog, confirm dialog, modal form, promise modal, async modal, typescript modal",
        })}
      </script>
    </Helmet>
  );
};
