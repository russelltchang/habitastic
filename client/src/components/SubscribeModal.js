import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PaypalButton from "./PaypalButton";

const SubscribeModal = (props) => {
  let [approved, setApproved] = useState(false);
  let [error, setError] = useState(false);

  let handleApprove = () => {
    setApproved(true);
    props.handleApprove();
  };

  let handleError = () => {
    setError(true);
  };

  return (
    <>
      <Dialog
        className="subscribe-dialog"
        open={props.open}
        onClose={props.close}
        transitionDuration={0}
      >
        <div className="titleContainer">
          {approved || error ? (
            <span></span>
          ) : (
            <div>
              <h2>Upgrade to Premium</h2>
              <p>Get unlimited habits, unlimited notes, and priority support</p>
            </div>
          )}
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>
        <DialogContent dividers>
          <PaypalButton
            handleApprove={handleApprove}
            handleError={handleError}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeModal;
