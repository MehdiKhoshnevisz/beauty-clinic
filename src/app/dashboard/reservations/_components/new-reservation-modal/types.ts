import type { Reservation } from "@/types/reservation";

export type NewReservationModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (reservation: Reservation) => void;
};
