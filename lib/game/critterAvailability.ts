import type { Critter, Hemisphere } from "../types";

export function isCritterAvailableNow(
  critter: Critter,
  hemisphere: Hemisphere,
  currentMonth: number,
  currentHour: number
): boolean {
  const months =
    hemisphere === "Northern" ? critter.monthsNorth : critter.monthsSouth;

  const monthMatch = months.includes(currentMonth);
  const hourMatch = critter.hours.includes(currentHour);

  return monthMatch && hourMatch;
}