import type { Villager } from "@/types/villagers";

export function sortVillagersByName(villagers: Villager[]): Villager[] {
  return [...villagers].sort((a, b) => a.name.localeCompare(b.name));
}