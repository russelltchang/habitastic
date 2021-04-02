export const longestStreak = (activeDates) => {
  if (activeDates.length === 0) return 0;
  if (activeDates.length === 1) return 1;

  let sortedDates = activeDates.sort(function (a, b) {
    a = new Date(a);
    b = new Date(b);
    return a > b ? 1 : a < b ? -1 : 0;
  });

  let streaks = [];
  let streak = 1;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    if (
      new Date(sortedDates[i + 1]).toLocaleDateString() ===
      new Date(
        new Date(sortedDates[i]).setDate(new Date(sortedDates[i]).getDate() + 1)
      ).toLocaleDateString()
    ) {
      streak++;
      streaks.push(streak);
    } else {
      streak = 1;
      streaks.push(streak);
    }
  }
  return Math.max(...streaks);
};
