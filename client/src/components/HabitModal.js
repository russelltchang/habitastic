import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const HabitModal = (props) => {
  let [newHabit, setNewHabit] = useState("");
  let [modalOpen, setModalOpen] = useState(false);

  let handleOpen = () => {
    setModalOpen(true);
  };

  let handleClose = () => {
    setModalOpen(false);
  };

  let submitNewHabit = () => {
    //is this anti pattern.  add Habit, and setstate
    if (newHabit.length > 0) {
      props.addHabit(newHabit);
      setModalOpen(false);
    }
  };

  return (
    <>
      <button id="openModalBtn" onClick={handleOpen}>
        Add Habit
      </button>
      <Dialog onClose={handleClose} open={modalOpen}>
        <DialogTitle>New Habit</DialogTitle>
        <DialogContent dividers>
          <input
            id="habitInput"
            type="text"
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Eat veggies"
          ></input>
        </DialogContent>
        <DialogActions>
          <button id="addHabitBtn" onClick={() => submitNewHabit(newHabit)}>
            Add Habit
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HabitModal;
