import React, { useState, useEffect } from "react";
import axios from "axios";
import colors from "../data/Colors.js";
import { format } from "date-fns";

const Cell = (props) => {
  let [active, setActive] = useState(false);
  let [hover, setHover] = useState(false);

  let style = {
    userSelect: "none",
    WebkitUserSelect: "none",
    backgroundColor: hover
      ? colors.habitPalette[props.index % colors.habitPalette.length]
      : active
      ? colors.habitPalette[props.index % colors.habitPalette.length]
      : "white",
    opacity: hover ? (active ? 1 : 0.5) : active ? 1 : 1,
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
        ? "http://localhost:3000/unmark"
        : "/unmark"
      : process.env.NODE_ENV === "development"
      ? "http://localhost:3000/mark"
      : "/mark";

    let data = {
      date: format(props.date, "M/d/yyyy"),
      id: props.id,
    };

    axios.put(url, data).then((res) => {
      if (res.data) {
        console.log("Cell.js handleClick");
        props.handleMark(res.data, props.id, format(props.date, "M/d/yyyy"));
      }
    });
  };

  return (
    <>
      <td className="habitCell">
        <div
          className="habitCellInner"
          onMouseOver={toggleMouseEnter}
          onMouseOut={toggleMouseLeave}
          onClick={handleClick}
          style={style}
        >
          {active ? (
            <div
              className={
                props.streak >= 1
                  ? `streak-${props.index % colors.habitPalette.length}`
                  : "streak"
              }
            >
              {props.streak}
            </div>
          ) : (
            ""
          )}
        </div>
      </td>
    </>
  );
};

export default Cell;
