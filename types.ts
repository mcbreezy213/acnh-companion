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

export type CritterType = "fish" | "bug" | "sea";

export type Critter = {
  id: number;
  name: string;
  type: CritterType;
  location: string;
  monthsNorth: number[];
  monthsSouth: number[];
  hours: number[];
};