export const AUTH_COOKIE_NAME = "bc_admin_session";
export const AUTH_COOKIE_VALUE = "authenticated";
/** Session lifetime: 7 days */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "",
    password: process.env.ADMIN_PASSWORD ?? "",
  };
}

export function formatAdminDisplayName(username: string) {
  const trimmed = username.trim();
  if (!trimmed) return "Admin";
  return trimmed.charAt(0).toLocaleUpperCase() + trimmed.slice(1);
}

export function getAuthCookieOptions(maxAge = AUTH_COOKIE_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function isValidAuthCookie(value: string | undefined | null) {
  return value === AUTH_COOKIE_VALUE;
}
