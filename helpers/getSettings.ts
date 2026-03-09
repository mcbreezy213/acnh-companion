export function getSettings() {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("acnhSettings");

  if (!saved) return null;

  return JSON.parse(saved);
}