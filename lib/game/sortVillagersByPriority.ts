import type { Villager } from "@/types/villagers";

export function sortVillagersByPriority(
  villagers: Villager[],
  talked: number[],
  gifted: number[]
): Villager[] {
  return [...villagers].sort((a, b) => {
    const aNeedsTalk = !talked.includes(a.id);
    const bNeedsTalk = !talked.includes(b.id);

    const aNeedsGift = !gifted.includes(a.id);
    const bNeedsGift = !gifted.includes(b.id);

    const aPriority = (aNeedsTalk ? 2 : 0) + (aNeedsGift ? 1 : 0);
    const bPriority = (bNeedsTalk ? 2 : 0) + (bNeedsGift ? 1 : 0);

    if (aPriority === bPriority) {
      return a.name.localeCompare(b.name);
    }

    return bPriority - aPriority;
  });
}