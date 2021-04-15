import colors from "../data/Colors.js";
import { currentStreak } from "../utils/currentStreak";
import { longestStreak } from "../utils/longestStreak";
import { countStreak } from "../utils/countStreak";
import Cell from "./Cell";

const Habits = (props) => {
  let handleMarkHabit = (habits) => {
    props.handleMark(habits);
  };

  return props.habits.map((habit, i) => (
    <tr key={i}>
      <th className="habitTitleCell">
        <div className="habitTitle">
          <i
            className="fa fa-pencil"
            onClick={() => props.edit(habit.id, habit.habit)}
          ></i>
          <span> {habit.habit}</span>
        </div>
      </th>
      {props.dates.slice(props.start, props.end).map((date) => (
        <Cell
          streak={countStreak(date, habit.dates)}
          id={habit.id}
          index={i}
          name={habit.habit}
          date={date}
          key={habit.id + " " + new Date(date).toLocaleString().split(",")[0]}
          active={
            habit.dates.includes(new Date(date).toLocaleString().split(",")[0])
              ? true
              : false
          }
          handleMark={handleMarkHabit}
        />
      ))}

      <td id="bestStreakCount">
        <div
          id="countBackground"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            fontSize: ".8rem",
            boxShadow:
              currentStreak(habit.dates) === longestStreak(habit.dates)
                ? "0 0 5px 1px" +
                  colors.habitPalette[
                    props.habits.indexOf(habit) % colors.habitPalette.length
                  ]
                : "",
            height:
              currentStreak(habit.dates) === longestStreak(habit.dates)
                ? "25px"
                : "",
            width:
              currentStreak(habit.dates) === longestStreak(habit.dates)
                ? "25px"
                : "",
            backgroundColor:
              currentStreak(habit.dates) === longestStreak(habit.dates)
                ? colors.habitPalette[
                    props.habits.indexOf(habit) % colors.habitPalette.length
                  ]
                : "white",
            color:
              currentStreak(habit.dates) === longestStreak(habit.dates)
                ? "white"
                : "black",
          }}
        >
          <p>{longestStreak(habit.dates)}</p>
        </div>
      </td>
    </tr>
  ));
};

export default Habits;
