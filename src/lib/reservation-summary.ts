import type { Reservation } from "@/types/reservation";

export type ReservationSummary = {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
};

export function getReservationSummary(
  reservations: Reservation[],
  today: string,
): ReservationSummary {
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

export function getPendingReservationSummary(
  reservations: Reservation[],
): ReservationSummary {
  const cancelled = reservations.filter((r) => r.status === "canceled").length;
  return {
    total: reservations.length,
    upcoming: reservations.length - cancelled,
    completed: 0,
    cancelled,
  };
}
