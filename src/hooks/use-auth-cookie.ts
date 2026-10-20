"use client";

import { useEffect, useState } from "react";
import {
  getSessionAction,
  logoutAction,
} from "@/lib/auth-actions";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

/**
 * Client helper for the demo admin session.
 * The real session cookie is HttpOnly and set/cleared by server actions.
 */
export function useAuthCookie() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const { authenticated } = await getSessionAction();
        if (!cancelled) {
          setState({ isAuthenticated: authenticated, isLoading: false });
        }
      } catch {
        if (!cancelled) {
          setState({ isAuthenticated: false, isLoading: false });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function checkAuth() {
    try {
      const { authenticated } = await getSessionAction();
      setState({ isAuthenticated: authenticated, isLoading: false });
      return authenticated;
    } catch {
      setState({ isAuthenticated: false, isLoading: false });
      return false;
    }
  }

  function setAuthCookie() {
    // Cookie is set by loginAction (HttpOnly). Update local state after success.
    setState({ isAuthenticated: true, isLoading: false });
  }

  async function clearAuthCookie() {
    try {
      await logoutAction();
    } finally {
      setState({ isAuthenticated: false, isLoading: false });
    }
  }

  return {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    checkAuth,
    setAuthCookie,
    clearAuthCookie,
  };
}
