import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PaypalButton from "./PaypalButton";

const SubscribeModal = (props) => {
  let [paymentView, setPaymentView] = useState(false);

  let handleApprove = () => {
    props.handleApprove();
  };

  let handlePaymentView = () => {
    setPaymentView(true);
  };

  let closePaymentView = () => {
    setPaymentView(false);
    props.close();
  };

  return (
    <>
      {!paymentView ? (
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
              {props.fromNotes ? (
                <p>You've reached your max number of new notes for today!</p>
              ) : (
                <p>You've reached your max number of habits!</p>
              )}
              <button className="subscribeBtn" onClick={handlePaymentView}>
                Upgrade
              </button>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            className="subscribe-dialog"
            onClose={closePaymentView}
            open={paymentView}
            transitionDuration={0}
          >
            <div className="titleContainer">
              <h2>Upgrade for unlimited habits</h2>
              <i className="fa fa-times fa-1x" onClick={closePaymentView}></i>
            </div>
            <DialogContent dividers>
              <PaypalButton handleApprove={handleApprove} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default SubscribeModal;
