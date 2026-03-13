const STORAGE_KEY = "dailyTasksCompleted";

export function getCompletedDailyTasks(): number[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is number => typeof item === "number");
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveCompletedDailyTasks(taskIds: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskIds));
}