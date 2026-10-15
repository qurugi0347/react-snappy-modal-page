import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../i18n/i18n";
import { siteUrl } from "../routes";

type SeoProps = {
  path: string;
  title: string;
  description: string;
};

export function Seo({ path, title, description }: SeoProps) {
  const { i18n } = useTranslation();
  const url = siteUrl + path;

  return (
    <Helmet htmlAttributes={{ lang: normalizeLanguage(i18n.language) }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
