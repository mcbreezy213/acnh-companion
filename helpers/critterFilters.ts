import type { Critter, Hemisphere } from "../types";

function getMonthsForHemisphere(
  critter: Critter,
  hemisphere: Hemisphere
): number[] {
  return hemisphere === "Northern"
    ? critter.monthsNorth
    : critter.monthsSouth;
}

export function getAvailableNow(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number,
  currentHour: number
): Critter[] {
  return critters.filter((critter) => {
    const months = getMonthsForHemisphere(critter, hemisphere);
    const monthMatch = months.includes(currentMonth);
    const hourMatch = critter.hours.includes(currentHour);

    return monthMatch && hourMatch;
  });
}

export function getNewThisMonth(
  critters: Critter[],
  hemisphere: Hemisphere,
  currentMonth: number
): Critter[] {
  return critters.filter((critter) => {
    const months = getMonthsForHemisphere(critter, hemisphere);
    return months.includes(currentMonth);
  });
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