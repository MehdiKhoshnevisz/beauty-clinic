import type { ReactNode } from "react";
import { DashboardProvider } from "./_providers/dashboard-context";
import { DashboardShell } from "./_components/dashboard-shell";
import { formatAdminDisplayName, getAdminCredentials } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { username } = getAdminCredentials();

  return (
    <DashboardProvider userName={formatAdminDisplayName(username)}>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
