import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const SubscribeModal = (props) => {
  let [paymentView, setPaymentView] = useState(false);

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
              <p>You've reached your max number of habits!</p>
              <button className="subscribeBtn" onClick={handlePaymentView}>
                Subscribe
              </button>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            className="dialog"
            onClose={closePaymentView}
            open={paymentView}
            transitionDuration={0}
          >
            <DialogContent dividers>
              <p>Subscribe now for more benefits!</p>
              <button className="payBtn">Subscribe</button>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default SubscribeModal;
