import { CalendarDays, LayoutDashboard } from "lucide-react";
import type { NavItem } from "./types";

export function isNavActive(pathname: string, href: string, end: boolean) {
  if (end) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getNavItems(t: (key: string) => string): readonly NavItem[] {
  return [
    {
      href: "/dashboard",
      label: t("nav.dashboard"),
      icon: LayoutDashboard,
      end: true,
    },
    {
      href: "/dashboard/reservations",
      label: t("nav.reservations"),
      icon: CalendarDays,
      end: false,
    },
  ] as const;
}
