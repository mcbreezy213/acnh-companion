export type DailyTask = {
  id: number;
  name: string;
};

export type TurnipDaySlot = {
  am: number | null;
  pm: number | null;
};

export type TurnipWeek = {
  buyPrice: number | null;
  monday: TurnipDaySlot;
  tuesday: TurnipDaySlot;
  wednesday: TurnipDaySlot;
  thursday: TurnipDaySlot;
  friday: TurnipDaySlot;
  saturday: TurnipDaySlot;
};

export type EventItem = {
  id: number;
  name: string;
  date: string;
  notes?: string;
};