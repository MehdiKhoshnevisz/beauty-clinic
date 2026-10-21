"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDisplayDate } from "@/i18n/format";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { translateService } from "@/lib/utils";
import type { Reservation } from "@/types/reservation";
import { StatusBadge } from "../status-badge";
import type { ReservationDetailModalProps } from "./types";
import { useReservationDetailModal } from "./use-reservation-detail-modal";

function ReservationDetailBody({ reservation }: { reservation: Reservation }) {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language as Locale) || defaultLocale;
  const notes = reservation.notes;

  const detailRows: { label: string; value: ReactNode }[] = [
    { label: t("reservations.reservationId"), value: reservation.id },
    { label: t("common.customer"), value: reservation.customerName },
    {
      label: t("common.phone"),
      value: (
        <span dir="ltr" className="inline-block">
          {reservation.phone}
        </span>
      ),
    },
    ...(reservation.email
      ? [
          {
            label: t("common.email"),
            value: (
              <span dir="ltr" className="inline-block">
                {reservation.email}
              </span>
            ),
          },
        ]
      : []),
    {
      label: t("common.service"),
      value: translateService(reservation.serviceType, t),
    },
    {
      label: t("common.date"),
      value: formatDisplayDate(reservation.date, locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    },
    {
      label: t("common.time"),
      value: (
        <span dir="ltr" className="inline-block">
          {reservation.time}
        </span>
      ),
    },
    {
      label: t("common.status"),
      value: <StatusBadge status={reservation.status} />,
    },
  ];

  return (
    <dl className="space-y-4">
      {detailRows.map(({ label, value }) => (
        <div
          key={label}
          className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4"
        >
          <dt className="text-xs font-medium tracking-wide text-charcoal/50 uppercase">
            {label}
          </dt>
          <dd className="text-sm text-charcoal">{value}</dd>
        </div>
      ))}
      {notes ? (
        <div className="grid gap-1 border-t pt-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="text-xs font-medium tracking-wide text-charcoal/50 uppercase">
            {t("common.notes")}
          </dt>
          <dd className="text-sm leading-relaxed text-charcoal/80">{notes}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export function ReservationDetailModal({
  reservation,
  onClose,
}: ReservationDetailModalProps) {
  const { t, closeButtonRef, isMobile, open } = useReservationDetailModal(
    reservation,
    onClose,
  );

  if (!reservation || isMobile === null) return null;

  if (isMobile) {
    return (
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) onClose();
        }}
      >
        <SheetContent
          side="bottom"
          className="gap-0 overflow-hidden rounded-t-2xl border-charcoal/7 p-0"
        >
          <div
            className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-charcoal/13"
            aria-hidden
          />
          <SheetHeader className="shrink-0 border-b px-5 pt-3 pb-4 text-start">
            <p className="text-xs font-medium tracking-wide text-charcoal/50 uppercase">
              {t("reservations.detailEyebrow")}
            </p>
            <SheetTitle className="text-lg font-semibold tracking-tight text-charcoal">
              {reservation.customerName}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {t("reservations.detailDescription", {
                name: reservation.customerName,
              })}
            </SheetDescription>
          </SheetHeader>

          <div className="max-h-[min(28rem,calc(92svh-11rem))] overflow-y-auto px-5 py-5">
            <ReservationDetailBody reservation={reservation} />
          </div>

          <SheetFooter className="shrink-0 border-t border-charcoal/7 px-5 py-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              {t("common.close")}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="presentation"
    >
      <button
        type="button"
        className="overlay-enter absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-label={t("reservations.closeDetails")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-detail-title"
        className="modal-enter relative z-10 w-full max-w-lg rounded-2xl border border-charcoal/7 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-charcoal/50 uppercase">
              {t("reservations.detailEyebrow")}
            </p>
            <h2
              id="reservation-detail-title"
              className="mt-1 text-lg font-semibold tracking-tight text-charcoal"
            >
              {reservation.customerName}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={t("common.close")}
            onClick={onClose}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <ReservationDetailBody reservation={reservation} />
        </div>

        <div className="flex justify-end border-t border-charcoal/7 px-5 py-4 sm:px-6">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
