"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { getSampleReservations } from "@/data/sample-reservations";
import { getTodayIso } from "@/i18n/format";
import { defaultLocale, type Locale } from "@/i18n/settings";
import {
  getPendingReservationSummary,
  getReservationSummary,
  type ReservationSummary,
} from "@/lib/reservation-summary";
import type { Reservation } from "@/types/reservation";

type DashboardContextValue = {
  userName: string;
  reservations: Reservation[];
  setReservations: Dispatch<SetStateAction<Reservation[]>>;
  summary: ReservationSummary;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

const emptySubscribe = () => () => {};

export function DashboardProvider({
  children,
  userName,
}: {
  children: ReactNode;
  userName: string;
}) {
  const { i18n } = useTranslation();
  const locale = (i18n.language as Locale) || defaultLocale;
  const [reservations, setReservations] = useState<Reservation[]>(() =>
    getSampleReservations(locale),
  );
  const [reservationsLocale, setReservationsLocale] = useState(locale);

  // Client-only "today" avoids SSR/client date mismatches.
  const today = useSyncExternalStore(emptySubscribe, getTodayIso, () => null);

  // Re-seed sample data when the locale changes (adjust during render).
  if (locale !== reservationsLocale) {
    setReservationsLocale(locale);
    setReservations(getSampleReservations(locale));
  }

  const summary = useMemo(() => {
    if (today) return getReservationSummary(reservations, today);
    return getPendingReservationSummary(reservations);
  }, [reservations, today]);

  const value = useMemo(
    () => ({
      userName,
      reservations,
      setReservations,
      summary,
    }),
    [userName, reservations, summary],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}
