import type { Villager } from "../types";

export function sortVillagersByPriority(
  villagers: Villager[],
  talked: number[],
  gifted: number[]
) {
  return [...villagers].sort((a, b) => {
    const aNeedsTalk = !talked.includes(a.id);
    const bNeedsTalk = !talked.includes(b.id);

    const aNeedsGift = !gifted.includes(a.id);
    const bNeedsGift = !gifted.includes(b.id);

    const aPriority =
      (aNeedsTalk ? 2 : 0) +
      (aNeedsGift ? 1 : 0) +
      a.friendship / 100;

    const bPriority =
      (bNeedsTalk ? 2 : 0) +
      (bNeedsGift ? 1 : 0) +
      b.friendship / 100;

    return bPriority - aPriority;
  });
}