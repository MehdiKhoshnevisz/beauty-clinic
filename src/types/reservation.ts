export type ReservationStatus = "pending" | "confirmed" | "canceled";

export type Reservation = {
  id: string;
  customerName: string;
  phone: string;
  /** Stable service key used for i18n lookup (`services.*`). */
  serviceType: string;
  date: string;
  /** 24h time string, e.g. "14:30". */
  time: string;
  status: ReservationStatus;
  notes?: string;
  email?: string;
};

export const RESERVATION_STATUSES: ReservationStatus[] = [
  "pending",
  "confirmed",
  "canceled",
];
