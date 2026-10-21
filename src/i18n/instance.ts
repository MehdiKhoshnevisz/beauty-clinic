import i18next, { type i18n as I18nInstance } from "i18next";
import fa from "./locales/fa.json";
import en from "./locales/en.json";
import { defaultLocale, type Locale } from "./settings";

const resources = {
  fa: { translation: fa },
  en: { translation: en },
} as const;

export function createI18nInstance(locale: Locale = defaultLocale): I18nInstance {
  const instance = i18next.createInstance();
  void instance.init({
    resources: { ...resources },
    lng: locale,
    fallbackLng: defaultLocale,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  return instance;
}

let sharedInstance: I18nInstance | null = null;

export function getSharedI18n(): I18nInstance {
  if (!sharedInstance) {
    sharedInstance = createI18nInstance(defaultLocale);
  }
  return sharedInstance;
}

export function t(
  key: string,
  options?: Record<string, unknown>,
): string {
  return getSharedI18n().t(key, options);
}
