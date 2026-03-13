import type { Critter } from "@/types/critters";
import type { Hemisphere } from "@/types/settings";

function getMonthsForHemisphere(
  critter: Critter,
  hemisphere: Hemisphere
): number[] {
  return hemisphere === "Northern"
    ? critter.monthsNorth
    : critter.monthsSouth;
}

function isAvailableThisMonth(
  critter: Critter,
  hemisphere: Hemisphere,
  month: number
): boolean {
  const months = getMonthsForHemisphere(critter, hemisphere);
  return months.includes(month);
}

function isAvailableThisHour(
  critter: Critter,
  hour: number
): boolean {
  return critter.hours.includes(hour);
}

export function getAvailableNow(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number,
  currentHour: number
): Critter[] {
  return critters.filter((critter) =>
    isAvailableThisMonth(critter, hemisphere, currentMonth) &&
    isAvailableThisHour(critter, currentHour)
  );
}

export function getNewThisMonth(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number
): Critter[] {
  return critters.filter((critter) =>
    isAvailableThisMonth(critter, hemisphere, currentMonth)
  );
}

export function getLeavingThisMonth(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number
): Critter[] {
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  return critters.filter((critter) => {
    const months = getMonthsForHemisphere(critter, hemisphere);
    return months.includes(currentMonth) && !months.includes(nextMonth);
  });
}