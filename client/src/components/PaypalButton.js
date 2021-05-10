import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useEffect, useState } from "react";
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

let PLAN_ID = {
  monthly: "P-7M997475S9749214FMCIH2BY",
  annual: "P-1GH247053G464620YMCKCXKQ",
};

//create button here
let PayPalButton = null;

const PaypalButton = (props) => {
  let [showButtons, setShowButtons] = useState(false);
  let [loading, setLoading] = useState(true);
  let [paid, setPaid] = useState(false);
  let [planID, setPlanID] = useState(PLAN_ID.annual);
  let [price, setPrice] = useState("25.00");
  let [timeInterval, setTimeInterval] = useState("year");

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

  let handleOptionClick = (e) => {
    if (
      e.currentTarget.id === "monthlyOption" ||
      e.currentTarget.id === "monthlyOption-active"
    ) {
      setPlanID(PLAN_ID.monthly);
      setPrice("2.99");
      setTimeInterval("month");
    } else {
      setPlanID(PLAN_ID.annual);
      setPrice("25.00");
      setTimeInterval("year");
    }
  };

  let createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: planID,
    });
  };

  let onApprove = (data, actions) => {
    actions.subscription.get(data.subscriptionID).then((details) => {
      let data = {
        subscriptionID: details.id,
        premiumEnd: new Date(
          details.billing_info.next_billing_time
        ).toLocaleDateString(),
      };

      let url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/subscribe"
          : "/subscribe";

      axios.post(url, data).then((res) => {
        setShowButtons(false);
        setPaid(true);
        //change App.js isPremium state
        props.handleApprove();
      });
    });
  };

  return (
    <div>
      <div id="loading">{loading && <CircularProgress />}</div>

      {showButtons && (
        <div>
          <div id="options">
            <div
              id={price === "2.99" ? "monthlyOption-active" : "monthlyOption"}
              onClick={handleOptionClick}
            >
              <div>
                <div>
                  <b>Monthly Billing</b>
                </div>
                <div>
                  <span className="price">$2.99</span> / month
                </div>
              </div>
            </div>

            <div
              id={price === "25.00" ? "annualOption-active" : "annualOption"}
              onClick={handleOptionClick}
            >
              <div>
                <div>
                  <b>Annual Billing</b>
                </div>
                <div>
                  <span className="price">$25.00</span> / year
                </div>
                <div id="discount">
                  $2.08 a month -{" "}
                  <span>
                    <b style={{ color: "black" }}>save 30%!</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div id="total">
            <div>
              <span className="price">${price}</span> per {timeInterval}
            </div>
            <div id="renewMsg">
              Your plan will automatically renew. Cancel anytime.
            </div>
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
