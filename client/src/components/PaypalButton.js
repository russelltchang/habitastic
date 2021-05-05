import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import scriptLoader from "react-async-script-loader";
import CircularProgress from "@material-ui/core/CircularProgress";

// Mern-App-Test Sandbox App, Client ID
const CLIENT = {
  sandbox:
    "ATf-ZbLJCuDPxXkxEDFAiOZH5HZZfDxPQi82IaNUb9aLrIBne8t61JSKUgkxwgyT4ag19eNxHKvlX3h8",
  //do not put here.  How to access in heroku without .env?
  production: "your_production_key",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let orderID = null;

//create button here
let PayPalButton = null;

const PaypalButton = (props) => {
  let [showButtons, setShowButtons] = useState(false);
  let [loading, setLoading] = useState(true);
  let [paid, setPaid] = useState(false);

  useEffect(() => {
    const { isScriptLoaded, isScriptLoadSucceed } = props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      setLoading(false);
      setShowButtons(true);
    }
  }, []);

  useEffect(
    () => {
      const scriptJustLoaded = !showButtons && props.isScriptLoaded;
      if (scriptJustLoaded) {
        if (props.isScriptLoadSucceed) {
          PayPalButton = window.paypal.Buttons.driver("react", {
            React,
            ReactDOM,
          });
          setLoading(false);
          setShowButtons(true);
        }
      }
    },
    [props.isScriptLoaded],
    [props.isScriptLoadSucceed]
  );

  // let createOrder = (data, actions) => {
  //   let url =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000/create-order"
  //       : "/create-order";

  //   //return this
  //   return axios.post(url).then((res) => {
  //     return res.data.orderID;
  //   });
  // };

  // let onApprove = (data, actions) => {
  //   let url =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000/approve-order"
  //       : "/approve-order";

  //   return axios.post(url, { orderID: data.orderID }).then((res) => {
  //     setShowButtons(false);
  //     setPaid(true);
  //   });
  // };

  let createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-7M997475S9749214FMCIH2BY",
    });
  };

  let onApprove = (data, actions) => {
    return actions.subscription.get(data.subscriptionID).then((details) => {
      console.log(details);
    });

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/subscribe"
        : "/subscribe";

    axios.post(url, { subscriptionID: data.subscriptionID }).then((res) => {
      console.log(data.subscriptionID);
      setShowButtons(false);
      setPaid(true);
    });
  };

  return (
    <div>
      {loading && <CircularProgress />}

      {showButtons && (
        <div>
          <div>
            <h2>Items: Habitastic Subscription</h2>
            <h2>Total checkout Amount $1.99</h2>
          </div>

          <PayPalButton
            createSubscription={createSubscription}
            onApprove={onApprove}
          />
        </div>
      )}

      {paid && (
        <div>
          <h2>Congrats! You are now a premium member!</h2>
        </div>
      )}
    </div>
  );
};

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&disable-funding=credit&vault=true&intent=subscription`
)(PaypalButton);
