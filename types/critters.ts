export type CritterType = "fish" | "bug" | "sea";

export type Critter = {
  id: number;
  name: string;
  type: CritterType;
  price: number;
  location: string;
  shadowSize?: string;
  speed?: string;
  monthsNorth: number[];
  monthsSouth: number[];
  hours: number[];
};

export type CritterProgress = {
  caught: number[];
  donated: number[];
};