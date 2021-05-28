import React, { useState, useEffect } from "react";
import { dateArray } from "../utils/dateArray";
import Dates from "./Dates";
import Habits from "./Habits";
import Modal from "./Modal";
import LimitModal from "./LimitModal";

const Table = (props) => {
  let [dateInfo, setDateInfo] = useState({
    startIndex: 0,
    endIndex: 0,
    dates: [],
  });
  let [modalOpen, setModalOpen] = useState(false);
  let [modalEdit, setModalEdit] = useState(false);
  let [modalLimit, setModalLimit] = useState(false);
  let [habitID, setHabitID] = useState("");
  let [habitToEdit, setHabitToEdit] = useState("");

  useEffect(() => {
    setDateInfo({
      dates: dateArray(),
      endIndex: dateArray().length,
      startIndex: dateArray().length - 14,
    });
  }, []);

  useEffect(() => {
    props.dateChange(
      dateInfo.dates.slice(dateInfo.startIndex, dateInfo.endIndex)
    );
  }, [dateInfo.startIndex, dateInfo.endIndex]);

  let handleOpen = () => {
    if (props.isPremium || props.habits.length < 3) {
      setModalOpen(true);
    } else {
      setModalLimit(true);
    }
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
    setModalLimit(false);
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

  let handleMarkHabit = (action, id, date) => {
    props.markHabit(action, id, date);
  };

  let handleLeftClick = () => {
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

  let handleApprove = () => {
    props.handleApprove();
  };

  return (
    <>
      <div id="tableContainer">
        <table>
          <tbody>
            <Dates
              leftClick={handleLeftClick}
              rightClick={handleRightClick}
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
            <LimitModal
              open={modalLimit}
              close={handleClose}
              handleApprove={handleApprove}
            />
          </tbody>
        </table>
      </div>
      <div id="newHabitWrapper">
        <button
          id={props.habits.length > 0 ? "newHabitBtn" : "firstHabitBtn"}
          onClick={handleOpen}
        >
          <span>
            {props.habits.length > 0 ? "Add Habit" : "Add First Habit"}
          </span>
        </button>
      </div>
    </>
  );
};

export default Table;
