const TALKED_KEY = "talkedVillagers";
const GIFTED_KEY = "giftedVillagers";

function getNumberArray(key: string): number[] {
  const raw = localStorage.getItem(key);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is number => typeof item === "number");
  } catch {
    localStorage.removeItem(key);
    return [];
  }
}

function saveNumberArray(key: string, values: number[]): void {
  localStorage.setItem(key, JSON.stringify(values));
}

export function getTalkedVillagers(): number[] {
  return getNumberArray(TALKED_KEY);
}

export function saveTalkedVillagers(villagerIds: number[]): void {
  saveNumberArray(TALKED_KEY, villagerIds);
}

export function getGiftedVillagers(): number[] {
  return getNumberArray(GIFTED_KEY);
}

export function saveGiftedVillagers(villagerIds: number[]): void {
  saveNumberArray(GIFTED_KEY, villagerIds);
}