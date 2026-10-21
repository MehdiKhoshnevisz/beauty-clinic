"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import i18next, { type i18n as I18nInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import fa from "./locales/fa.json";
import en from "./locales/en.json";
import {
  applyDocumentLocale,
  readLocaleCookie,
  writeLocaleCookie,
} from "./locale-cookie";
import { defaultLocale, type Locale } from "./settings";

const resources = {
  fa: { translation: fa },
  en: { translation: en },
} as const;

let clientInstance: I18nInstance | null = null;

function getClientI18n(locale: Locale): I18nInstance {
  if (!clientInstance) {
    clientInstance = i18next.createInstance();
    void clientInstance.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: defaultLocale,
      interpolation: { escapeValue: false },
      returnNull: false,
    });
  } else if (clientInstance.language !== locale) {
    void clientInstance.changeLanguage(locale);
  }
  return clientInstance;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const instance = useMemo(() => getClientI18n(locale), [locale]);

  useEffect(() => {
    setTimeout(() => {
      setLocaleState(readLocaleCookie());
    }, 0);
  }, []);

  useEffect(() => {
    applyDocumentLocale(locale);
    if (instance.language !== locale) {
      void instance.changeLanguage(locale);
    }
  }, [instance, locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      setLocaleState(next);
      writeLocaleCookie(next);
      applyDocumentLocale(next);
      void instance.changeLanguage(next);
    },
    [instance, locale],
  );

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>
      <I18nextProvider i18n={instance}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within I18nProvider");
  }
  return context;
}
