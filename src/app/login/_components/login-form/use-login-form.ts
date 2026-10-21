"use client";

import { useReducer } from "react";
import { useTranslation } from "react-i18next";
import { parseLogin, type ValidatedLogin } from "@/lib/login-schema";
import { formReducer, initialState } from "./utils";

export function useLoginForm() {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setIdentifier = (value: string) =>
    dispatch({ type: "SET_IDENTIFIER", value });

  const setPassword = (value: string) =>
    dispatch({ type: "SET_PASSWORD", value });

  const togglePassword = () => dispatch({ type: "TOGGLE_SHOW_PASSWORD" });

  const validate = (): ValidatedLogin | null => {
    const parsed = parseLogin(
      { identifier: state.identifier, password: state.password },
      t,
    );

    if (!parsed.success) {
      dispatch({ type: "SET_FIELD_ERRORS", errors: parsed.errors });
      return null;
    }

    dispatch({ type: "SET_FIELD_ERRORS", errors: {} });
    return parsed.data;
  };

  return {
    state,
    dispatch,
    setIdentifier,
    setPassword,
    togglePassword,
    validate,
  };
}
