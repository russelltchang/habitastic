import React, { useState, useEffect } from "react";

const Table = (props) => {
  let [baseDate, setBaseDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let today = new Date();
  //set a variable as last year's date
  let lastYear = new Date().setDate(today.getDate() - 365);
  //convert milliseconds to Date, toString needs to be called here, not in render
  let lastYearDate = new Date(lastYear).toString();

  //useEffect this.
  function getDates(startDate, stopDate) {
    var dateArray = new Array();
    //deserialize startDate (lastYearDate) string into date object
    var currentDate = new Date(startDate);

    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dateArray;
  }

  let dateArray = getDates(lastYearDate, today);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Habit</th>
            {dateArray.map((date, i) => (
              <td key={i}>
                <div>{monthNames[date.getMonth()].substring(0, 3)}</div>
                <div>{date.getDate()}</div>
                <div>{dayNames[date.getDay()].substring(0, 3)}</div>
              </td>
            ))}
          </tr>
          {props.habits.map((habit, i) => (
            <tr key={i}>{habit}</tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
