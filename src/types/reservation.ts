export type ReservationStatus = "pending" | "confirmed" | "canceled";

export type Reservation = {
  id: string;
  customerName: string;
  phone: string;
  serviceType: string;
  date: string;
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

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  canceled: "Canceled",
};
