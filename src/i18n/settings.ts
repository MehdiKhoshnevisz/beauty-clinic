export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE_NAME = "bc_locale";

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};

export const localeDateTag: Record<Locale, string> = {
  fa: "fa-IR",
  en: "en-US",
};

export const localeLabels: Record<Locale, string> = {
  fa: "فا",
  en: "EN",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
