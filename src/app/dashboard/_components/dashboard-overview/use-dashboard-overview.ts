"use client";

import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { formatTodayLabel } from "@/i18n/format";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { useDashboard } from "../../_providers/dashboard-context";

const emptySubscribe = () => () => {};

export function useDashboardOverview() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language as Locale) || defaultLocale;
  const { userName, reservations, summary } = useDashboard();
  const recentReservations = reservations.slice(0, 6);

  // Client-only label avoids SSR/client locale-date mismatches.
  const todayLabel = useSyncExternalStore(
    emptySubscribe,
    () => formatTodayLabel(locale),
    () => "",
  );

  return {
    t,
    locale,
    userName,
    summary,
    recentReservations,
    todayLabel,
  };
}
