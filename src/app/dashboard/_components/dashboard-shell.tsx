"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthCookie } from "@/hooks/use-auth-cookie";

const charcoal = "#1A1A1A";
const ink = "#111111";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  {
    href: "/dashboard/reservations",
    label: "Reservations",
    icon: CalendarDays,
    end: false,
  },
] as const;

type DashboardShellProps = {
  children: ReactNode;
};

function isNavActive(pathname: string, href: string, end: boolean) {
  if (end) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuthCookie } = useAuthCookie();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setMobileNavOpen(false);
    await clearAuthCookie();
    router.replace("/login");
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1.5 px-3" aria-label="Dashboard">
      {NAV_ITEMS.map(({ href, label, icon: Icon, end }) => {
        const active = isNavActive(pathname, href, end);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileNavOpen(false)}
            className={
              active
                ? "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-12px_rgba(17,17,17,0.45)] transition-all duration-200"
                : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-black/[0.04] hover:text-[#1A1A1A]"
            }
            style={{
              backgroundColor: active ? ink : "transparent",
              color: active ? undefined : `${charcoal}A6`,
            }}
            aria-current={active ? "page" : undefined}
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors"
              style={{
                backgroundColor: active
                  ? "rgba(255,255,255,0.12)"
                  : `${charcoal}0A`,
              }}
            >
              <Icon className="size-4" aria-hidden />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const brand = (
    <Link
      href="/"
      className="inline-flex items-center gap-3 px-5 py-6 transition-opacity hover:opacity-80"
      onClick={() => setMobileNavOpen(false)}
    >
      <span
        className="flex size-10 items-center justify-center rounded-2xl border bg-white"
        style={{
          borderColor: `${charcoal}10`,
          boxShadow: "0 10px 24px -16px rgba(17, 17, 17, 0.35)",
        }}
      >
        <Image src="/images/logo.png" alt="" width={22} height={22} />
      </span>
      <span className="leading-tight">
        <span
          className="block text-sm font-semibold tracking-tight"
          style={{ color: charcoal }}
        >
          Beauty Clinic
        </span>
        <span className="block text-xs" style={{ color: `${charcoal}80` }}>
          Admin console
        </span>
      </span>
    </Link>
  );

  const logoutButton = (
    <div className="border-t p-3" style={{ borderColor: `${charcoal}10` }}>
      <Button
        type="button"
        variant="ghost"
        className="h-11 w-full justify-start gap-3 rounded-xl px-3 text-sm font-medium transition-colors hover:bg-black/5"
        style={{ color: `${charcoal}A6` }}
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        <span
          className="flex size-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${charcoal}0A` }}
        >
          <LogOut className="size-4" aria-hidden />
        </span>
        Logout
      </Button>
    </div>
  );

  const sidebarContent = (
    <>
      {brand}
      {nav}
      {logoutButton}
    </>
  );

  return (
    <div
      className="relative flex h-svh overflow-hidden"
      style={{ color: charcoal }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 0% -10%, rgba(26,26,26,0.06), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(26,26,26,0.04), transparent 50%), linear-gradient(180deg, #F4F4F5 0%, #EEEEF0 45%, #F7F7F8 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(rgba(26,26,26,0.045) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.55), transparent 70%)",
        }}
      />

      <aside
        className="dashboard-fade-in relative z-10 hidden h-full w-[15.5rem] shrink-0 flex-col border-r md:flex"
        style={{
          borderColor: `${charcoal}0F`,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 100%)",
          backdropFilter: "blur(16px)",
        }}
      >
        {sidebarContent}
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside
            className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
            }}
          >
            <div className="flex items-center justify-between pr-2">
              {brand}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              >
                <X className="size-4" aria-hidden />
              </Button>
            </div>
            {nav}
            {logoutButton}
          </aside>
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <header
          className="sticky top-0 z-20 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-md md:hidden"
          style={{
            borderColor: `${charcoal}10`,
            backgroundColor: "rgba(255,255,255,0.72)",
          }}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-4" aria-hidden />
          </Button>
          <span className="text-sm font-semibold tracking-tight">
            Beauty Clinic
          </span>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
