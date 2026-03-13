export function getFriendshipLabel(points: number): string {
  if (points >= 80) return "Best Friends";
  if (points >= 60) return "Close Friends";
  if (points >= 40) return "Good Friends";
  if (points >= 20) return "Friends";
  return "New Friend";
}