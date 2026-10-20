"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { sampleReservations } from "@/data/sample-reservations";
import type { Reservation } from "@/types/reservation";

type DashboardContextValue = {
  userName: string;
  reservations: Reservation[];
  setReservations: Dispatch<SetStateAction<Reservation[]>>;
  summary: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

function getTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getReservationSummary(reservations: Reservation[]) {
  const today = getTodayIso();
  let upcoming = 0;
  let completed = 0;
  let cancelled = 0;

  for (const reservation of reservations) {
    if (reservation.status === "canceled") {
      cancelled += 1;
      continue;
    }
    if (reservation.date < today) {
      completed += 1;
    } else {
      upcoming += 1;
    }
  }

  return {
    total: reservations.length,
    upcoming,
    completed,
    cancelled,
  };
}

export function DashboardProvider({
  children,
  userName,
}: {
  children: ReactNode;
  userName: string;
}) {
  const [reservations, setReservations] =
    useState<Reservation[]>(sampleReservations);

  const summary = useMemo(
    () => getReservationSummary(reservations),
    [reservations],
  );

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
