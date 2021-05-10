import axios from "axios";
import React, { useState, useEffect } from "react";
import { dateArray } from "../utils/dateArray";
import Dates from "./Dates";
import Habits from "./Habits";
import Modal from "./Modal";

import SubscribeModal from "./SubscribeModal";

const Table = (props) => {
  let [dateInfo, setDateInfo] = useState({
    startIndex: 0,
    endIndex: 0,
    dates: [],
  });
  let [modalOpen, setModalOpen] = useState(false);
  let [modalEdit, setModalEdit] = useState(false);
  let [modalSubscribe, setModalSubscribe] = useState(false);
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
    //the 2nd IF condition is premium member had 3+ habits, but expired
    if (props.isPremium || (!props.isPremium && props.habits.length < 3)) {
      setModalOpen(true);
    } else {
      setModalSubscribe(true);
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
    setModalSubscribe(false);
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
          <SubscribeModal
            open={modalSubscribe}
            close={handleClose}
            handleApprove={handleApprove}
          />
        </tbody>
      </table>
      <div id="newHabitWrapper">
        <button id="newHabitBtn" onClick={handleOpen}>
          <i className="fa fa-plus"></i>
          <span>New Habit</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
