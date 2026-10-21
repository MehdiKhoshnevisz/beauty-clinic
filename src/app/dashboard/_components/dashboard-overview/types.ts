import type { ComponentType } from "react";

export type SummaryCardProps = {
  label: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  accentClass: string;
  hint: string;
};
