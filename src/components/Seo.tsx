import { Helmet } from "react-helmet-async";
import { currentRoute } from "../i18n/i18n";
import { localizedPath, siteUrl, supportedLanguages } from "../routes";

const ogLocales = { en: "en_US", ko: "ko_KR", zh: "zh_CN" } as const;

type SeoProps = {
  path: string;
  title: string;
  description: string;
};

export function Seo({ path, title, description }: SeoProps) {
  const { language, found } = currentRoute;
  const url = siteUrl + localizedPath(path, language);

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
    </Helmet>
  );
}
