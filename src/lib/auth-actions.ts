"use server";

import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
  getAdminCredentials,
  getAuthCookieOptions,
  isValidAuthCookie,
} from "./auth";

export type LoginResult =
  | { success: true }
  | { success: false; error: string; field?: "identifier" | "password" };

export async function loginAction(
  identifier: string,
  password: string,
): Promise<LoginResult> {
  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier) {
    return {
      success: false,
      error: "Email or username is required.",
      field: "identifier",
    };
  }

  if (!password) {
    return {
      success: false,
      error: "Password is required.",
      field: "password",
    };
  }

  const { username, password: adminPassword } = getAdminCredentials();

  if (!username || !adminPassword) {
    return { success: false, error: "Authentication is not configured." };
  }

  const identifierMatches =
    trimmedIdentifier.toLowerCase() === username.toLowerCase();

  if (!identifierMatches || password !== adminPassword) {
    return { success: false, error: "Invalid username or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, getAuthCookieOptions());

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "", {
    ...getAuthCookieOptions(0),
    maxAge: 0,
  });
}

export async function getSessionAction() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return { authenticated: isValidAuthCookie(session?.value) };
}
