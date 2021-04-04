import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const SubscribeModal = (props) => {
  return (
    <>
      <Dialog
        className="dialog"
        onClose={props.close}
        open={props.open}
        transitionDuration={0}
      >
        <div className="titleContainer">
          <h2>Limit reached!</h2>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          <p>You've reached your max number of habits!</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeModal;
