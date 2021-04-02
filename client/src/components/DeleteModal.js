import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const DeleteModal = (props) => {
  let deleteHabit = () => {
    props.delete();
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
          <h2>Confirm Delete</h2>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          <p>Are you sure you want to delete this habit?</p>
          <button className="deleteBtn" onClick={deleteHabit}>
            Delete
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteModal;
