export type Villager = {
  id: number;
  name: string;
  personality: string;
  birthday?: string;
  species?: string;
  image?: string;
};

export type VillagerProgress = {
  talked: number[];
  gifted: number[];
};
