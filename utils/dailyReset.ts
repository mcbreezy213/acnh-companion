export function shouldResetDaily(): boolean {
  const now = new Date();
  const resetDate = new Date(now);

  // ACNH resets at 5AM
  if (now.getHours() < 5) {
    resetDate.setDate(resetDate.getDate() - 1);
  }

  const resetKey = resetDate.toLocaleDateString();
  const lastOpened = localStorage.getItem("lastOpenedDay");

  if (!lastOpened) {
    localStorage.setItem("lastOpenedDay", resetKey);
    return false;
  }

  if (lastOpened !== resetKey) {
    localStorage.setItem("lastOpenedDay", resetKey);
    return true;
  }

  return false;
}

export function resetDailyProgress() {
  localStorage.setItem("talkedVillagers", JSON.stringify([]));
  localStorage.setItem("giftedVillagers", JSON.stringify([]));
}