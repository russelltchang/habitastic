import React, { useState, useEffect } from "react";
import { currentStreak } from "../utils/currentStreak";
import { longestStreak } from "../utils/longestStreak";
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
      <td>{longestStreak(habit.dates)}</td>
      <td>{currentStreak(habit.dates)}</td>
      <td>{habit.dates.length}</td>
    </tr>
  ));
};

export default Habits;
