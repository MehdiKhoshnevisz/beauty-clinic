import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { I18nProvider } from "@/i18n/provider";
import { t } from "@/i18n";
import { defaultLocale, localeDirection } from "@/i18n/settings";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: t("meta.title"),
  description: t("meta.description"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={defaultLocale}
      dir={localeDirection[defaultLocale]}
      className={`${vazirmatn.variable} h-full`}
    >
      <body
        className={`${vazirmatn.className} flex min-h-screen flex-col antialiased`}
      >
        <I18nProvider>
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
