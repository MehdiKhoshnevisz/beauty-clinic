"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-is-mobile";
import type { Reservation } from "@/types/reservation";

export function useReservationDetailModal(
  reservation: Reservation | null,
  onClose: () => void,
) {
  const { t } = useTranslation();
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

  return {
    t,
    closeButtonRef,
    isMobile,
    open,
  };
}
