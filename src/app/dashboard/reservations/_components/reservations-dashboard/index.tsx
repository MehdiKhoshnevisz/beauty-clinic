"use client";

import { Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReservationStatus } from "@/types/reservation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewReservationModal } from "../new-reservation-modal";
import { ReservationDetailModal } from "../reservation-detail-modal";
import { ReservationsView } from "../reservations-view";
import { useReservationsDashboard } from "./use-reservations-dashboard";

function EmptyReservationsState() {
  const { t } = useTranslation();

  return (
    <div className="px-4 py-16 text-center lg:px-5">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-2 text-charcoal/60">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-charcoal/4">
          <Search className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-medium text-charcoal">
          {t("reservations.emptyTitle")}
        </p>
        <p className="text-sm">{t("reservations.emptyBody")}</p>
      </div>
    </div>
  );
}

export function ReservationsDashboard() {
  const {
    t,
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
  } = useReservationsDashboard();

  return (
    <>
      <main className="relative px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="dashboard-fade-up flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-charcoal/50 uppercase">
              {t("dashboard.welcomeBack", { name: userName })}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
              {t("reservations.title")}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/60">
              {t("reservations.subtitle")}
            </p>
          </div>
          <Button
            type="button"
            className="h-11 gap-2 rounded-xl bg-charcoal px-5 text-sm font-medium text-white shadow-cta transition-all hover:opacity-90 hover:shadow-lg"
            onClick={() => setIsNewReservationOpen(true)}
          >
            <Plus className="size-4" aria-hidden />
            {t("reservations.newReservation")}
          </Button>
        </div>

        <section
          className="surface-panel dashboard-fade-up mt-8 overflow-hidden rounded-2xl border border-charcoal/6 shadow-panel [animation-delay:0.1s]"
          aria-label={t("reservations.listLabel")}
        >
          <div className="flex flex-col gap-4 border-b border-charcoal/6 bg-charcoal/1 p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-3 lg:p-5">
            <div className="min-w-0 flex-1 sm:max-w-sm">
              <Label htmlFor="reservation-search" className="mb-1.5">
                {t("reservations.searchByCustomer")}
              </Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 start-2.5 size-4 -translate-y-1/2 text-charcoal/40"
                  aria-hidden
                />
                <Input
                  id="reservation-search"
                  type="search"
                  placeholder={t("reservations.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-10 rounded-xl bg-white/80 ps-9"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="w-full sm:w-44">
              <Label htmlFor="status-filter" className="mb-1.5">
                {t("common.status")}
              </Label>
              <Select
                items={statusFilterItems}
                value={statusFilter}
                onValueChange={(value) => {
                  if (value == null) return;
                  setStatusFilter(value as ReservationStatus | "all");
                }}
              >
                <SelectTrigger
                  id="status-filter"
                  className="h-10 w-full min-w-0 rounded-xl bg-white/80 px-2.5 py-1 text-base data-[size=default]:h-10 md:text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  {statusFilterItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="w-full text-sm text-charcoal/60 sm:ms-auto sm:w-auto sm:pb-2 sm:text-end">
              {t("reservations.showingRange", {
                from: rangeFrom,
                to: rangeTo,
                filtered: filteredReservations.length,
              })}
            </p>
          </div>

          {filteredReservations.length === 0 ? (
            <EmptyReservationsState />
          ) : (
            <>
              <ReservationsView
                reservations={paginatedReservations}
                onSelect={setSelectedReservation}
              />

              {totalPages > 1 ? (
                <div className="flex flex-col gap-3 border-t border-charcoal/6 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-5">
                  <p className="text-sm text-charcoal/60 tabular-nums">
                    {t("reservations.pageOf", {
                      page: currentPage,
                      pages: totalPages,
                    })}
                  </p>
                  <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          text={t("common.previous")}
                          aria-disabled={currentPage <= 1}
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : undefined
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            goToPage(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                      {pageItems.map((item, index) =>
                        item === "ellipsis" ? (
                          <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={item}>
                            <PaginationLink
                              href="#"
                              isActive={item === currentPage}
                              onClick={(event) => {
                                event.preventDefault();
                                goToPage(item);
                              }}
                            >
                              {item}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          text={t("common.next")}
                          aria-disabled={currentPage >= totalPages}
                          className={
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-50"
                              : undefined
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            goToPage(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              ) : null}
            </>
          )}
        </section>
      </main>

      <ReservationDetailModal
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />

      <NewReservationModal
        open={isNewReservationOpen}
        onClose={() => setIsNewReservationOpen(false)}
        onCreate={handleCreateReservation}
      />
    </>
  );
}
