import { cn } from "cn";
import type { ReservationStatus } from "@/types/reservation";
import { STATUS_LABELS } from "@/types/reservation";

const statusStyles: Record<ReservationStatus, string> = {
  pending:
    "bg-amber-50 text-amber-800 ring-amber-200/80 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800/50",
  confirmed:
    "bg-emerald-50 text-emerald-800 ring-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800/50",
  canceled:
    "bg-red-50 text-red-800 ring-red-200/80 dark:bg-red-950/40 dark:text-red-200 dark:ring-red-800/50",
};

type StatusBadgeProps = {
  status: ReservationStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        statusStyles[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
