import React, { useState, useEffect } from "react";
import axios from "axios";

const Cell = (props) => {
  let [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  let handleClick = () => {
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
