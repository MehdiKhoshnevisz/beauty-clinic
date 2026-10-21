import type { Reservation } from "@/types/reservation";

export type ReservationsViewProps = {
  reservations: Reservation[];
  onSelect?: (reservation: Reservation) => void;
};
