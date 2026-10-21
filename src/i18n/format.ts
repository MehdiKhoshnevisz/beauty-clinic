import { defaultLocale, localeDateTag, type Locale } from "./settings";

export function getTodayIso(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatNumber(
  value: number,
  locale: Locale = defaultLocale,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(localeDateTag[locale], options).format(value);
}

export function formatDisplayDate(
  isoDate: string,
  locale: Locale = defaultLocale,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString(
    localeDateTag[locale],
    options ?? {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
}

export function formatTodayLabel(locale: Locale = defaultLocale) {
  return new Date().toLocaleDateString(localeDateTag[locale], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatTimeDisplay(
  time24: string,
  locale: Locale = defaultLocale,
) {
  const [hoursStr, minutes] = time24.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours) || !minutes) return time24;

  if (locale === "fa") {
    const hh = formatNumber(hours, locale, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const mm = formatNumber(Number(minutes), locale, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return `${hh}:${mm}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}
