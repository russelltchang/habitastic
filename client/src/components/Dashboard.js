import React, { useState, useEffect } from "react";
import HabitTable from "./HabitTable";
import HabitModal from "./HabitModal";
import axios from "axios";

const Dashboard = () => {
  let [habits, setHabits] = useState([]);

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

  let handleAddHabit = (newHabit) => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_ADD_HABIT
        : process.env.PRO_API_ADD_HABIT;

    axios.post(url, { newhabit: newHabit }).then((res) => {
      if (res.data) {
        setHabits([...habits, newHabit]);
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
          <HabitModal addHabit={handleAddHabit} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
