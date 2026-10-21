"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoginForm } from "./_components/login-form";
import LoginHero from "./_components/login-hero";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <LoginHero />

      <div className="relative flex min-h-svh flex-col overflow-hidden">
        <header className="dashboard-fade-in relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:justify-end">
          <Link
            href="/"
            className="ms-auto inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-opacity hover:opacity-70"
          >
            {t("login.returnToWebsite")}
            <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
          </Link>
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16 sm:px-10">
          <div className="dashboard-fade-up w-full max-w-[400px]">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase text-gray-500">
                {t("login.staffAccess")}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {t("login.signIn")}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {t("login.subtitle")}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white p-6 shadow-xs sm:p-8">
              <LoginForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
