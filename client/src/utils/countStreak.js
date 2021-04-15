export const countStreak = (date, activeDates) => {
  let streak = 1;
  let yesterday = new Date(
    new Date(date).setDate(new Date(date).getDate() - 1)
  ).toLocaleDateString();

  let tomorrow = new Date(
    new Date(date).setDate(new Date(date).getDate() + 1)
  ).toLocaleDateString();

  if (
    activeDates.includes(date.toLocaleDateString()) &&
    !activeDates.includes(tomorrow)
  ) {
    while (activeDates.includes(yesterday)) {
      streak++;
      yesterday = new Date(
        new Date(yesterday).setDate(new Date(yesterday).getDate() - 1)
      ).toLocaleDateString();
    }
    return streak;
  }
};
