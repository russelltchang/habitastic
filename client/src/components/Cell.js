import React, { useState, useEffect } from "react";
import data from "../data/Data.js";

const Cell = (props) => {
  let [active, setActive] = useState(false);

  let localStorageField =
    props.id + " " + new Date(props.date).toLocaleString().split(",")[0];

  useEffect(() => {
    if (localStorageField in localStorage) {
      setActive(true);
    }
  });

  let handleClick = () => {
    if (localStorageField in localStorage) {
      localStorage.removeItem(localStorageField);
      setActive(false);
    } else {
      localStorage.setItem(localStorageField, true);
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
