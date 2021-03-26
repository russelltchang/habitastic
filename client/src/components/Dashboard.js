import React, { useState, useEffect } from "react";
import HabitTable from "./HabitTable";
import HabitModal from "./HabitModal";
import axios from "axios";

const Dashboard = (props) => {
  let [habits, setHabits] = useState([]);

  let handleAddHabit = (newHabit) => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_HABIT
        : process.env.PRO_API_HABIT;

    axios.post(url, newHabit).then((res) => {
      setHabits([...habits, newHabit]);
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
