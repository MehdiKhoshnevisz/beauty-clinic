"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { defaultLocale, type Locale } from "@/i18n/settings";
import {
  emptyNewReservationValues,
  parseNewReservation,
  validateNewReservation,
  type NewReservationFormErrors,
  type NewReservationFormValues,
} from "@/lib/new-reservation-schema";
import type { Reservation } from "@/types/reservation";
import { createReservationFromValues } from "./utils";

type UseNewReservationFormOptions = {
  open: boolean;
  onClose: () => void;
  onCreate: (reservation: Reservation) => void;
};

export function useNewReservationForm({
  open,
  onClose,
  onCreate,
}: UseNewReservationFormOptions) {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language as Locale) || defaultLocale;
  const isMobile = useIsMobile();
  const [values, setValues] = useState<NewReservationFormValues>(
    emptyNewReservationValues,
  );
  const [errors, setErrors] = useState<NewReservationFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  // Reset form when the modal opens (adjust state during render — not in an effect).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setValues(emptyNewReservationValues);
      setErrors({});
      setSubmitted(false);
    }
  }

  useEffect(() => {
    if (!open || isMobile !== false) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, isMobile]);

  function updateField<K extends keyof NewReservationFormValues>(
    key: K,
    value: NewReservationFormValues[K],
  ) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (submitted) {
        setErrors(validateNewReservation(next, t));
      }
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const parsed = parseNewReservation(values, t);
    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }

    onCreate(createReservationFromValues(parsed.data, locale));
    setValues(emptyNewReservationValues);
    setErrors({});
    setSubmitted(false);
    onClose();
  }

  return {
    t,
    isMobile,
    values,
    errors,
    updateField,
    handleSubmit,
  };
}
