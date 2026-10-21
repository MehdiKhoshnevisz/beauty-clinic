"use client";

import { useId } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SERVICE_TYPE_KEYS } from "@/data/service-types";
import type { NewReservationModalProps } from "./types";
import { useNewReservationForm } from "./use-new-reservation-form";

export function NewReservationModal({
  open,
  onClose,
  onCreate,
}: NewReservationModalProps) {
  const titleId = useId();
  const { t, isMobile, values, errors, updateField, handleSubmit } =
    useNewReservationForm({ open, onClose, onCreate });

  if (!open || isMobile === null) return null;

  const serviceTypeItems = SERVICE_TYPE_KEYS.map((service) => ({
    value: service,
    label: t(`services.${service}`),
  }));

  const formFields = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="new-customer-name" className="mb-1.5">
          {t("reservations.customerName")}
        </Label>
        <Input
          id="new-customer-name"
          type="text"
          autoFocus
          autoComplete="name"
          value={values.customerName}
          onChange={(event) => updateField("customerName", event.target.value)}
          aria-invalid={Boolean(errors.customerName) || undefined}
          aria-describedby={
            errors.customerName ? "new-customer-name-error" : undefined
          }
          className="h-10"
          placeholder={t("reservations.customerNamePlaceholder")}
        />
        {errors.customerName ? (
          <p
            id="new-customer-name-error"
            className="mt-1.5 text-xs text-destructive"
            role="alert"
          >
            {errors.customerName}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="new-phone" className="mb-1.5">
          {t("reservations.phoneNumber")}
        </Label>
        <Input
          id="new-phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone) || undefined}
          aria-describedby={errors.phone ? "new-phone-error" : undefined}
          className="h-10"
          placeholder={t("reservations.phonePlaceholder")}
          dir="ltr"
        />
        {errors.phone ? (
          <p
            id="new-phone-error"
            className="mt-1.5 text-xs text-destructive"
            role="alert"
          >
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="new-service-type" className="mb-1.5">
          {t("reservations.serviceType")}
        </Label>
        <Select
          items={serviceTypeItems}
          value={values.serviceType || null}
          onValueChange={(value) => {
            if (value == null) return;
            updateField("serviceType", value);
          }}
        >
          <SelectTrigger
            id="new-service-type"
            aria-invalid={Boolean(errors.serviceType) || undefined}
            aria-describedby={
              errors.serviceType ? "new-service-type-error" : undefined
            }
            className="h-10 w-full min-w-0 px-2.5 py-1 text-base data-[size=default]:h-10 md:text-sm"
          >
            <SelectValue placeholder={t("reservations.selectService")} />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {serviceTypeItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType ? (
          <p
            id="new-service-type-error"
            className="mt-1.5 text-xs text-destructive"
            role="alert"
          >
            {errors.serviceType}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="new-date" className="mb-1.5">
            {t("reservations.reservationDate")}
          </Label>
          <Input
            id="new-date"
            type="date"
            value={values.date}
            onChange={(event) => updateField("date", event.target.value)}
            aria-invalid={Boolean(errors.date) || undefined}
            aria-describedby={errors.date ? "new-date-error" : undefined}
            className="h-10"
          />
          {errors.date ? (
            <p
              id="new-date-error"
              className="mt-1.5 text-xs text-destructive"
              role="alert"
            >
              {errors.date}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="new-time" className="mb-1.5">
            {t("reservations.reservationTime")}
          </Label>
          <Input
            id="new-time"
            type="time"
            value={values.time}
            onChange={(event) => updateField("time", event.target.value)}
            aria-invalid={Boolean(errors.time) || undefined}
            aria-describedby={errors.time ? "new-time-error" : undefined}
            className="h-10"
          />
          {errors.time ? (
            <p
              id="new-time-error"
              className="mt-1.5 text-xs text-destructive"
              role="alert"
            >
              {errors.time}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  const actions = (
    <>
      <Button
        type="button"
        size="xl"
        variant="outline"
        className={isMobile ? "w-full" : undefined}
        onClick={onClose}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="submit"
        size="xl"
        className={
          isMobile
            ? "w-full bg-charcoal text-white hover:opacity-90"
            : "bg-charcoal text-white hover:opacity-90"
        }
      >
        {t("reservations.createAction")}
      </Button>
    </>
  );

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
              {t("reservations.createEyebrow")}
            </p>
            <SheetTitle className="text-lg font-semibold tracking-tight text-charcoal">
              {t("reservations.createTitle")}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {t("reservations.createDescription")}
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
            noValidate
          >
            <div className="max-h-[min(28rem,calc(92svh-12rem))] overflow-y-auto px-5 py-5">
              {formFields}
            </div>
            <SheetFooter className="shrink-0 gap-2 border-t border-charcoal/7 px-5 py-4">
              {actions}
            </SheetFooter>
          </form>
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
        aria-label={t("reservations.closeForm")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-enter relative z-10 flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col rounded-2xl border border-charcoal/7 bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-charcoal/7 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-charcoal/50 uppercase">
              {t("reservations.createEyebrow")}
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-semibold tracking-tight text-charcoal"
            >
              {t("reservations.createTitle")}
            </h2>
          </div>
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={onClose}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
          noValidate
        >
          <div className="overflow-y-auto px-5 py-5 sm:px-6">{formFields}</div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-charcoal/7 px-5 py-4 sm:px-6">
            {actions}
          </div>
        </form>
      </div>
    </div>
  );
}
