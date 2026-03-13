export function getFriendshipPercent(points: number) {
  const maxPoints = 100;
  return Math.min((points / maxPoints) * 100, 100);
}