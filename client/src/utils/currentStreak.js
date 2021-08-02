import { format } from "date-fns";

export const currentStreak = (activeDates) => {
  if (activeDates.length === 0) return 0;

  let today = format(new Date(Date.now()), "M/d/yyyy");

  let todayCount = activeDates.includes(today) ? 1 : 0;
  let yesterday = format(
    new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - 1)),
    "M/d/yyyy"
  );
  let currentStreak = 0;

  while (activeDates.includes(yesterday)) {
    currentStreak++;
    yesterday = format(
      new Date(new Date(yesterday).setDate(new Date(yesterday).getDate() - 1)),
      "M/d/yyyy"
    );
  }
  return currentStreak + todayCount;
};
