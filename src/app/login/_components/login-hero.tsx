"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

const LoginHero = () => {
  const { t } = useTranslation();

  return (
    <aside className="relative hidden overflow-hidden lg:block">
      <Image
        src="/images/michael-dagonakis-login.jpg"
        alt={t("login.heroImageAlt")}
        fill
        priority
        className="object-cover"
        sizes="50vw"
      />
      <div className="login-hero-overlay absolute inset-0" aria-hidden />
      <div className="dashboard-fade-up absolute inset-x-0 bottom-0 p-10 xl:p-12">
        <div className="max-w-md">
          <p className="text-4xl font-semibold tracking-tight text-white xl:text-5xl">
            {t("brand.name")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            {t("login.heroBody")}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LoginHero;
