import type { Metadata } from "next";
import type { ReactNode } from "react";
import { t } from "@/i18n";

export const metadata: Metadata = {
  title: t("meta.loginTitle"),
  description: t("meta.loginDescription"),
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
