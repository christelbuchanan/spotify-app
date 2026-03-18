import type { DataScenario, TimeRange } from "../types/music";

export const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/trends", label: "Trends" },
  { to: "/library", label: "Library" }
] as const;

export const DATA_SCENARIOS: { label: string; value: DataScenario }[] = [
  { label: "Normal data", value: "normal" },
  { label: "Empty state", value: "empty" },
  { label: "Error state", value: "error" }
];

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  short_term: "Last 4 weeks",
  medium_term: "Last 6 months",
  long_term: "All time"
};
