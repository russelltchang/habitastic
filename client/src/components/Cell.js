import React, { useState, useEffect } from "react";
import data from "../data/Data.js";

const Cell = (props) => {
  let [active, setActive] = useState(false);

  let localStorageDate = `${
    data.monthNames[props.date.getMonth()]
  } ${props.date.getDate()} ${props.date.getFullYear()}`;

  useEffect(() => {
    if (localStorageDate in localStorage) {
      setActive(true);
    }
  });

  //since the date for columns are the same, all habits fill
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

export default Cell;
