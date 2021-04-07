import React, { useState, useEffect } from "react";
import axios from "axios";

const Cell = (props) => {
  let [active, setActive] = useState(false);
  let [hover, setHover] = useState(false);

  let colorArray = ["#3f51b5"];

  let style = {
    backgroundColor: hover
      ? active
        ? "white"
        : colorArray[0]
      : active
      ? colorArray[0]
      : "white",
    // border: hover ? (active ? "2px solid #3f51b5" : "none") : "none",
    color: hover ? (active ? "black" : "white") : active ? "black" : "black",
    opacity: hover ? (active ? 1 : 0.8) : active ? 1 : 1,
    // boxShadow: active ? "0 0 10px #3f51b5" : "none",
  };

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  let toggleMouseEnter = () => {
    setHover(true);
  };

  let toggleMouseLeave = () => {
    setHover(false);
  };

  let handleClick = (e) => {
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
        className="habitCell"
        onMouseEnter={toggleMouseEnter}
        onMouseLeave={toggleMouseLeave}
        style={style}
        onClick={handleClick}
      >
        {hover ? (active ? "unmark" : props.name) : ""}
      </td>
    </>
  );
};

export default Cell;
