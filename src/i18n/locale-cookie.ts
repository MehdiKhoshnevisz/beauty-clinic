import {
  LOCALE_COOKIE_NAME,
  defaultLocale,
  localeDirection,
  resolveLocale,
  type Locale,
} from "./settings";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`),
  );
  return resolveLocale(match ? decodeURIComponent(match[1]) : null);
}

export function writeLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = locale;
  root.dir = localeDirection[locale];
}
