export function getTodayDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export function shouldResetDaily() {
  const today = getTodayDate();
  const lastOpened = localStorage.getItem("lastOpened");

  if (!lastOpened) {
    localStorage.setItem("lastOpened", today);
    return false;
  }

  if (lastOpened !== today) {
    localStorage.setItem("lastOpened", today);
    return true;
  }

  return false;
}