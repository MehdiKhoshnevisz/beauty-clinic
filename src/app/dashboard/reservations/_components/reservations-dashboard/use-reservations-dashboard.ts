"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/toast";
import type { Reservation } from "@/types/reservation";
import { getPageItems } from "@/lib/utils";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { useDashboard } from "../../../_providers/dashboard-context";
import type { StatusFilter } from "./types";
import {
  filterReservations,
  getPaginationRange,
  getStatusFilterItems,
  PAGE_SIZE,
} from "./utils";

export function useReservationsDashboard() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language as Locale) || defaultLocale;
  const { userName, reservations, setReservations } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageFilters, setPageFilters] = useState({ searchQuery, statusFilter });

  // Reset to page 1 when filters change (adjust during render).
  if (
    searchQuery !== pageFilters.searchQuery ||
    statusFilter !== pageFilters.statusFilter
  ) {
    setPageFilters({ searchQuery, statusFilter });
    setPage(1);
  }

  const filteredReservations = useMemo(
    () => filterReservations(reservations, searchQuery, statusFilter),
    [reservations, searchQuery, statusFilter],
  );

  const { totalPages, currentPage, pageStart, rangeFrom, rangeTo } =
    getPaginationRange(filteredReservations.length, page, PAGE_SIZE);

  const paginatedReservations = filteredReservations.slice(
    pageStart,
    pageStart + PAGE_SIZE,
  );
  const pageItems = getPageItems(currentPage, totalPages);

  const statusFilterItems = useMemo(() => getStatusFilterItems(t), [t]);

  function goToPage(nextPage: number) {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  }

  function handleCreateReservation(reservation: Reservation) {
    setReservations((prev) => [reservation, ...prev]);
    toast.add({
      type: "success",
      title: t("reservations.createSuccessToast"),
    });
  }

  return {
    t,
    locale,
    userName,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    statusFilterItems,
    selectedReservation,
    setSelectedReservation,
    isNewReservationOpen,
    setIsNewReservationOpen,
    filteredReservations,
    paginatedReservations,
    totalPages,
    currentPage,
    rangeFrom,
    rangeTo,
    pageItems,
    goToPage,
    handleCreateReservation,
  };
}
