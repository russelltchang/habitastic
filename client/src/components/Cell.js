import React, { useState, useEffect } from "react";
import axios from "axios";
import colors from "../data/Colors.js";

const Cell = (props) => {
  let [active, setActive] = useState(false);
  let [hover, setHover] = useState(false);

  let style = {
    backgroundColor: hover
      ? active
        ? "white"
        : colors.habitPalette[props.index % colors.habitPalette.length]
      : active
      ? colors.habitPalette[props.index % colors.habitPalette.length]
      : "white",
    border: hover
      ? active
        ? "2px solid " +
          colors.habitPalette[props.index % colors.habitPalette.length]
        : "none"
      : "none",
    color: hover ? (active ? "black" : "white") : active ? "black" : "black",
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
      date: new Date(props.date).toLocaleString().split(",")[0],
      id: props.id,
    };

    axios.put(url, data).then((res) => {
      if (res.data) {
        props.handleMark(
          res.data,
          props.id,
          new Date(props.date).toLocaleString().split(",")[0]
        );
      }
    });
  };

  return (
    <>
      <td className="habitCell">
        <div
          className="habitCellInner"
          onMouseEnter={toggleMouseEnter}
          onMouseLeave={toggleMouseLeave}
          onClick={handleClick}
          style={style}
        >
          {hover ? (
            active ? (
              "undo"
            ) : (
              ""
            )
          ) : active ? (
            <div
              style={{
                backgroundColor: props.streak >= 1 ? "white" : "none",
                height: props.streak >= 1 ? "25px" : "0",
                width: props.streak >= 1 ? "25px" : "0",
                borderRadius: props.streak >= 1 ? "50%" : "0",
                fontSize: props.streak >= 1 ? ".8rem" : "0",
                fontWeight: props.streak >= 1 ? "bold" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  props.streak >= 1
                    ? colors.habitPalette[
                        props.index % colors.habitPalette.length
                      ]
                    : "white",
              }}
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
