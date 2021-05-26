import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";

const DeleteAccountModal = (props) => {
  localStorage.clear();

  let deleteAccount = () => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/delete-account"
        : "/delete-account";

    axios.delete(url).then((res) => {
      props.onLogout();
    });
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
          <p>Are you sure you want to delete your account?</p>
          <button className="deleteAccountBtn" onClick={deleteAccount}>
            Delete
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteAccountModal;
