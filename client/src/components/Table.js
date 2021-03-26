import React, { useState, useEffect } from "react";
import data from "../data/Data.js";

import HabitTd from "./HabitTd";

const Table = (props) => {
  let [dateInfo, setDateInfo] = useState({
    startIndex: 0,
    endIndex: 0,
    dates: [],
  });

  useEffect(() => {
    let today = new Date();
    let oneYearAgo = new Date().setDate(today.getDate() - 365);
    //convert milliseconds to Date
    let currentDate = new Date(oneYearAgo);
    let dateArray = new Array();

    while (currentDate <= today) {
      dateArray.push(new Date(currentDate));
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    setDateInfo({
      dates: dateArray,
      endIndex: dateArray.length,
      startIndex: dateArray.length - 7,
    });
  }, []);

  let handleLeftClick = () => {
    //setState if index doesn't go past zero
    //could be missing dates here, if -2 works or -3, it won't change index
    if (dateInfo.startIndex - 7 >= 0) {
      setDateInfo({
        ...dateInfo,
        startIndex: dateInfo.startIndex - 7,
        endIndex: dateInfo.endIndex - 7,
      });
    }
  };

  let handleRightClick = () => {
    if (dateInfo.endIndex + 7 <= dateInfo.dates.length) {
      setDateInfo({
        ...dateInfo,
        startIndex: dateInfo.startIndex + 7,
        endIndex: dateInfo.endIndex + 7,
      });
    }
  };

  return (
    <>
      <i className="fa fa-angle-left fa-2x" onClick={handleLeftClick}></i>

      <i className="fa fa-angle-right fa-2x" onClick={handleRightClick}></i>

      <table>
        <tbody>
          <tr>
            <th>Habit</th>
            {dateInfo.dates
              .slice(dateInfo.startIndex, dateInfo.endIndex)
              .map((date, i) => (
                <td key={i}>
                  <div>{data.monthNames[date.getMonth()].substring(0, 3)}</div>
                  <div>{date.getDate()}</div>
                  <div>{data.dayNames[date.getDay()].substring(0, 3)}</div>
                </td>
              ))}
          </tr>
          {props.habits.map((habit, i) => (
            <tr>
              <th key={i}>{habit}</th>
              {dateInfo.dates
                .slice(dateInfo.startIndex, dateInfo.endIndex)
                .map((date) => (
                  <HabitTd date={date} key={date.toString()} />
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
