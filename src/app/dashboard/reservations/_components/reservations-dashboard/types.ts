import type { Reservation, ReservationStatus } from "@/types/reservation";

export type StatusFilter = ReservationStatus | "all";

export type StatusFilterItem = {
  label: string;
  value: StatusFilter;
};

export type ReservationsDashboardState = {
  searchQuery: string;
  statusFilter: StatusFilter;
  selectedReservation: Reservation | null;
  isNewReservationOpen: boolean;
  page: number;
};
