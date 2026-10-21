"use client";

import { Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReservationStatus } from "@/types/reservation";
import { formatDisplayDate } from "@/i18n/format";
import { getInitials, translateService } from "@/lib/utils";
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
import { StatusBadge } from "../status-badge";
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
              <ul className="md:hidden">
                {paginatedReservations.map((reservation) => (
                  <li
                    key={reservation.id}
                    className="border-b border-charcoal/4 p-4 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-charcoal/5 text-xs font-semibold text-charcoal">
                        {getInitials(reservation.customerName)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold tracking-tight text-charcoal">
                              {reservation.customerName}
                            </p>
                            <p className="mt-0.5 truncate text-sm text-charcoal/60">
                              {translateService(reservation.serviceType, t)}
                            </p>
                          </div>
                          <StatusBadge
                            status={reservation.status}
                            className="shrink-0"
                          />
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-charcoal/65">
                          <div>
                            <dt className="text-[11px] font-medium tracking-[0.08em] text-charcoal/40 uppercase">
                              {t("common.phone")}
                            </dt>
                            <dd className="mt-0.5 tabular-nums">
                              <span dir="ltr" className="inline-block">
                                {reservation.phone}
                              </span>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] font-medium tracking-[0.08em] text-charcoal/40 uppercase">
                              {t("common.time")}
                            </dt>
                            <dd className="mt-0.5">
                              <span dir="ltr" className="inline-block">
                                {reservation.time}
                              </span>
                            </dd>
                          </div>
                          <div className="col-span-2">
                            <dt className="text-[11px] font-medium tracking-[0.08em] text-charcoal/40 uppercase">
                              {t("common.date")}
                            </dt>
                            <dd className="mt-0.5">
                              {formatDisplayDate(reservation.date, locale)}
                            </dd>
                          </div>
                        </dl>
                        <div className="mt-3 flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => setSelectedReservation(reservation)}
                          >
                            {t("common.details")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] text-start text-sm">
                  <thead>
                    <tr className="border-b border-charcoal/6 bg-charcoal/2 text-[11px] font-medium tracking-[0.12em] text-charcoal/45 uppercase">
                      <th scope="col" className="px-4 py-3 text-start lg:px-5">
                        {t("common.customer")}
                      </th>
                      <th scope="col" className="px-4 py-3 text-start lg:px-5">
                        {t("common.phone")}
                      </th>
                      <th scope="col" className="px-4 py-3 text-start lg:px-5">
                        {t("common.service")}
                      </th>
                      <th scope="col" className="px-4 py-3 text-start lg:px-5">
                        {t("common.date")}
                      </th>
                      <th scope="col" className="px-4 py-3 text-start lg:px-5">
                        {t("common.time")}
                      </th>
                      <th scope="col" className="px-4 py-3 text-start lg:px-5">
                        {t("common.status")}
                      </th>
                      <th scope="col" className="px-4 py-3 text-end lg:px-5">
                        <span className="sr-only">{t("common.actions")}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b border-charcoal/4 transition-colors last:border-b-0 hover:bg-black/[0.025]"
                      >
                        <td className="px-4 py-3.5 lg:px-5">
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-charcoal/5 text-xs font-semibold text-charcoal">
                              {getInitials(reservation.customerName)}
                            </span>
                            <span className="font-medium">
                              {reservation.customerName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-charcoal/65 tabular-nums lg:px-5">
                          <span dir="ltr" className="inline-block">
                            {reservation.phone}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 lg:px-5">
                          {translateService(reservation.serviceType, t)}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-charcoal/65 lg:px-5">
                          {formatDisplayDate(reservation.date, locale)}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-charcoal/65 lg:px-5">
                          <span dir="ltr" className="inline-block">
                            {reservation.time}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 lg:px-5">
                          <StatusBadge status={reservation.status} />
                        </td>
                        <td className="px-4 py-3.5 text-end lg:px-5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => setSelectedReservation(reservation)}
                          >
                            {t("common.details")}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
