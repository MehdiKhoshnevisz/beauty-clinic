"use client";

import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../reservations/_components/status-badge";
import { useDashboard } from "../_providers/dashboard-context";

const charcoal = "#1A1A1A";
const ink = "#111111";

function formatDisplayDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTodayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
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

type SummaryCardProps = {
  label: string;
  value: number;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  accent: string;
  hint: string;
};

function SummaryCard({
  label,
  value,
  icon: Icon,
  accent,
  hint,
}: SummaryCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: `${charcoal}10`,
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
        boxShadow:
          "0 1px 2px rgba(17,17,17,0.04), 0 12px 28px -20px rgba(17,17,17,0.28)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-8 size-28 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p
            className="text-xs font-medium tracking-wide uppercase"
            style={{ color: `${charcoal}80` }}
          >
            {label}
          </p>
          <p
            className="mt-2 text-3xl font-semibold tracking-tight tabular-nums"
            style={{ color: charcoal }}
          >
            {value}
          </p>
          <p className="mt-2 text-xs" style={{ color: `${charcoal}80` }}>
            {hint}
          </p>
        </div>
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          <Icon className="size-5" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function DashboardOverview() {
  const { userName, reservations, summary } = useDashboard();
  const recentReservations = reservations.slice(0, 6);

  return (
    <main className="relative px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="dashboard-fade-up flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="text-xs font-medium tracking-[0.14em] uppercase"
            style={{ color: `${charcoal}80` }}
          >
            {formatTodayLabel()}
          </p>
          <h1
            className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: charcoal }}
          >
            Welcome back, {userName}
          </h1>
          <p
            className="mt-2 max-w-xl text-sm leading-relaxed"
            style={{ color: `${charcoal}99` }}
          >
            A clear view of appointments and client activity across your clinic.
          </p>
        </div>
        <Button
          render={<Link href="/dashboard/reservations" />}
          nativeButton={false}
          className="h-11 gap-2 rounded-xl px-5 text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-lg"
          style={{
            backgroundColor: ink,
            boxShadow: "0 12px 28px -16px rgba(17,17,17,0.55)",
          }}
        >
          View reservations
          <ArrowUpRight className="size-4" aria-hidden />
        </Button>
      </div>

      <section
        aria-label="Reservation summary"
        className="dashboard-stagger mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SummaryCard
          label="Total"
          value={summary.total}
          icon={ClipboardList}
          accent={ink}
          hint="All booked appointments"
        />
        <SummaryCard
          label="Upcoming"
          value={summary.upcoming}
          icon={CalendarClock}
          accent="#B45309"
          hint="Scheduled ahead"
        />
        <SummaryCard
          label="Completed"
          value={summary.completed}
          icon={CalendarCheck}
          accent="#047857"
          hint="Finished visits"
        />
        <SummaryCard
          label="Cancelled"
          value={summary.cancelled}
          icon={CalendarX}
          accent="#B91C1C"
          hint="No longer active"
        />
      </section>

      <section
        className="dashboard-fade-up mt-8 overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${charcoal}10`,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 100%)",
          boxShadow:
            "0 1px 2px rgba(17,17,17,0.04), 0 18px 40px -28px rgba(17,17,17,0.35)",
          animationDelay: "0.18s",
        }}
        aria-label="Recent reservations"
      >
        <div
          className="flex items-center justify-between gap-3 border-b px-4 py-4 lg:px-6"
          style={{ borderColor: `${charcoal}0F` }}
        >
          <div>
            <h2
              className="text-base font-semibold tracking-tight"
              style={{ color: charcoal }}
            >
              Recent reservations
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: `${charcoal}80` }}>
              Latest activity across your book
            </p>
          </div>
          <Link
            href="/dashboard/reservations"
            className="inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: charcoal }}
          >
            See all
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="overflow-x-auto">
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
                <th scope="col" className="px-4 py-3 lg:px-6">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3 lg:px-6">
                  Phone
                </th>
                <th scope="col" className="px-4 py-3 lg:px-6">
                  Service
                </th>
                <th scope="col" className="px-4 py-3 lg:px-6">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 lg:px-6">
                  Time
                </th>
                <th scope="col" className="px-4 py-3 lg:px-6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b transition-colors last:border-b-0 hover:bg-black/[0.025]"
                  style={{ borderColor: `${charcoal}0A` }}
                >
                  <td className="px-4 py-3.5 lg:px-6">
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
                    className="px-4 py-3.5 whitespace-nowrap tabular-nums lg:px-6"
                    style={{ color: `${charcoal}A6` }}
                  >
                    {reservation.phone}
                  </td>
                  <td className="px-4 py-3.5 lg:px-6">
                    {reservation.serviceType}
                  </td>
                  <td
                    className="px-4 py-3.5 whitespace-nowrap lg:px-6"
                    style={{ color: `${charcoal}A6` }}
                  >
                    {formatDisplayDate(reservation.date)}
                  </td>
                  <td
                    className="px-4 py-3.5 whitespace-nowrap lg:px-6"
                    style={{ color: `${charcoal}A6` }}
                  >
                    {reservation.time}
                  </td>
                  <td className="px-4 py-3.5 lg:px-6">
                    <StatusBadge status={reservation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
