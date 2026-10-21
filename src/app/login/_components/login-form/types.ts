import type { LoginFieldErrors } from "@/lib/login-schema";

export type FieldErrors = LoginFieldErrors;

export type FormState = {
  identifier: string;
  password: string;
  showPassword: boolean;
  fieldErrors: FieldErrors;
  formError: string | null;
  isSubmitting: boolean;
};

export type FormAction =
  | { type: "SET_IDENTIFIER"; value: string }
  | { type: "SET_PASSWORD"; value: string }
  | { type: "TOGGLE_SHOW_PASSWORD" }
  | { type: "SET_FIELD_ERRORS"; errors: FieldErrors }
  | { type: "SET_FORM_ERROR"; error: string | null }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | {
      type: "SUBMIT_FAILURE";
      fieldErrors?: FieldErrors;
      formError?: string | null;
    };
