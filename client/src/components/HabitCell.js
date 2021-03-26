import React, { useState, useEffect } from "react";
import data from "../data/Data.js";

const HabitCell = (props) => {
  let [active, setActive] = useState(false);

  let localStorageDate = `${
    data.monthNames[props.date.getMonth()]
  } ${props.date.getDate()} ${props.date.getFullYear()}`;

  //how to save to DB on componentwillunMount.  this is an individual cell
  useEffect(() => {
    if (localStorageDate in localStorage) {
      setActive(true);
    }
  });

  let handleClick = () => {
    if (localStorageDate in localStorage) {
      localStorage.removeItem(localStorageDate);
      setActive(false);
    } else {
      localStorage.setItem(localStorageDate, true);
      setActive(true);
    }
  };

  return (
    <>
      <td
        style={{ backgroundColor: active ? "#3f51b5" : "white" }}
        className="habitCell"
        onClick={handleClick}
      ></td>
    </>
  );
};

export default HabitCell;
