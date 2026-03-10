import { Villager } from "../types";

export function sortVillagersByPriority(
  villagers: Villager[],
  talked: number[],
  gifted: number[]
) {
  return [...villagers].sort((a, b) => {
    const aTalked = talked.includes(a.id);
    const bTalked = talked.includes(b.id);

    const aGifted = gifted.includes(a.id);
    const bGifted = gifted.includes(b.id);

    // Priority 1: villagers not talked to today
    if (aTalked !== bTalked) {
      return aTalked ? 1 : -1;
    }

    // Priority 2: villagers not gifted today
    if (aGifted !== bGifted) {
      return aGifted ? 1 : -1;
    }

    // Priority 3: lowest friendship first
    return a.friendship - b.friendship;
  });
}