"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Reservation } from "@/types/reservation";
import { ReservationDetailModal } from "../../reservations/_components/reservation-detail-modal";
import { ReservationsView } from "../../reservations/_components/reservations-view";
import type { SummaryCardProps } from "./types";
import { SUMMARY_ACCENTS } from "./utils";
import { useDashboardOverview } from "./use-dashboard-overview";

function SummaryCard({
  label,
  value,
  icon: Icon,
  accentClass,
  hint,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "surface-card group relative overflow-hidden rounded-2xl border border-charcoal/6 p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5",
        accentClass,
      )}
    >
      <div
        className="summary-glow pointer-events-none absolute -top-10 -end-8 size-28 rounded-full opacity-70 blur-md transition-transform duration-500 group-hover:scale-110"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-charcoal/50 uppercase">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-charcoal tabular-nums">
            {value}
          </p>
          <p className="mt-2 text-xs text-charcoal/50">{hint}</p>
        </div>
        <div className="summary-icon flex size-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-5" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function DashboardOverview() {
  const { t, userName, summary, recentReservations, todayLabel } =
    useDashboardOverview();
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  return (
    <>
      <main className="relative px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="dashboard-fade-up flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-charcoal/50 uppercase">
              {todayLabel}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
              {t("dashboard.welcomeBack", { name: userName })}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/60">
              {t("dashboard.overviewBody")}
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/reservations" />}
            nativeButton={false}
            className="h-11 gap-2 rounded-xl bg-charcoal px-5 text-sm font-medium text-white shadow-cta transition-all hover:opacity-90 hover:shadow-lg"
          >
            {t("dashboard.viewReservations")}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
          </Button>
        </div>

        <section
          aria-label={t("dashboard.summaryLabel")}
          className="dashboard-stagger mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <SummaryCard
            label={t("dashboard.total")}
            value={summary.total}
            icon={ClipboardList}
            accentClass={SUMMARY_ACCENTS.total}
            hint={t("dashboard.totalHint")}
          />
          <SummaryCard
            label={t("dashboard.upcoming")}
            value={summary.upcoming}
            icon={CalendarClock}
            accentClass={SUMMARY_ACCENTS.upcoming}
            hint={t("dashboard.upcomingHint")}
          />
          <SummaryCard
            label={t("dashboard.completed")}
            value={summary.completed}
            icon={CalendarCheck}
            accentClass={SUMMARY_ACCENTS.completed}
            hint={t("dashboard.completedHint")}
          />
          <SummaryCard
            label={t("dashboard.cancelled")}
            value={summary.cancelled}
            icon={CalendarX}
            accentClass={SUMMARY_ACCENTS.cancelled}
            hint={t("dashboard.cancelledHint")}
          />
        </section>

        <section
          className="surface-panel dashboard-fade-up mt-8 overflow-hidden rounded-2xl border border-charcoal/6 shadow-panel [animation-delay:0.18s]"
          aria-label={t("dashboard.recentLabel")}
        >
          <div className="flex items-center justify-between gap-3 border-b border-charcoal/6 px-4 py-4 lg:px-6">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-charcoal">
                {t("dashboard.recentReservations")}
              </h2>
              <p className="mt-0.5 text-xs text-charcoal/50">
                {t("dashboard.recentSubtitle")}
              </p>
            </div>
            <Link
              href="/dashboard/reservations"
              className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-opacity hover:opacity-70"
            >
              {t("dashboard.seeAll")}
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>

          <ReservationsView
            reservations={recentReservations}
            onSelect={setSelectedReservation}
          />
        </section>
      </main>

      <ReservationDetailModal
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />
    </>
  );
}
