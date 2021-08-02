import colors from "../data/Colors.js";
import { currentStreak } from "../utils/currentStreak";
import { longestStreak } from "../utils/longestStreak";
import { countStreak } from "../utils/countStreak";
import { Draggable } from "react-beautiful-dnd";
import Cell from "./Cell";
import { format } from "date-fns";

const Habits = (props) => {
  let handleMarkHabit = (action, id, date) => {
    props.handleMark(action, id, date);
  };

  let getItemStyle = (isDragging, draggableStyle) => ({
    display: isDragging ? "table" : "",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return props.habits.map((habit, i) => (
    <Draggable draggableId={habit.id} key={habit.id} index={i}>
      {(provided, snapshot) => (
        <tr
          key={i}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
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
              key={habit.id + " " + format(date, "M/d/yyyy")}
              active={
                habit.dates.includes(format(date, "M/d/yyyy")) ? true : false
              }
              handleMark={handleMarkHabit}
            />
          ))}

          <td className="bestStreakCount">
            <div
              className={
                currentStreak(habit.dates) === longestStreak(habit.dates) &&
                currentStreak(habit.dates) !== 0
                  ? `bestStreakWrapper-${
                      props.habits.indexOf(habit) % colors.habitPalette.length
                    }`
                  : "bestStreakWrapper"
              }
            >
              <p>{longestStreak(habit.dates)}</p>
            </div>
          </td>
        </tr>
      )}
    </Draggable>
  ));
};

export default Habits;
