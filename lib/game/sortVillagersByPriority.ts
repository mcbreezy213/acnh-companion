import type { Villager } from "../types";

export function sortVillagersByPriority(
  villagers: Villager[],
  talked: number[],
  gifted: number[]
) {
  return [...villagers].sort((a, b) => {
    const aTalked = talked.includes(a.id);
    const aGifted = gifted.includes(a.id);

    const bTalked = talked.includes(b.id);
    const bGifted = gifted.includes(b.id);

    const priority = (t: boolean, g: boolean) => {
      if (!t && !g) return 0;
      if (!t && g) return 1;
      if (t && !g) return 2;
      return 3;
    };

    const pa = priority(aTalked, aGifted);
    const pb = priority(bTalked, bGifted);

    if (pa !== pb) return pa - pb;

    return a.friendship - b.friendship;
  });
}