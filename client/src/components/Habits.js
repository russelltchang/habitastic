import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const Habits = (props) => {
  let handleMarkHabit = (habits) => {
    props.handleMark(habits);
  };

  return props.habits.map((habit, i) => (
    <tr key={habit.id}>
      <th>
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
          id={habit.id}
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
    </tr>
  ));
};

export default Habits;
