import React, { useState, useEffect } from "react";
import { dateArray } from "../utils/dateArray";
import Dates from "./Dates";
import Habits from "./Habits";
import Modal from "./Modal";

const Table = (props) => {
  let [dateInfo, setDateInfo] = useState({
    startIndex: 0,
    endIndex: 0,
    dates: [],
  });
  let [modalOpen, setModalOpen] = useState(false);
  let [modalEdit, setModalEdit] = useState(false);
  let [habitID, setHabitID] = useState("");
  let [habitToEdit, setHabitToEdit] = useState("");

  useEffect(() => {
    setDateInfo({
      dates: dateArray(),
      endIndex: dateArray().length,
      startIndex: dateArray().length - 14,
    });
  }, []);

  let handleOpen = () => {
    setModalOpen(true);
  };

  let handleEditOpen = (habitID, habitName) => {
    setHabitToEdit(habitName);
    setHabitID(habitID);
    setModalEdit(true);
    setModalOpen(true);
  };

  let handleClose = () => {
    setModalOpen(false);
    setModalEdit(false);
  };

  let handleAddHabit = (newHabit) => {
    props.addHabit(newHabit);
    setModalOpen(false);
  };

  let handleEditHabit = (habitName, habitID) => {
    props.editHabit(habitName, habitID);
    handleClose();
  };

  let handleDeleteHabit = (habitID) => {
    props.deleteHabit(habitID);
    handleClose();
  };

  let handleMarkHabit = (habits) => {
    props.markHabit(habits);
  };

  let handleLeftClick = () => {
    //setState if index doesn't go past zero
    //could be missing dates here, if -2 works or -3, it won't change index
    if (dateInfo.startIndex - 14 >= 0) {
      setDateInfo({
        ...dateInfo,
        startIndex: dateInfo.startIndex - 14,
        endIndex: dateInfo.endIndex - 14,
      });
    }
  };

  let handleRightClick = () => {
    if (dateInfo.endIndex + 14 <= dateInfo.dates.length) {
      setDateInfo({
        ...dateInfo,
        startIndex: dateInfo.startIndex + 14,
        endIndex: dateInfo.endIndex + 14,
      });
    }
  };

  return (
    <div style={{ display: "inline - block" }}>
      <i
        style={{ float: "left" }}
        className="fa fa-angle-left fa-2x"
        onClick={handleLeftClick}
      ></i>
      <i
        style={{ float: "right" }}
        className="fa fa-angle-right fa-2x"
        onClick={handleRightClick}
      ></i>
      <table>
        <tbody>
          <Dates
            dates={dateInfo.dates}
            start={dateInfo.startIndex}
            end={dateInfo.endIndex}
          />
          <Habits
            handleMark={handleMarkHabit}
            habits={props.habits}
            dates={dateInfo.dates}
            start={dateInfo.startIndex}
            end={dateInfo.endIndex}
            edit={handleEditOpen}
          />
          <tr>
            <th id="newHabitCell" onClick={handleOpen}>
              <i className="fa fa-plus"></i>
              <span> New Habit</span>
            </th>
          </tr>
          <Modal
            id={habitID}
            habit={habitToEdit}
            editMode={modalEdit}
            open={modalOpen}
            addHabit={handleAddHabit}
            editHabit={handleEditHabit}
            deleteHabit={handleDeleteHabit}
            close={handleClose}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
