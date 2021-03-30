import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const Modal = (props) => {
  let [newHabit, setNewHabit] = useState("");
  let [habitToEdit, setHabitToEdit] = useState("");

  useEffect(() => {
    setHabitToEdit(props.habit);
  }, [props.editMode]);

  let editHabit = () => {
    if (habitToEdit.length > 0) {
      props.editHabit(habitToEdit, props.id);
    }
  };

  //Table actually has access to habitID, don't need to pass down to Modal
  let deleteHabit = () => {
    props.deleteHabit(props.id);
  };

  let submitNewHabit = (newHabit) => {
    if (newHabit.length > 0) {
      props.addHabit(newHabit);
    }
  };

  return (
    <>
      <Dialog
        className="dialog"
        onClose={props.close}
        open={props.open}
        transitionDuration={0}
      >
        <div className="titleContainer">
          <DialogTitle>
            {props.editMode ? "Edit Habit" : "New Habit"}
          </DialogTitle>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          {props.editMode ? (
            <>
              <input
                className="habitInput"
                value={habitToEdit}
                type="text"
                onChange={(e) => setHabitToEdit(e.target.value)}
              ></input>
              <button className="addHabitBtn" onClick={deleteHabit}>
                Delete Habit
              </button>
              <button className="addHabitBtn" onClick={editHabit}>
                Edit Habit
              </button>
            </>
          ) : (
            <>
              <input
                className="habitInput"
                type="text"
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Eat veggies"
              ></input>
              <button
                className="addHabitBtn"
                onClick={() => submitNewHabit(newHabit)}
              >
                Add Habit
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
