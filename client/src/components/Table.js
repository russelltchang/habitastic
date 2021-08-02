import React, { useState, useEffect } from "react";
import { dateArray } from "../utils/dateArray";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Dates from "./Dates";
import Habits from "./Habits";
import Modal from "./Modal";
import LimitModal from "./LimitModal";
import axios from "axios";

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

  let onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/habits/reorder"
        : "/habits/reorder";

    let data = {
      sourceIndex: source.index,
      destinationIndex: destination.index,
    };

    axios.post(url, data).then((res) => {
      if (res.data) {
        props.handleDrop(source.index, destination.index);
      }
    });
  };

  return (
    <>
      <div id="tableContainer">
        <DragDropContext onDragEnd={onDragEnd}>
          <table>
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
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
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
      <div id="newHabitWrapper">
        <button id="newHabitBtn" onClick={handleOpen}>
          Add Habit
        </button>
      </div>
    </>
  );
};

export default Table;
