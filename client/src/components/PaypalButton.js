import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import scriptLoader from "react-async-script-loader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format } from "date-fns";

const CLIENT = {
  sandbox: process.env.SANDBOX_CLIENT_ID,
  production: process.env.PROD_CLIENT_ID,
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PLAN_ID = {
  monthly:
    process.env.NODE_ENV === "production"
      ? "P-88T93611VX4689934MCRNJII"
      : "P-7M997475S9749214FMCIH2BY",
  annual:
    process.env.NODE_ENV === "production"
      ? "P-2EP33747C2010350GMCRNKQI"
      : "P-1GH247053G464620YMCKCXKQ",
};

//create button here
let PayPalButton = null;

const PaypalButton = (props) => {
  let [showButtons, setShowButtons] = useState(false);
  let [loading, setLoading] = useState(true);
  let [paid, setPaid] = useState(false);
  let [planID, setPlanID] = useState(PLAN_ID.annual);
  let [price, setPrice] = useState("20.00");
  let [timeInterval, setTimeInterval] = useState("year");
  let [error, setError] = useState(false);

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

  let handleOptionClick = (e) => {
    if (
      e.currentTarget.id === "monthlyOption" ||
      e.currentTarget.id === "monthlyOption-active"
    ) {
      setPlanID(PLAN_ID.monthly);
      setPrice("2.50");
      setTimeInterval("month");
    } else {
      setPlanID(PLAN_ID.annual);
      setPrice("20.00");
      setTimeInterval("year");
    }
  };

  let createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: planID,
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  let onApprove = (data, actions) => {
    actions.subscription.get(data.subscriptionID).then((details) => {
      let data = {
        subscriptionID: details.id,
        premiumEnd: format(
          new Date(details.billing_info.next_billing_time),
          "M/d/yyyy"
        ),
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

  let onError = () => {
    setError(true);
    setShowButtons(false);
    props.handleError();
  };

  return (
    <div>
      <div id="loading">{loading && <CircularProgress />}</div>

      {showButtons && (
        <div>
          <div id="limitedOffer">
            Hurry, get 20% off the annual plan for a limited time only!
          </div>

          <div id="options">
            <div
              id={price === "2.50" ? "monthlyOption-active" : "monthlyOption"}
              onClick={handleOptionClick}
            >
              <div>
                <div>
                  <b>Monthly Plan</b>
                </div>
                <div className="desc">Unlimited habits and notes</div>
                <div>
                  <span className="price">$2.50</span>
                </div>
              </div>
            </div>

            <div
              id={price === "20.00" ? "annualOption-active" : "annualOption"}
              onClick={handleOptionClick}
            >
              <div>
                <div>
                  <b>Annual Plan</b>
                </div>
                <div className="desc">Unlimited habits and notes</div>
                <div id="annualPricing">
                  <span className="prevPrice">$25</span>
                  <span className="price">$20</span>
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
            onError={onError}
          />
        </div>
      )}

      {paid && (
        <div id="paymentSuccessMsg">
          <div>
            <i className="fa fa-check-circle-o" aria-hidden="true"></i>
          </div>
          <div>
            <h2>Congrats, you are now a premium member!</h2>
          </div>
        </div>
      )}

      {error && (
        <div id="paymentErrorMsg">
          <div>
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
          </div>
          <div>
            <h2>There was an error processing payment, please try again!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&disable-funding=credit&vault=true&intent=subscription`
)(PaypalButton);
