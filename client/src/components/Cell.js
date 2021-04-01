import React, { useState, useEffect } from "react";
import axios from "axios";

const Cell = (props) => {
  let [active, setActive] = useState(false);

  let localStorageField =
    props.id + " " + new Date(props.date).toLocaleString().split(",")[0];

  useEffect(() => {
    // if (localStorageField in localStorage) {
    //   setActive(true);
    // }
    setActive(props.active);
  }, [props.active]);

  let handleClick = () => {
    // if (localStorageField in localStorage) {
    //   localStorage.removeItem(localStorageField);
    //   setActive(false);
    // } else {
    //   localStorage.setItem(localStorageField, true);
    //   setActive(true);
    // }
    let url = active
      ? process.env.NODE_ENV === "development"
        ? process.env.DEV_API_UNMARK
        : process.env.PRO_API_UNMARK
      : process.env.NODE_ENV === "development"
      ? process.env.DEV_API_MARK
      : process.env.PRO_API_MARK;

    let data = {
      date: new Date(props.date).toLocaleString().split(",")[0],
      id: props.id,
    };

    axios.put(url, data).then((res) => {
      if (res.data) {
        props.handleMark(res.data);
      }
    });
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
