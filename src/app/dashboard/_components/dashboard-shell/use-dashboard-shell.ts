"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/toast";
import { useAuthCookie } from "@/hooks/use-auth-cookie";
import { getNavItems } from "./utils";

export function useDashboardShell() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuthCookie } = useAuthCookie();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = getNavItems(t);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setMobileNavOpen(false);
    await clearAuthCookie();
    toast.add({
      type: "success",
      title: t("dashboard.logoutSuccessToast"),
    });
    router.replace("/login");
  }

  return {
    t,
    pathname,
    navItems,
    mobileNavOpen,
    setMobileNavOpen,
    isLoggingOut,
    handleLogout,
  };
}
