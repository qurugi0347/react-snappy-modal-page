import { Helmet } from "react-helmet-async";
import { currentRoute } from "../i18n/i18n";
import {
  localizedPath,
  siteUrl,
  supportedLanguages,
  type SupportedLanguage,
} from "../routes";

const ogLocales = { en: "en_US", ko: "ko_KR", zh: "zh_CN" } as const;
const siteName = "React Snappy Modal";
const author = { "@type": "Person", name: "Jun Seo" };

type SeoProps = {
  path: string;
  title: string;
  description: string;
  // Breadcrumb label for documentation pages; the home page omits it.
  breadcrumb?: string;
};

function structuredData(
  { title, description, breadcrumb }: SeoProps,
  language: SupportedLanguage,
  url: string,
) {
  const homeUrl = siteUrl + localizedPath("/", language);
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl + "/",
    inLanguage: supportedLanguages,
  };

  if (!breadcrumb) {
    return [
      website,
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: siteName,
        url,
        description,
        inLanguage: language,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author,
        downloadUrl: "https://www.npmjs.com/package/react-snappy-modal",
        sameAs: [
          "https://github.com/qurugi0347/react-snappy-modal",
          "https://www.npmjs.com/package/react-snappy-modal",
        ],
      },
    ];
  }

  return [
    website,
    {
      "@type": "TechArticle",
      "@id": `${url}#article`,
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      inLanguage: language,
      author,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@type": "SoftwareApplication", name: siteName },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: homeUrl },
        { "@type": "ListItem", position: 2, name: breadcrumb, item: url },
      ],
    },
  ];
}

export function Seo(props: SeoProps) {
  const { path, title, description } = props;
  const { language, found } = currentRoute;
  const url = siteUrl + localizedPath(path, language);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": structuredData(props, language, url),
  }).replace(/</g, "\\u003c");

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {!found && <meta name="robots" content="noindex, follow" />}
      {found &&
        supportedLanguages.map(alternate => (
          <link
            key={alternate}
            rel="alternate"
            hrefLang={alternate}
            href={siteUrl + localizedPath(path, alternate)}
          />
        ))}
      {found && (
        <link rel="alternate" hrefLang="x-default" href={siteUrl + path} />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={ogLocales[language]} />
      {supportedLanguages
        .filter(alternate => alternate !== language)
        .map(alternate => (
          <meta
            key={alternate}
            property="og:locale:alternate"
            content={ogLocales[alternate]}
          />
        ))}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {found && <script type="application/ld+json">{jsonLd}</script>}
    </Helmet>
  );
}
