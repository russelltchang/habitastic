import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const Dashboard = (props) => {
  let [modalOpen, setModalOpen] = useState(false);
  let [newHabit, setNewHabit] = useState("");
  let [habits, setHabits] = useState([]);

  //useEffect to retrieve data from LocalStorage if possible, if not, then DB
  //componentwillunmount rehydrate localStorage, incase client deleted them

  let handleOpen = () => {
    setModalOpen(true);
  };

  let handleClose = () => {
    setModalOpen(false);
  };

  //this needs to also save to DB or LocalStorage.
  let submitNewHabit = () => {
    // let url =
    //   process.env.NODE_ENV === "development"
    //     ? process.env.DEV_API_HABIT
    //     : process.env.PRO_API_HABIT;
    setHabits([...habits, newHabit]);
    setModalOpen(false);
  };

  return (
    <>
      {habits.length > 0 ? (
        <Table habits={habits} />
      ) : (
        <div id="noHabitMsg">
          <h1>Oops! Looks like you aren't tracking any habits yet.</h1>
          <button onClick={handleOpen}>Add Habit</button>
          <Dialog onClose={handleClose} open={modalOpen}>
            <DialogTitle>New Habit</DialogTitle>
            <DialogContent dividers>
              <input
                id="newHabitInput"
                type="text"
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Eat veggies"
              ></input>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={submitNewHabit}
                color="primary"
              >
                Add Habit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Dashboard;
