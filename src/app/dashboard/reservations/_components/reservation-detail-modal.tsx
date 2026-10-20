"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Reservation } from "@/types/reservation";
import { StatusBadge } from "./status-badge";

const charcoal = "#1A1A1A";

function formatDisplayDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getDetailRows(reservation: Reservation): {
  label: string;
  value: ReactNode;
}[] {
  return [
    { label: "Reservation ID", value: reservation.id },
    { label: "Customer", value: reservation.customerName },
    { label: "Phone", value: reservation.phone },
    ...(reservation.email
      ? [{ label: "Email", value: reservation.email }]
      : []),
    { label: "Service", value: reservation.serviceType },
    { label: "Date", value: formatDisplayDate(reservation.date) },
    { label: "Time", value: reservation.time },
    {
      label: "Status",
      value: <StatusBadge status={reservation.status} />,
    },
  ];
}

function ReservationDetailBody({ reservation }: { reservation: Reservation }) {
  const detailRows = getDetailRows(reservation);

  return (
    <dl className="space-y-4">
      {detailRows.map(({ label, value }) => (
        <div
          key={label}
          className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4"
        >
          <dt
            className="text-xs font-medium tracking-wide uppercase"
            style={{ color: `${charcoal}80` }}
          >
            {label}
          </dt>
          <dd className="text-sm" style={{ color: charcoal }}>
            {value}
          </dd>
        </div>
      ))}
      {reservation.notes ? (
        <div className="grid gap-1 border-t pt-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt
            className="text-xs font-medium tracking-wide uppercase"
            style={{ color: `${charcoal}80` }}
          >
            Notes
          </dt>
          <dd
            className="text-sm leading-relaxed"
            style={{ color: `${charcoal}CC` }}
          >
            {reservation.notes}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

type ReservationDetailModalProps = {
  reservation: Reservation | null;
  onClose: () => void;
};

export function ReservationDetailModal({
  reservation,
  onClose,
}: ReservationDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const open = reservation !== null;

  useEffect(() => {
    if (!reservation || isMobile !== false) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [reservation, onClose, isMobile]);

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
          className="gap-0 overflow-hidden rounded-t-2xl p-0"
          style={{ borderColor: `${charcoal}12` }}
        >
          <div
            className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full"
            style={{ backgroundColor: `${charcoal}22` }}
            aria-hidden
          />
          <SheetHeader className="shrink-0 border-b px-5 pt-3 pb-4 text-left">
            <p
              className="text-xs font-medium tracking-wide uppercase"
              style={{ color: `${charcoal}80` }}
            >
              Reservation details
            </p>
            <SheetTitle
              className="text-lg font-semibold tracking-tight"
              style={{ color: charcoal }}
            >
              {reservation.customerName}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Full details for {reservation.customerName}&apos;s reservation.
            </SheetDescription>
          </SheetHeader>

          <div className="max-h-[min(28rem,calc(92svh-11rem))] overflow-y-auto px-5 py-5">
            <ReservationDetailBody reservation={reservation} />
          </div>

          <SheetFooter
            className="shrink-0 border-t px-5 py-4"
            style={{ borderColor: `${charcoal}12` }}
          >
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Close
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
        aria-label="Close reservation details"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-detail-title"
        className="modal-enter relative z-10 w-full max-w-lg rounded-2xl border bg-white shadow-xl"
        style={{ borderColor: `${charcoal}12` }}
      >
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
          <div>
            <p
              className="text-xs font-medium tracking-wide uppercase"
              style={{ color: `${charcoal}80` }}
            >
              Reservation details
            </p>
            <h2
              id="reservation-detail-title"
              className="mt-1 text-lg font-semibold tracking-tight"
              style={{ color: charcoal }}
            >
              {reservation.customerName}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <ReservationDetailBody reservation={reservation} />
        </div>

        <div
          className="flex justify-end border-t px-5 py-4 sm:px-6"
          style={{ borderColor: `${charcoal}12` }}
        >
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
