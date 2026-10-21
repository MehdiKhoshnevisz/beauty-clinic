"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import useBookAppointment from "../_hooks/use-book-appointment";

export default function HeroSection() {
  const { t } = useTranslation();
  const { bookAppointment } = useBookAppointment();

  const navLinks = [
    { label: t("nav.home"), href: "/", active: true },
    { label: t("nav.whyChooseUs"), href: "#why-choose-us" },
  ] as const;

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <Image
        src="/images/michael-dagonakis-unsplash.jpg"
        alt={t("landing.heroImageAlt")}
        fill
        priority
        className="object-cover object-[center_34%] sm:object-[center_40%] lg:object-[center_48%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 lg:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.22) 38%, rgba(10,10,10,0.78) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(255deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.45) 42%, rgba(10,10,10,0.18) 100%)",
        }}
      />

      <header className="hero-short-header dashboard-fade-in relative z-10 mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-x-6 sm:px-6 sm:py-6 lg:px-12 lg:py-8">
        <Link
          href="/"
          className="inline-flex w-fit min-w-0 items-center justify-self-start gap-2.5 transition-opacity hover:opacity-85 sm:gap-3"
        >
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md sm:size-10 sm:rounded-2xl"
            style={{
              boxShadow: "0 10px 24px -16px rgba(0, 0, 0, 0.45)",
            }}
          >
            <Image
              src="/images/logo.png"
              alt={t("brand.logoAlt")}
              width={22}
              height={22}
              className="size-4 brightness-0 invert sm:size-[22px]"
            />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-white max-[380px]:sr-only">
            {t("brand.name")}
          </span>
        </Link>

        <nav
          aria-label={t("nav.main")}
          className="flex items-center justify-self-center gap-4 sm:gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 text-[13px] font-medium whitespace-nowrap text-white/80 transition-colors hover:text-white sm:text-sm"
            >
              {link.label}
              {"active" in link && link.active ? (
                <span
                  className="absolute bottom-1 inset-x-0 h-px bg-white"
                  aria-hidden
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <LanguageToggle variant="onDark" />
          <Button
            variant="secondary"
            size="lg"
            className="hidden sm:inline-flex"
            onClick={bookAppointment}
          >
            {t("landing.bookAppointment")}
          </Button>
        </div>
      </header>

      <div className="hero-short-copy relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-12 sm:pb-16 lg:justify-center lg:px-12 lg:pt-8 lg:pb-24">
        <div className="dashboard-fade-up max-w-xl">
          <p className="hero-short-title text-4xl leading-[1.05] font-semibold tracking-tight text-white min-[380px]:text-5xl sm:text-6xl lg:text-7xl">
            {t("brand.name")}
          </p>
          <h1 className="hero-short-heading mt-3 max-w-lg text-[clamp(1.25rem,3.4vw,1.875rem)] leading-snug font-medium tracking-tight text-white/95 sm:mt-5">
            {t("landing.headline")}
          </h1>
          <p className="hero-short-body mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base lg:text-lg">
            {t("landing.body")}
          </p>
          <div className="hero-short-action mt-6 sm:mt-8">
            <Button variant="secondary" size="xl" onClick={bookAppointment}>
              {t("landing.bookAppointment")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
