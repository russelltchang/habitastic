import React, { useState, useEffect } from "react";
import dates from "../data/Dates.js";

const Dates = (props) => {
  let [todayDate, setTodayDate] = useState(
    new Date(Date.now()).toLocaleString().split(",")[0]
  );

  return (
    <tr className="datesRow">
      <th style={{ position: "relative" }}>
        <div id="dateControlLeft">
          <i
            id="leftArrow"
            className="fa fa-caret-left fa-2x"
            onClick={props.leftClick}
          ></i>
        </div>
      </th>
      {props.dates.slice(props.start, props.end).map((date, i) => (
        <td key={i} className="dateCell">
          <div className="month">
            {dates.monthNames[date.getMonth()].substring(0, 3)}
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
            {dates.dayNames[date.getDay()].substring(0, 3)}
          </div>
        </td>
      ))}
      <td className="streakTitleCell" style={{ position: "relative" }}>
        <div id="bestStreakText">Best Streak</div>
        <div id="dateControlRight">
          <i
            id="rightArrow"
            className="fa fa-caret-right fa-2x"
            onClick={props.rightClick}
          ></i>
        </div>
      </td>
    </tr>
  );
};

export default Dates;
