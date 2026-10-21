export { t, getSharedI18n, createI18nInstance } from "./instance";
export {
  defaultLocale,
  locales,
  localeDirection,
  localeDateTag,
  localeLabels,
  LOCALE_COOKIE_NAME,
  isLocale,
  resolveLocale,
  type Locale,
} from "./settings";
export { I18nProvider, useLocale } from "./provider";

export type TranslateFn = (
  key: string,
  options?: Record<string, unknown>,
) => string;