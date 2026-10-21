"use client";

import { useTranslation } from "react-i18next";
import { formatDisplayDate } from "@/i18n/format";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { getInitials, translateService } from "@/lib/utils";
import type { Reservation } from "@/types/reservation";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../status-badge";
import type { ReservationsViewProps } from "./types";

function ReservationMobileItem({
  reservation,
  locale,
  onSelect,
}: {
  reservation: Reservation;
  locale: Locale;
  onSelect?: (reservation: Reservation) => void;
}) {
  const { t } = useTranslation();

  return (
    <li className="border-b border-charcoal/4 p-4 last:border-b-0">
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
            <StatusBadge status={reservation.status} className="shrink-0" />
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
          {onSelect ? (
            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => onSelect(reservation)}
              >
                {t("common.details")}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function ReservationTableRow({
  reservation,
  locale,
  onSelect,
}: {
  reservation: Reservation;
  locale: Locale;
  onSelect?: (reservation: Reservation) => void;
}) {
  const { t } = useTranslation();

  return (
    <tr className="border-b border-charcoal/4 transition-colors last:border-b-0 hover:bg-black/[0.025]">
      <td className="px-4 py-3.5 lg:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-charcoal/5 text-xs font-semibold text-charcoal">
            {getInitials(reservation.customerName)}
          </span>
          <span className="font-medium">{reservation.customerName}</span>
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
      {onSelect ? (
        <td className="px-4 py-3.5 text-end lg:px-5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() => onSelect(reservation)}
          >
            {t("common.details")}
          </Button>
        </td>
      ) : null}
    </tr>
  );
}

export function ReservationsView({
  reservations,
  onSelect,
}: ReservationsViewProps) {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language as Locale) || defaultLocale;

  return (
    <>
      <ul className="md:hidden">
        {reservations.map((reservation) => (
          <ReservationMobileItem
            key={reservation.id}
            reservation={reservation}
            locale={locale}
            onSelect={onSelect}
          />
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
              {onSelect ? (
                <th scope="col" className="px-4 py-3 text-end lg:px-5">
                  <span className="sr-only">{t("common.actions")}</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <ReservationTableRow
                key={reservation.id}
                reservation={reservation}
                locale={locale}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
