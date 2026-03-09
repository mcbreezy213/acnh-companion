export function getFriendshipLevel(points: number) {
  if (points < 30) return "New Friends";
  if (points < 60) return "Good Friends";
  if (points < 80) return "Close Friends";
  return "Best Friends";
}

export function hasPhotoChance(points: number) {
  return points >= 80;
}