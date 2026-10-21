import type { ComponentType, ReactNode } from "react";

export type DashboardShellProps = {
  children: ReactNode;
};

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  end: boolean;
};
