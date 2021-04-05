import React, { useState, useEffect } from "react";
import axios from "axios";

const Cell = (props) => {
  let [active, setActive] = useState(false);
  let [hover, setHover] = useState(false);

  let style = {
    backgroundColor: hover
      ? active
        ? "white"
        : "#3f51b5"
      : active
      ? "#3f51b5"
      : "white",
    // border: hover ? (active ? "2px solid #3f51b5" : "none") : "none",
    color: hover ? (active ? "black" : "white") : active ? "black" : "black",
  };

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  let toggleHover = () => {
    setHover(!hover);
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
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        style={style}
        onClick={handleClick}
      >
        {hover ? (active ? "unmark" : "mark") : ""}
      </td>
    </>
  );
};

export default Cell;
