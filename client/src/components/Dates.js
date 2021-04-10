import React, { useState, useEffect } from "react";
import data from "../data/Data.js";

const Dates = (props) => {
  let [todayDate, setTodayDate] = useState(
    new Date(Date.now()).toLocaleString().split(",")[0]
  );

  return (
    <tr className="datesRow">
      <th>
        <div id="dateControl">
          <i
            id="leftArrow"
            className="fa fa-caret-left fa-2x"
            onClick={props.leftClick}
          ></i>
          <span id="dateTitle">Dates</span>
          <i
            id="rightArrow"
            className="fa fa-caret-right fa-2x"
            onClick={props.rightClick}
          ></i>
        </div>
      </th>
      {props.dates.slice(props.start, props.end).map((date, i) => (
        <td key={i} className="dateCell">
          <div className="month">
            {data.monthNames[date.getMonth()].substring(0, 3)}
          </div>
          <div
            className={
              todayDate === date.toLocaleString().split(",")[0]
                ? "today date"
                : "date"
            }
          >
            {date.getDate()}
          </div>
          <div className="day">
            {data.dayNames[date.getDay()].substring(0, 3)}
          </div>
        </td>
      ))}
      <td
        className="streakTitleCell"
        style={{ borderLeft: "1px solid lightgrey" }}
      >
        Current Streak
      </td>
      <td className="streakTitleCell">Max Streak</td>
      <td className="streakTitleCell">Total Count</td>
    </tr>
  );
};

export default Dates;
