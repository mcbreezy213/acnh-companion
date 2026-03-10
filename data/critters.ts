import type { Critter } from "../types";

export const critters: Critter[] = [
  {
    id: 1,
    name: "Stringfish",
    type: "fish",
    location: "Clifftop river",
    monthsNorth: [12, 1, 2, 3],
    monthsSouth: [6, 7, 8, 9],
    hours: [16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 2,
    name: "Common Butterfly",
    type: "bug",
    location: "Flying",
    monthsNorth: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
    monthsSouth: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hours: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
  {
    id: 3,
    name: "Sea Star",
    type: "sea",
    location: "Sea",
    monthsNorth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    monthsSouth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
];