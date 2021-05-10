if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var { authorize } = require("../middleware/authorize");
const User = require("../models/User");
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var paypal = require("@paypal/checkout-server-sdk");

// Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
// PayPal HTTP client dependency
const payPalClient = require("../config/paypal-config.js");

router.post("/subscribe", authorize, async (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user },
    {
      $set: {
        subscriptionID: req.body.subscriptionID,
        premiumEnd: req.body.premiumEnd,
        isPremium: true,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({});
      }
    }
  );
});

//one time order
router.post("/create-order", authorize, async (req, res) => {
  // 1. Call PayPal to set up a transaction
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    application_context: {
      shipping_preference: "NO_SHIPPING",
    },
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "1.99",
        },
      },
    ],
  });

  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {
    // 2. Handle any errors from the call
    console.error(err);
    console.log("sending error");
    return res.send(500);
  }

  // 3. Return a successful response to the client with the order ID
  res.status(200).json({
    orderID: order.result.id,
  });
});

//one time order
router.post("/approve-order", authorize, async (req, res) => {
  // 1. Get the order ID from the request body
  const orderID = req.body.orderID;

  // 2. Call PayPal to capture the order
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await payPalClient.client().execute(request);

    // 3. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
    const captureID = capture.result.purchase_units[0].payments.captures[0].id;
    // await database.saveCaptureID(captureID);
  } catch (err) {
    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 5. Return a successful response to the client
  res.send(200);
});

module.exports = router;
