import { RESERVATION_STATUSES } from "@/types/reservation";
import type { Reservation } from "@/types/reservation";
import type { StatusFilter, StatusFilterItem } from "./types";

export const PAGE_SIZE = 5;

export function filterReservations(
  reservations: Reservation[],
  searchQuery: string,
  statusFilter: StatusFilter,
) {
  const query = searchQuery.trim().toLowerCase();
  return reservations.filter((reservation) => {
    const matchesSearch =
      query === "" || reservation.customerName.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
}

export function getStatusFilterItems(
  t: (key: string) => string,
): StatusFilterItem[] {
  return [
    { label: t("reservations.allStatuses"), value: "all" },
    ...RESERVATION_STATUSES.map((status) => ({
      label: t(`status.${status}`),
      value: status,
    })),
  ];
}

export function getPaginationRange(
  filteredCount: number,
  currentPage: number,
  pageSize: number,
) {
  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const page = Math.min(currentPage, totalPages);
  const pageStart = (page - 1) * pageSize;
  const rangeFrom = filteredCount === 0 ? 0 : pageStart + 1;
  const rangeTo = Math.min(pageStart + pageSize, filteredCount);

  return {
    totalPages,
    currentPage: page,
    pageStart,
    rangeFrom,
    rangeTo,
  };
}
