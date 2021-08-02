import { format } from "date-fns";

export const countStreak = (date, activeDates) => {
  let streak = 1;
  let yesterday = format(
    new Date(date).setDate(new Date(date).getDate() - 1),
    "M/d/yyyy"
  );

  let tomorrow = format(
    new Date(date).setDate(new Date(date).getDate() + 1),
    "M/d/yyyy"
  );

  if (
    activeDates.includes(format(date, "M/d/yyyy")) &&
    !activeDates.includes(tomorrow)
  ) {
    while (activeDates.includes(yesterday)) {
      streak++;
      yesterday = format(
        new Date(
          new Date(yesterday).setDate(new Date(yesterday).getDate() - 1)
        ),
        "M/d/yyyy"
      );
    }
    return streak;
  }
};
