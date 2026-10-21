"use client";

import { useTranslation } from "react-i18next";
import { cn } from "cn";
import { useLocale } from "@/i18n/provider";
import { localeLabels, locales, type Locale } from "@/i18n/settings";

type LanguageToggleProps = {
  className?: string;
  variant?: "default" | "onDark";
};

export function LanguageToggle({
  className,
  variant = "default",
}: LanguageToggleProps) {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={cn(
        "inline-flex items-center rounded-lg border p-0.5 text-xs font-semibold tracking-wide",
        variant === "onDark"
          ? "border-white/20 bg-white/10 text-white/70 backdrop-blur-md"
          : "border-black/10 bg-white/80 text-charcoal/70",
        className,
      )}
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            aria-pressed={active}
            aria-label={t(`common.languageNames.${code}`)}
            className={cn(
              "flex-1 rounded-md px-2.5 py-1.5 transition-colors",
              active
                ? variant === "onDark"
                  ? "bg-white text-charcoal shadow-sm"
                  : "bg-charcoal text-white shadow-sm"
                : variant === "onDark"
                  ? "hover:bg-white/10 hover:text-white"
                  : "hover:bg-black/[0.04] hover:text-charcoal",
            )}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
