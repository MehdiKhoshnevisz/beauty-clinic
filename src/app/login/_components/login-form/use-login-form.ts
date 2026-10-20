"use client";

import { useReducer } from "react";
import { formReducer, initialState, validateClient } from "./utils";

export function useLoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setIdentifier = (value: string) =>
    dispatch({ type: "SET_IDENTIFIER", value });

  const setPassword = (value: string) =>
    dispatch({ type: "SET_PASSWORD", value });

  const togglePassword = () => dispatch({ type: "TOGGLE_SHOW_PASSWORD" });

  const validate = () => {
    const errors = validateClient(state.identifier, state.password);

    dispatch({ type: "SET_FIELD_ERRORS", errors });

    return Object.keys(errors).length === 0;
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
