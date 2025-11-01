import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";
import hi from "./locales/hi/translation.json";
import es from "./locales/es/translation.json";
import fr from "./locales/fr/translation.json";
import ar from "./locales/ar/translation.json";
import bn from "./locales/bn/translation.json";
import ru from "./locales/ru/translation.json";
import pt from "./locales/pt/translation.json";
import ur from "./locales/ur/translation.json";
import id from "./locales/id/translation.json";
import de from "./locales/de/translation.json";
import ja from "./locales/ja/translation.json";
import sw from "./locales/sw/translation.json";
import mr from "./locales/mr/translation.json";
import te from "./locales/te/translation.json";
import tr from "./locales/tr/translation.json";
import ta from "./locales/ta/translation.json";
import ko from "./locales/ko/translation.json";
import vi from "./locales/vi/translation.json";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  hi: { translation: hi },
  es: { translation: es },
  fr: { translation: fr },
  ar: { translation: ar },
  bn: { translation: bn },
  ru: { translation: ru },
  pt: { translation: pt },
  ur: { translation: ur },
  id: { translation: id },
  de: { translation: de },
  ja: { translation: ja },
  sw: { translation: sw },
  mr: { translation: mr },
  te: { translation: te },
  tr: { translation: tr },
  ta: { translation: ta },
  ko: { translation: ko },
  vi: { translation: vi },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    onLanguageChange: (lng) => {
      document.documentElement.setAttribute(
        "dir",
        lng === "ar" || lng === "ur" ? "rtl" : "ltr"
      );
    },
  });

export default i18n;
