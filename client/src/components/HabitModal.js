import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const HabitModal = (props) => {
  let [newHabit, setNewHabit] = useState("");

  let submitNewHabit = () => {
    if (newHabit.length > 0) {
      props.addHabit(newHabit);
    }
  };

  return (
    <>
      <Dialog
        id="dialog"
        onClose={props.close}
        open={props.status}
        transitionDuration={0}
      >
        <div id="titleContainer">
          <DialogTitle>New Habit</DialogTitle>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          <input
            id="habitInput"
            type="text"
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Eat veggies"
          ></input>
          <button id="addHabitBtn" onClick={() => submitNewHabit(newHabit)}>
            Add Habit
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HabitModal;
