import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const Habits = (props) => {
  return props.habits.map((habit, i) => (
    <tr>
      <th key={i}>
        <i
          className="fa fa-pencil"
          onClick={() => props.edit(habit.id, habit.habit)}
        ></i>
        <span>{habit.habit}</span>
      </th>
      {props.dates.slice(props.start, props.end).map((date) => (
        <Cell
          id={habit.id}
          date={date}
          key={habit.id + " " + new Date(date).toLocaleString().split(",")[0]}
        />
      ))}
    </tr>
  ));
};

export default Habits;
