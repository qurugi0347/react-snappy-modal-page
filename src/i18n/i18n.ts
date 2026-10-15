import i18n from "i18next";
import {
  initReactI18next,
  useTranslation as useOriginalTranslation,
} from "react-i18next";
import nl2br from "react-br";
import React from "react";
import en from "./locales/en.json";
import ko from "./locales/ko.json";
import zh from "./locales/zh.json";
import { localizedPath, resolveRoute, supportedLanguages } from "../routes";

export const languageStorageKey = "i18nextLng";
export const currentRoute = resolveRoute(window.location.pathname);

// Only unprefixed English URLs follow a saved or browser ko/zh preference.
if (currentRoute.language === "en" && currentRoute.found) {
  const preferred = (
    localStorage.getItem(languageStorageKey) ?? navigator.language
  ).slice(0, 2);
  if (preferred === "ko" || preferred === "zh") {
    const { search, hash } = window.location;
    window.location.replace(
      localizedPath(currentRoute.path, preferred) + search + hash,
    );
  }
}

i18n.use(initReactI18next).init({
  lng: currentRoute.language,
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
  supportedLngs: supportedLanguages,
  load: "languageOnly",
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
