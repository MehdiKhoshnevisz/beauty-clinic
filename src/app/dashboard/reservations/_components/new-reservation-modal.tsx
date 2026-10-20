"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Reservation } from "@/types/reservation";

const charcoal = "#1A1A1A";
const ink = "#111111";

export const SERVICE_TYPES = [
  "Hydrafacial",
  "Laser Hair Removal",
  "Chemical Peel",
  "Botox Consultation",
  "Classic Facial",
  "Microdermabrasion",
  "LED Light Therapy",
  "Dermaplaning",
  "Lip Filler Consultation",
  "Anti-Aging Facial",
  "Body Contouring",
  "Deep Cleansing Facial",
] as const;

type FormValues = {
  customerName: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  customerName: "",
  phone: "",
  serviceType: "",
  date: "",
  time: "",
};

function formatTimeDisplay(time24: string) {
  const [hoursStr, minutes] = time24.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours) || !minutes) return time24;
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.customerName.trim()) {
    errors.customerName = "Customer name is required.";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.serviceType) {
    errors.serviceType = "Service type is required.";
  }

  if (!values.date) {
    errors.date = "Reservation date is required.";
  }

  if (!values.time) {
    errors.time = "Reservation time is required.";
  }

  return errors;
}

type NewReservationModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (reservation: Reservation) => void;
};

export function NewReservationModal({
  open,
  onClose,
  onCreate,
}: NewReservationModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  // Reset form when the modal opens (adjust state during render — not in an effect).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setValues(emptyValues);
      setErrors({});
      setSubmitted(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 50);

    if (isMobile === false) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") onClose();
      }

      window.addEventListener("keydown", onKeyDown);
      return () => {
        window.clearTimeout(focusTimer);
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose, isMobile]);

  function updateField<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (submitted) {
        setErrors(validate(next));
      }
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const reservation: Reservation = {
      id: `RSV-${Date.now().toString().slice(-6)}`,
      customerName: values.customerName.trim(),
      phone: values.phone.trim(),
      serviceType: values.serviceType,
      date: values.date,
      time: formatTimeDisplay(values.time),
      status: "pending",
    };

    onCreate(reservation);
    setValues(emptyValues);
    setErrors({});
    setSubmitted(false);
    onClose();
  }

  if (!open || isMobile === null) return null;

  const fieldClass =
    "h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

  const formFields = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="new-customer-name" className="mb-1.5">
          Customer Name
        </Label>
        <Input
          ref={firstFieldRef}
          id="new-customer-name"
          type="text"
          autoComplete="name"
          value={values.customerName}
          onChange={(event) => updateField("customerName", event.target.value)}
          aria-invalid={Boolean(errors.customerName) || undefined}
          aria-describedby={
            errors.customerName ? "new-customer-name-error" : undefined
          }
          className="h-10"
          placeholder="Full name"
        />
        {errors.customerName ? (
          <p
            id="new-customer-name-error"
            className="mt-1.5 text-xs"
            style={{ color: "#DC2626" }}
            role="alert"
          >
            {errors.customerName}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="new-phone" className="mb-1.5">
          Phone Number
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
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone ? (
          <p
            id="new-phone-error"
            className="mt-1.5 text-xs"
            style={{ color: "#DC2626" }}
            role="alert"
          >
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="new-service-type" className="mb-1.5">
          Service Type
        </Label>
        <select
          id="new-service-type"
          value={values.serviceType}
          onChange={(event) => updateField("serviceType", event.target.value)}
          aria-invalid={Boolean(errors.serviceType) || undefined}
          aria-describedby={
            errors.serviceType ? "new-service-type-error" : undefined
          }
          className={fieldClass}
        >
          <option value="">Select a service…</option>
          {SERVICE_TYPES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.serviceType ? (
          <p
            id="new-service-type-error"
            className="mt-1.5 text-xs"
            style={{ color: "#DC2626" }}
            role="alert"
          >
            {errors.serviceType}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="new-date" className="mb-1.5">
            Reservation Date
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
              className="mt-1.5 text-xs"
              style={{ color: "#DC2626" }}
              role="alert"
            >
              {errors.date}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="new-time" className="mb-1.5">
            Reservation Time
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
              className="mt-1.5 text-xs"
              style={{ color: "#DC2626" }}
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
      <Button type="button" variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button
        type="submit"
        className="text-white hover:opacity-90"
        style={{ backgroundColor: ink }}
      >
        Create reservation
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
              Create reservation
            </p>
            <SheetTitle
              className="text-lg font-semibold tracking-tight"
              style={{ color: charcoal }}
            >
              New Reservation
            </SheetTitle>
            <SheetDescription className="sr-only">
              Fill in the form to create a new reservation.
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
            <SheetFooter
              className="shrink-0 border-t px-5 py-4"
              style={{ borderColor: `${charcoal}12` }}
            >
              <div className="flex w-full justify-end gap-2">{actions}</div>
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
        aria-label="Close new reservation form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-enter relative z-10 flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col rounded-2xl border bg-white shadow-xl"
        style={{ borderColor: `${charcoal}12` }}
      >
        <div
          className="flex shrink-0 items-start justify-between gap-4 border-b px-5 py-4 sm:px-6"
          style={{ borderColor: `${charcoal}12` }}
        >
          <div>
            <p
              className="text-xs font-medium tracking-wide uppercase"
              style={{ color: `${charcoal}80` }}
            >
              Create reservation
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-semibold tracking-tight"
              style={{ color: charcoal }}
            >
              New Reservation
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
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

          <div
            className="flex shrink-0 justify-end gap-2 border-t px-5 py-4 sm:px-6"
            style={{ borderColor: `${charcoal}12` }}
          >
            {actions}
          </div>
        </form>
      </div>
    </div>
  );
}
