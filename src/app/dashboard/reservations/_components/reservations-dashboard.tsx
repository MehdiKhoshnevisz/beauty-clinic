"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import type { Reservation, ReservationStatus } from "@/types/reservation";
import { RESERVATION_STATUSES, STATUS_LABELS } from "@/types/reservation";
import { useDashboard } from "../../_providers/dashboard-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewReservationModal } from "./new-reservation-modal";
import { ReservationDetailModal } from "./reservation-detail-modal";
import { StatusBadge } from "./status-badge";

const charcoal = "#1A1A1A";
const ink = "#111111";

function formatDisplayDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function EmptyReservationsState() {
  return (
    <div className="px-4 py-16 text-center lg:px-5">
      <div
        className="mx-auto flex max-w-sm flex-col items-center gap-2"
        style={{ color: `${charcoal}99` }}
      >
        <span
          className="flex size-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${charcoal}0A` }}
        >
          <Search className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-medium" style={{ color: charcoal }}>
          No matching reservations
        </p>
        <p className="text-sm">
          Try a different name or clear the status filter.
        </p>
      </div>
    </div>
  );
}

export function ReservationsDashboard() {
  const { userName, reservations, setReservations } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">(
    "all",
  );
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);

  const filteredReservations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return reservations.filter((reservation) => {
      const matchesSearch =
        query === "" || reservation.customerName.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || reservation.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchQuery, statusFilter]);

  return (
    <>
      <main className="relative px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="dashboard-fade-up flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-xs font-medium tracking-[0.14em] uppercase"
              style={{ color: `${charcoal}80` }}
            >
              Welcome back, {userName}
            </p>
            <h1
              className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ color: charcoal }}
            >
              Reservations
            </h1>
            <p
              className="mt-2 max-w-xl text-sm leading-relaxed"
              style={{ color: `${charcoal}99` }}
            >
              Manage appointments, track status, and review client details.
            </p>
          </div>
          <Button
            type="button"
            className="h-11 gap-2 rounded-xl px-5 text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{
              backgroundColor: ink,
              boxShadow: "0 12px 28px -16px rgba(17,17,17,0.55)",
            }}
            onClick={() => setIsNewReservationOpen(true)}
          >
            <Plus className="size-4" aria-hidden />
            New Reservation
          </Button>
        </div>

        <section
          className="dashboard-fade-up mt-8 overflow-hidden rounded-2xl border"
          style={{
            borderColor: `${charcoal}10`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 100%)",
            boxShadow:
              "0 1px 2px rgba(17,17,17,0.04), 0 18px 40px -28px rgba(17,17,17,0.35)",
            animationDelay: "0.1s",
          }}
          aria-label="Reservations list"
        >
          <div
            className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-3 lg:p-5"
            style={{
              borderColor: `${charcoal}0F`,
              backgroundColor: `${charcoal}03`,
            }}
          >
            <div className="min-w-0 flex-1 sm:max-w-sm">
              <Label htmlFor="reservation-search" className="mb-1.5">
                Search by customer
              </Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
                  style={{ color: `${charcoal}66` }}
                  aria-hidden
                />
                <Input
                  id="reservation-search"
                  type="search"
                  placeholder="Customer name…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-10 rounded-xl bg-white/80 pl-9"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="w-full sm:w-44">
              <Label htmlFor="status-filter" className="mb-1.5">
                Status
              </Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as ReservationStatus | "all",
                  )
                }
                className="h-10 w-full rounded-xl border border-input bg-white/80 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="all">All statuses</option>
                {RESERVATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
            <p
              className="w-full text-sm sm:ml-auto sm:w-auto sm:pb-2 sm:text-right"
              style={{ color: `${charcoal}99` }}
            >
              Showing{" "}
              <span
                className="font-medium tabular-nums"
                style={{ color: charcoal }}
              >
                {filteredReservations.length}
              </span>{" "}
              of{" "}
              <span
                className="font-medium tabular-nums"
                style={{ color: charcoal }}
              >
                {reservations.length}
              </span>
            </p>
          </div>

          {filteredReservations.length === 0 ? (
            <EmptyReservationsState />
          ) : (
            <>
              <ul className="md:hidden">
                {filteredReservations.map((reservation) => (
                  <li
                    key={reservation.id}
                    className="border-b p-4 last:border-b-0"
                    style={{ borderColor: `${charcoal}0A` }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${charcoal}0C`,
                          color: charcoal,
                        }}
                      >
                        {getInitials(reservation.customerName)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-semibold tracking-tight"
                              style={{ color: charcoal }}
                            >
                              {reservation.customerName}
                            </p>
                            <p
                              className="mt-0.5 truncate text-sm"
                              style={{ color: `${charcoal}99` }}
                            >
                              {reservation.serviceType}
                            </p>
                          </div>
                          <StatusBadge
                            status={reservation.status}
                            className="shrink-0"
                          />
                        </div>
                        <dl
                          className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm"
                          style={{ color: `${charcoal}A6` }}
                        >
                          <div>
                            <dt
                              className="text-[11px] font-medium tracking-[0.08em] uppercase"
                              style={{ color: `${charcoal}66` }}
                            >
                              Phone
                            </dt>
                            <dd className="mt-0.5 tabular-nums">
                              {reservation.phone}
                            </dd>
                          </div>
                          <div>
                            <dt
                              className="text-[11px] font-medium tracking-[0.08em] uppercase"
                              style={{ color: `${charcoal}66` }}
                            >
                              Time
                            </dt>
                            <dd className="mt-0.5">{reservation.time}</dd>
                          </div>
                          <div className="col-span-2">
                            <dt
                              className="text-[11px] font-medium tracking-[0.08em] uppercase"
                              style={{ color: `${charcoal}66` }}
                            >
                              Date
                            </dt>
                            <dd className="mt-0.5">
                              {formatDisplayDate(reservation.date)}
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
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr
                      className="border-b text-[11px] font-medium tracking-[0.12em] uppercase"
                      style={{
                        borderColor: `${charcoal}0F`,
                        color: `${charcoal}73`,
                        backgroundColor: `${charcoal}04`,
                      }}
                    >
                      <th scope="col" className="px-4 py-3 lg:px-5">
                        Customer
                      </th>
                      <th scope="col" className="px-4 py-3 lg:px-5">
                        Phone
                      </th>
                      <th scope="col" className="px-4 py-3 lg:px-5">
                        Service
                      </th>
                      <th scope="col" className="px-4 py-3 lg:px-5">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3 lg:px-5">
                        Time
                      </th>
                      <th scope="col" className="px-4 py-3 lg:px-5">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-right lg:px-5">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b transition-colors last:border-b-0 hover:bg-black/[0.025]"
                        style={{ borderColor: `${charcoal}0A` }}
                      >
                        <td className="px-4 py-3.5 lg:px-5">
                          <div className="flex items-center gap-3">
                            <span
                              className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                              style={{
                                backgroundColor: `${charcoal}0C`,
                                color: charcoal,
                              }}
                            >
                              {getInitials(reservation.customerName)}
                            </span>
                            <span className="font-medium">
                              {reservation.customerName}
                            </span>
                          </div>
                        </td>
                        <td
                          className="px-4 py-3.5 whitespace-nowrap tabular-nums lg:px-5"
                          style={{ color: `${charcoal}A6` }}
                        >
                          {reservation.phone}
                        </td>
                        <td className="px-4 py-3.5 lg:px-5">
                          {reservation.serviceType}
                        </td>
                        <td
                          className="px-4 py-3.5 whitespace-nowrap lg:px-5"
                          style={{ color: `${charcoal}A6` }}
                        >
                          {formatDisplayDate(reservation.date)}
                        </td>
                        <td
                          className="px-4 py-3.5 whitespace-nowrap lg:px-5"
                          style={{ color: `${charcoal}A6` }}
                        >
                          {reservation.time}
                        </td>
                        <td className="px-4 py-3.5 lg:px-5">
                          <StatusBadge status={reservation.status} />
                        </td>
                        <td className="px-4 py-3.5 text-right lg:px-5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => setSelectedReservation(reservation)}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        onCreate={(reservation) => {
          setReservations((prev) => [reservation, ...prev]);
        }}
      />
    </>
  );
}
