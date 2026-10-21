import { formatTimeDisplay } from "@/i18n/format";
import type { Locale } from "@/i18n/settings";
import type { ValidatedNewReservation } from "@/lib/new-reservation-schema";
import type { Reservation } from "@/types/reservation";

export function createReservationFromValues(
  data: ValidatedNewReservation,
  locale: Locale,
): Reservation {
  return {
    id: `RSV-${Date.now().toString().slice(-6)}`,
    customerName: data.customerName,
    phone: data.phone,
    serviceType: data.serviceType,
    date: data.date,
    time: formatTimeDisplay(data.time, locale),
    status: "pending",
  };
}
