export const longestStreak = (activeDates) => {
  if (activeDates.length === 0 || activeDates === null) return 0;
  var max = 0;
  const set = new Set();
  for (let date of activeDates) set.add(date);
  for (let i = 0; i < activeDates.length; i++) {
    if (
      set.has(
        new Date(
          new Date(activeDates[i]).setDate(
            new Date(activeDates[i]).getDate() - 1
          )
        ).toLocaleDateString()
      )
    ) {
      continue;
    }
    let count = 1;
    let date = activeDates[i];
    while (
      set.has(
        new Date(
          new Date(date).setDate(new Date(date).getDate() + 1)
        ).toLocaleDateString()
      )
    ) {
      date = new Date(
        new Date(date).setDate(new Date(date).getDate() + 1)
      ).toLocaleDateString();
      count++;
    }

    max = Math.max(count, max);
  }
  return max;
};
