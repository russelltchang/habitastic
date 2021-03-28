import React, { useState, useEffect } from "react";
import HabitTable from "./HabitTable";
import HabitModal from "./HabitModal";
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

    axios.post(url, { newhabit: newHabit }).then((res) => {
      if (res.data) {
        setHabits([...habits, newHabit]);
        setModalOpen(false);
      }
    });
  };

  return (
    <>
      {habits.length > 0 ? (
        <HabitTable habits={habits} />
      ) : (
        <div id="noHabitMsg">
          <h1>Oops! Looks like you aren't tracking any habits yet.</h1>
          <button id="openModalBtn" onClick={handleOpen}>
            Add Habit
          </button>
          <HabitModal
            status={modalOpen}
            addHabit={handleAddHabit}
            close={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
