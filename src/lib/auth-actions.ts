"use server";

import { cookies } from "next/headers";
import { t } from "@/i18n";
import { parseLogin } from "@/lib/login-schema";
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
  const parsed = parseLogin({ identifier, password }, t);

  if (!parsed.success) {
    if (parsed.errors.identifier) {
      return {
        success: false,
        error: parsed.errors.identifier,
        field: "identifier",
      };
    }
    if (parsed.errors.password) {
      return {
        success: false,
        error: parsed.errors.password,
        field: "password",
      };
    }
    return { success: false, error: t("login.somethingWrong") };
  }

  const { username, password: adminPassword } = getAdminCredentials();

  if (!username || !adminPassword) {
    return { success: false, error: t("login.notConfigured") };
  }

  const identifierMatches =
    parsed.data.identifier.toLowerCase() === username.toLowerCase();

  if (!identifierMatches || parsed.data.password !== adminPassword) {
    return { success: false, error: t("login.invalidCredentials") };
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
