export const currentStreak = (activeDates) => {
  if (activeDates.length === 0) return 0;

  let today = new Date(Date.now()).toLocaleDateString();
  let todayCount = activeDates.includes(today) ? 1 : 0;
  let yesterday = new Date(
    new Date(Date.now()).setDate(new Date(Date.now()).getDate() - 1)
  ).toLocaleDateString();
  let currentStreak = 0;

  while (activeDates.includes(yesterday)) {
    currentStreak++;
    yesterday = new Date(
      new Date(yesterday).setDate(new Date(yesterday).getDate() - 1)
    ).toLocaleDateString();
  }
  return currentStreak + todayCount;
};
