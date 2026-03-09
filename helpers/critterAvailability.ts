import type { Hemisphere, Critter } from "../types";

export function isCritterAvailableNow(
  critter: Critter,
  hemisphere: Hemisphere,
  currentMonth: number,
  currentHour: number
) {
  const months =
    hemisphere === "north" ? critter.monthsNorth : critter.monthsSouth;

  const monthMatch = months.includes(currentMonth);

  let hourMatch = false;

  if (critter.startHour < critter.endHour) {
    hourMatch =
      currentHour >= critter.startHour && currentHour < critter.endHour;
  } else {
    hourMatch =
      currentHour >= critter.startHour || currentHour < critter.endHour;
  }

  return monthMatch && hourMatch;
}