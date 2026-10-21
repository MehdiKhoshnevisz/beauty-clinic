"use client";

import { UserRound, Shield, Heart, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

const featureKeys = [
  { icon: UserRound, key: "specialists" },
  { icon: Shield, key: "safe" },
  { icon: Heart, key: "personalized" },
  { icon: Leaf, key: "natural" },
] as const;

export default function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="why-choose-us"
      className="page-mist-section relative overflow-hidden"
    >
      <div
        className="dot-grid-section pointer-events-none absolute inset-0 opacity-[0.3]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
        <div className="dashboard-fade-up mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.14em] text-charcoal/50 uppercase">
            {t("landing.whyChooseUsEyebrow")}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
            {t("landing.whyChooseUsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty text-charcoal/60 sm:mt-4 sm:max-w-xl sm:text-base lg:text-lg">
            {t("landing.whyChooseUsBody")}
          </p>
        </div>

        <ul
          id="services"
          className="dashboard-stagger mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          {featureKeys.map(({ icon: Icon, key }) => (
            <li
              key={key}
              className="surface-card group relative overflow-hidden rounded-2xl border border-charcoal/6 p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 sm:p-6"
            >
              <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-charcoal/6 text-charcoal transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-5 stroke-[1.5]" aria-hidden />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-charcoal">
                {t(`landing.features.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                {t(`landing.features.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
