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

export const supportedLanguages = ["en", "ko", "zh"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const languageStorageKey = "i18nextLng";

export const normalizeLanguage = (
  language?: string | null,
): SupportedLanguage => {
  const languageCode = language?.split("-")[0].toLowerCase();

  return supportedLanguages.includes(languageCode as SupportedLanguage)
    ? (languageCode as SupportedLanguage)
    : "en";
};

const seedInitialLanguage = () => {
  try {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);

    if (storedLanguage) {
      const normalizedStoredLanguage = normalizeLanguage(storedLanguage);

      if (normalizedStoredLanguage !== storedLanguage) {
        window.localStorage.setItem(
          languageStorageKey,
          normalizedStoredLanguage,
        );
      }

      return;
    }

    const browserLanguage = normalizeLanguage(
      typeof navigator !== "undefined" ? navigator.language : undefined,
    );
    window.localStorage.setItem(languageStorageKey, browserLanguage);
  } catch {
    // The detector falls back to navigator when localStorage is unavailable.
  }
};

seedInitialLanguage();

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
    supportedLngs: supportedLanguages,
    load: "languageOnly",
    detection: {
      lookupLocalStorage: languageStorageKey,
      caches: ["localStorage"],
    },
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
