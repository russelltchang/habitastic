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
        {habit.habit}
      </th>
      {props.dates.slice(props.start, props.end).map((date) => (
        <Cell id={habit.id} date={date} key={date.toString()} />
      ))}
    </tr>
  ));
};

export default Habits;
