import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Examples } from "../components/Examples";
import { Installation } from "../components/Installation";
import { Usage } from "../components/Usage";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        path="/"
        title={t("home.meta.title")}
        description={t("home.meta.description")}
      />
      <Hero />
      <Features />
      <Examples />
      <Installation />
      <Usage />
    </>
  );
}
