import React, { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const Modal = (props) => {
  let [newHabit, setNewHabit] = useState("");
  let [habitToEdit, setHabitToEdit] = useState("");
  let [deleteModal, setDeleteModal] = useState(false);
  let [errorMsg, setErrorMsg] = useState(false);

  //modal doesn't unmount on close, so this is needed
  useEffect(() => {
    setNewHabit("");
    setErrorMsg(false);
  }, [props.open]);

  useEffect(() => {
    setErrorMsg(false);
    setHabitToEdit(props.habit);
  }, [props.editMode]);

  let handleKeyPress = (e) => {
    if (e.key === "Enter" && props.editMode) {
      editHabit();
    }
    if (e.key === "Enter" && !props.editMode) {
      submitNewHabit(newHabit);
    }
  };

  let submitNewHabit = (newHabit) => {
    if (newHabit.length > 0) {
      props.addHabit(newHabit.trim());
    } else {
      setErrorMsg(true);
    }
  };

  let editHabit = () => {
    if (habitToEdit.length > 0) {
      props.editHabit(habitToEdit.trim(), props.id);
    } else {
      setErrorMsg(true);
    }
  };

  let deleteHabit = () => {
    setDeleteModal(false);
    props.deleteHabit(props.id);
  };

  let openDeleteModal = () => {
    props.close();
    setDeleteModal(true);
  };

  let closeDeleteModal = () => {
    setDeleteModal(false);
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
          <h2>{props.editMode ? "Edit Habit" : "New Habit"}</h2>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          {props.editMode ? (
            <>
              {errorMsg ? <p className="errorMsg">Please enter a habit</p> : ""}
              <input
                className="habitInput"
                value={habitToEdit}
                type="text"
                maxLength="40"
                autoFocus
                onChange={(e) => setHabitToEdit(e.target.value)}
                onKeyPress={handleKeyPress}
              ></input>
              <div className="editBtns">
                <div className="deleteContainer" onClick={openDeleteModal}>
                  <i className="fa fa-trash-o"></i>
                  <span> delete</span>
                </div>

                <button className="editBtn" onClick={editHabit}>
                  Edit Habit
                </button>
              </div>
            </>
          ) : (
            <>
              {errorMsg ? <p className="errorMsg">Please enter a habit</p> : ""}
              <input
                className="habitInput"
                type="text"
                maxLength="40"
                autoFocus
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Eat veggies"
              ></input>
              <button
                className="modalAddBtn"
                onClick={() => submitNewHabit(newHabit)}
              >
                Add Habit
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <DeleteModal
        open={deleteModal}
        delete={deleteHabit}
        close={closeDeleteModal}
      />
    </>
  );
};

export default Modal;
