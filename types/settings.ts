export type Hemisphere = "Northern" | "Southern";

export type NativeFruit =
  | ""
  | "Apple"
  | "Cherry"
  | "Orange"
  | "Peach"
  | "Pear";

export type AppSettings = {
  playerName: string;
  islandName: string;
  hemisphere: Hemisphere;
  nativeFruit: NativeFruit;
};