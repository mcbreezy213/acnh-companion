import type { Critter } from "../types";

export const critters: Critter[] = [
  {
    id: 1,
    name: "Stringfish",
    type: "Fish",
    location: "Clifftop river",
    monthsNorth: [12, 1, 2, 3],
    monthsSouth: [6, 7, 8, 9],
    startHour: 16,
    endHour: 9,
  },
  {
    id: 2,
    name: "Coelacanth",
    type: "Fish",
    location: "Sea (rain only)",
    monthsNorth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    monthsSouth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    startHour: 0,
    endHour: 24,
  },
  {
    id: 3,
    name: "Golden Stag",
    type: "Bug",
    location: "Palm tree",
    monthsNorth: [7, 8],
    monthsSouth: [1, 2],
    startHour: 17,
    endHour: 8,
  },
];