import { z } from "zod";
import { SERVICE_TYPE_KEYS } from "@/data/service-types";
import type { TranslateFn } from "@/i18n";

const PHONE_DIGIT_RE = /[^\d۰-۹٠-٩]/g;

export type NewReservationFormValues = {
  customerName: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
};

export type NewReservationFormErrors = Partial<
  Record<keyof NewReservationFormValues, string>
>;

export const emptyNewReservationValues: NewReservationFormValues = {
  customerName: "",
  phone: "",
  serviceType: "",
  date: "",
  time: "",
};

export function createNewReservationSchema(t: TranslateFn) {
  return z.object({
    customerName: z
      .string()
      .trim()
      .min(1, { error: t("reservations.errors.customerNameRequired") }),
    phone: z
      .string()
      .trim()
      .min(1, { error: t("reservations.errors.phoneRequired") })
      .refine((value) => value.replace(PHONE_DIGIT_RE, "").length >= 7, {
        error: t("reservations.errors.phoneInvalid"),
      }),
    serviceType: z.enum(SERVICE_TYPE_KEYS, {
      error: t("reservations.errors.serviceRequired"),
    }),
    date: z.string().min(1, {
      error: t("reservations.errors.dateRequired"),
    }),
    time: z.string().min(1, {
      error: t("reservations.errors.timeRequired"),
    }),
  });
}

export type ValidatedNewReservation = z.infer<
  ReturnType<typeof createNewReservationSchema>
>;

function fieldErrorsFromZod(error: z.ZodError): NewReservationFormErrors {
  const errors: NewReservationFormErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      field === "customerName" ||
      field === "phone" ||
      field === "serviceType" ||
      field === "date" ||
      field === "time"
    ) {
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
  }

  return errors;
}

export function validateNewReservation(
  values: NewReservationFormValues,
  t: TranslateFn,
): NewReservationFormErrors {
  const result = createNewReservationSchema(t).safeParse(values);
  if (result.success) return {};
  return fieldErrorsFromZod(result.error);
}

export function parseNewReservation(
  values: NewReservationFormValues,
  t: TranslateFn,
):
  | { success: true; data: ValidatedNewReservation }
  | { success: false; errors: NewReservationFormErrors } {
  const result = createNewReservationSchema(t).safeParse(values);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: fieldErrorsFromZod(result.error) };
}
