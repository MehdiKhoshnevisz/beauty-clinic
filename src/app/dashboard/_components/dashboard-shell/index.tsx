"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import type { DashboardShellProps } from "./types";
import { isNavActive } from "./utils";
import { useDashboardShell } from "./use-dashboard-shell";

export function DashboardShell({ children }: DashboardShellProps) {
  const {
    t,
    pathname,
    navItems,
    mobileNavOpen,
    setMobileNavOpen,
    isLoggingOut,
    handleLogout,
  } = useDashboardShell();

  const nav = (
    <nav
      className="flex flex-1 flex-col gap-1.5 px-3"
      aria-label={t("nav.dashboard")}
    >
      {navItems.map(({ href, label, icon: Icon, end }) => {
        const active = isNavActive(pathname, href, end);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileNavOpen(false)}
            className={
              active
                ? "flex items-center gap-3 rounded-xl bg-charcoal px-3 py-2.5 text-sm font-medium text-white shadow-nav-active transition-all duration-200"
                : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal/65 transition-all duration-200 hover:bg-black/[0.04] hover:text-charcoal"
            }
            aria-current={active ? "page" : undefined}
          >
            <span
              className={
                active
                  ? "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/12 transition-colors"
                  : "flex size-8 shrink-0 items-center justify-center rounded-lg bg-charcoal/4 transition-colors"
              }
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
      <span className="flex size-10 items-center justify-center rounded-2xl border border-charcoal/6 bg-white shadow-logo">
        <Image src="/images/logo.png" alt="" width={22} height={22} />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight text-charcoal">
          {t("brand.name")}
        </span>
        <span className="block text-xs text-charcoal/50">
          {t("brand.adminConsole")}
        </span>
      </span>
    </Link>
  );

  const logoutButton = (
    <div className="mt-auto space-y-2 border-t border-charcoal/6 p-3">
      <div className="flex justify-center px-1 py-1">
        <LanguageToggle className="w-full justify-center" />
      </div>
      <Button
        type="button"
        variant="ghost"
        className="h-11 w-full justify-start gap-3 rounded-xl px-3 text-sm font-medium text-charcoal/65 transition-colors hover:bg-black/5"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-charcoal/4">
          <LogOut className="size-4" aria-hidden />
        </span>
        {t("dashboard.logout")}
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
    <div className="relative flex h-svh overflow-hidden text-charcoal">
      <div className="page-mist pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      />

      <aside className="glass-sidebar dashboard-fade-in relative z-10 hidden h-full w-[15.5rem] shrink-0 flex-col border-e border-charcoal/6 md:flex">
        {sidebarContent}
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            aria-label={t("nav.closeNavigation")}
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="glass-drawer relative z-10 flex h-full w-72 max-w-[85vw] flex-col shadow-2xl">
            <div className="flex items-center justify-between pe-2">
              {brand}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("nav.closeMenu")}
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
        <header className="glass-header sticky top-0 z-20 flex items-center gap-3 border-b border-charcoal/6 px-4 py-3 backdrop-blur-md md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("nav.openMenu")}
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-4" aria-hidden />
          </Button>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight">
            {t("brand.name")}
          </span>
          <LanguageToggle />
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
