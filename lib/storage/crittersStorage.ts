import type { CritterProgress } from "@/types/critters";

const STORAGE_KEY = "critterProgress";

export function getCritterProgress(): CritterProgress {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      caught: [],
      donated: [],
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEY);

    return {
      caught: [],
      donated: [],
    };
  }
}

export function saveCritterProgress(progress: CritterProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}