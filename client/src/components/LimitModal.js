import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SubscribeModal from "./SubscribeModal";

const LimitModal = (props) => {
  let [subModal, setSubModal] = useState(false);

  let handleApprove = () => {
    props.handleApprove();
  };

  let openSubModal = () => {
    setSubModal(true);
    props.close();
  };

  let closeSubModal = () => {
    setSubModal(false);
    props.close();
  };

  return (
    <>
      <Dialog
        className="dialog"
        open={props.open}
        onClose={props.close}
        transitionDuration={0}
      >
        <div className="titleContainer">
          <h2>Limit reached!</h2>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          {props.fromNotes ? (
            <p>You've reached your max number of new notes for today!</p>
          ) : (
            <p>You've reached your max number of habits!</p>
          )}
          <button className="subscribeBtn" onClick={openSubModal}>
            Upgrade
          </button>
        </DialogContent>
      </Dialog>
      <SubscribeModal
        open={subModal}
        close={closeSubModal}
        handleApprove={handleApprove}
      />
    </>
  );
};

export default LimitModal;
