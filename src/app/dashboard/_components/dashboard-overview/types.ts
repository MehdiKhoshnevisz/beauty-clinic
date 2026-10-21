import type { ComponentType } from "react";

export type SummaryCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  accentClass: string;
  hint: string;
};
