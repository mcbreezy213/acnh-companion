import type { Critter, Hemisphere } from "../types";
import { isCritterAvailableNow } from "./critterAvailability";

function getCritterMonths(critter: Critter, hemisphere: Hemisphere) {
  return hemisphere === "north" ? critter.monthsNorth : critter.monthsSouth;
}

export function getAvailableNow(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number,
  currentHour: number
) {
  return critters.filter((critter) =>
    isCritterAvailableNow(critter, hemisphere, currentMonth, currentHour)
  );
}

export function getNewThisMonth(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number
) {
  return critters.filter((critter) => {
    const months = getCritterMonths(critter, hemisphere);
    return months.includes(currentMonth) && !months.includes(currentMonth - 1);
  });
}

export function getLeavingThisMonth(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number
) {
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  return critters.filter((critter) => {
    const months = getCritterMonths(critter, hemisphere);
    return months.includes(currentMonth) && !months.includes(nextMonth);
  });
}