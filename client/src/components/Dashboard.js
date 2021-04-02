import React, { useState, useEffect } from "react";
import Table from "./Table";
import Modal from "./Modal";
import axios from "axios";

const Dashboard = () => {
  let [habits, setHabits] = useState([]);
  let [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_GET_HABITS
        : process.env.PRO_API_GET_HABITS;

    axios.get(url).then((res) => {
      if (res.data) {
        setHabits(res.data);
      }
    });
    // return () => localStorage.setItem("storage", habits);
  }, []);

  let handleOpen = () => {
    setModalOpen(true);
  };

  let handleClose = () => {
    setModalOpen(false);
  };

  let handleAddHabit = (newHabit) => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_ADD_HABIT
        : process.env.PRO_API_ADD_HABIT;

    let data = { habit: newHabit, id: Date.now().toString(), dates: [] };

    axios.post(url, data).then((res) => {
      if (res.data) {
        setHabits(res.data);
        setModalOpen(false);
      }
    });
  };

  let handleEditHabit = (habitName, habitID) => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_EDIT_HABIT
        : process.env.PRO_API_EDIT_HABIT;

    let data = { habit: habitName, id: habitID };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setHabits(res.data);
      }
    });
  };

  let handleDeleteHabit = (habitID) => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_DELETE_HABIT
        : process.env.PRO_API_DELETE_HABIT;

    let data = { id: habitID };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setHabits(res.data);
      }
    });
  };

  let handleMarkHabit = (habits) => {
    setHabits(habits);
  };

  return (
    <>
      {habits.length > 0 ? (
        <Table
          habits={habits}
          markHabit={handleMarkHabit}
          addHabit={handleAddHabit}
          editHabit={handleEditHabit}
          deleteHabit={handleDeleteHabit}
        />
      ) : (
        <div id="noHabitMsg">
          <h1>Oops! Looks like you aren't tracking any habits yet.</h1>
          <button id="openModalBtn" onClick={handleOpen}>
            Add Habit
          </button>
          <Modal
            open={modalOpen}
            addHabit={handleAddHabit}
            close={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
