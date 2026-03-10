export type Hemisphere = "Northern" | "Southern";

export type Settings = {
  playerName: string;
  islandName: string;
  hemisphere: Hemisphere;
  nativeFruit: string;
};

export type Villager = {
  id: number;
  name: string;
  personality: string;
  species: string;
  birthday: string;
  friendship: number;
  portrait: string;
};

export type Critter = {
  id: number;
  name: string;
  type: "fish" | "bug" | "sea";
  monthsNorth: number[];
  monthsSouth: number[];
  hours: number[];
};