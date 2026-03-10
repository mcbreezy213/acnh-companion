export function shouldResetDaily(): boolean {
  const now = new Date();
  const resetDate = new Date(now);

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