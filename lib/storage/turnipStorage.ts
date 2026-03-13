import type { TurnipWeek } from "@/types/planner";

const STORAGE_KEY = "turnipWeek";

const emptyTurnipWeek: TurnipWeek = {
  buyPrice: null,
  monday: { am: null, pm: null },
  tuesday: { am: null, pm: null },
  wednesday: { am: null, pm: null },
  thursday: { am: null, pm: null },
  friday: { am: null, pm: null },
  saturday: { am: null, pm: null },
};

export function getTurnipWeek(): TurnipWeek {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return emptyTurnipWeek;
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      ...emptyTurnipWeek,
      ...parsed,
      monday: { ...emptyTurnipWeek.monday, ...parsed.monday },
      tuesday: { ...emptyTurnipWeek.tuesday, ...parsed.tuesday },
      wednesday: { ...emptyTurnipWeek.wednesday, ...parsed.wednesday },
      thursday: { ...emptyTurnipWeek.thursday, ...parsed.thursday },
      friday: { ...emptyTurnipWeek.friday, ...parsed.friday },
      saturday: { ...emptyTurnipWeek.saturday, ...parsed.saturday },
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return emptyTurnipWeek;
  }
}

export function saveTurnipWeek(turnipWeek: TurnipWeek): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turnipWeek));
}