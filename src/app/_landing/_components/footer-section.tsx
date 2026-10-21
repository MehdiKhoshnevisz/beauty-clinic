"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer className="footer-fade border-t border-charcoal/6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10 sm:text-start lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <span className="flex size-9 items-center justify-center rounded-xl border border-charcoal/6 bg-white shadow-logo">
            <Image
              src="/images/logo.png"
              alt={t("brand.logoAlt")}
              width={18}
              height={18}
            />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {t("brand.name")}
          </span>
        </Link>
        <p className="text-sm text-charcoal/50">{t("brand.tagline")}</p>
      </div>
    </footer>
  );
}
