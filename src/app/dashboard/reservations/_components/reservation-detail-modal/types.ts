import type { Reservation } from "@/types/reservation";

export type ReservationDetailModalProps = {
  reservation: Reservation | null;
  onClose: () => void;
};
