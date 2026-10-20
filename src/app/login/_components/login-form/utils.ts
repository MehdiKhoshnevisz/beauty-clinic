import { FieldErrors, FormAction, FormState } from "./types";

export const initialState: FormState = {
  identifier: "",
  password: "",
  showPassword: false,
  fieldErrors: {},
  formError: null,
  isSubmitting: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_IDENTIFIER":
      return {
        ...state,
        identifier: action.value,
        formError: null,
        fieldErrors: state.fieldErrors.identifier
          ? { ...state.fieldErrors, identifier: undefined }
          : state.fieldErrors,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.value,
        formError: null,
        fieldErrors: state.fieldErrors.password
          ? { ...state.fieldErrors, password: undefined }
          : state.fieldErrors,
      };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SET_FIELD_ERRORS":
      return { ...state, fieldErrors: action.errors, formError: null };
    case "SET_FORM_ERROR":
      return { ...state, formError: action.error };
    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
        formError: null,
        fieldErrors: {},
      };
    case "SUBMIT_END":
      return { ...state, isSubmitting: false };
    case "SUBMIT_FAILURE":
      return {
        ...state,
        fieldErrors: action.fieldErrors ?? {},
        formError: action.formError ?? null,
      };
    default:
      return state;
  }
}

export function validateClient(
  identifier: string,
  password: string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (!identifier.trim()) {
    errors.identifier = "This field is required.";
  }
  if (!password) {
    errors.password = "This field is required.";
  }
  return errors;
}
