import React, { useState, useEffect } from "react";
import data from "../data/Data.js";

const Dates = (props) => {
  return (
    <tr className="datesRow">
      <th id="emptyDate"></th>
      {props.dates.slice(props.start, props.end).map((date, i) => (
        <td className="date" key={i}>
          <div>{data.monthNames[date.getMonth()].substring(0, 3)}</div>
          <div>{date.getDate()}</div>
          <div>{data.dayNames[date.getDay()].substring(0, 3)}</div>
        </td>
      ))}
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default Dates;
