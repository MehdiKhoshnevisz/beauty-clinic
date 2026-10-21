import { z } from "zod";
import type { TranslateFn } from "@/i18n";

export type LoginFormValues = {
  identifier: string;
  password: string;
};

export type LoginFieldErrors = {
  identifier?: string;
  password?: string;
};

export function createLoginSchema(t: TranslateFn) {
  return z.object({
    identifier: z.string().trim().min(1, {
      error: t("login.identifierRequired"),
    }),
    password: z.string().min(1, {
      error: t("login.passwordRequired"),
    }),
  });
}

export type ValidatedLogin = z.infer<ReturnType<typeof createLoginSchema>>;

function fieldErrorsFromZod(error: z.ZodError): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field === "identifier" || field === "password") {
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
  }

  return errors;
}

export function validateLogin(
  values: LoginFormValues,
  t: TranslateFn,
): LoginFieldErrors {
  const result = createLoginSchema(t).safeParse(values);
  if (result.success) return {};
  return fieldErrorsFromZod(result.error);
}

export function parseLogin(
  values: LoginFormValues,
  t: TranslateFn,
):
  | { success: true; data: ValidatedLogin }
  | { success: false; errors: LoginFieldErrors } {
  const result = createLoginSchema(t).safeParse(values);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: fieldErrorsFromZod(result.error) };
}
