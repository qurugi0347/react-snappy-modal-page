import i18n from "i18next";
import {
  initReactI18next,
  useTranslation as useOriginalTranslation,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import nl2br from "react-br";
import React from "react";
import en from "./locales/en.json";
import ko from "./locales/ko.json";
import zh from "./locales/zh.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
      zh: {
        translation: zh,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Custom useTranslation hook with nl2br applied
export const useTranslation = () => {
  const { t: originalT, ...rest } = useOriginalTranslation();

  const t = React.useCallback(
    (key: string, options?: any) => {
      const translated = originalT(key, options);
      return nl2br(translated);
    },
    [originalT],
  );

  return { t, ...rest };
};

export default i18n;
