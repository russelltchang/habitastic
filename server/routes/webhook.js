var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.post("/webhook-subscribe", (req, res) => {
  User.findOneAndUpdate(
    { subscriptionID: req.body.resource.id },
    {
      $set: {
        premiumEnd: new Date(
          req.body.resource.billing_info.next_billing_time
        ).toLocaleDateString(),
        isPremium: true,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).end(); // Responding is important
      }
    }
  );
});

router.post("/webhook-renew", (req, res) => {
  User.findOneAndUpdate(
    { subscriptionID: req.body.resource.id },
    {
      $set: {
        premiumEnd: new Date(
          req.body.resource.billing_info.next_billing_time
        ).toLocaleDateString(),
        isPremium: true,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).end(); // Responding is important
      }
    }
  );
});

//how update localStorage?
router.post("/webhook-expire", (req, res) => {
  User.find({ subscriptionID: req.body.resource.id }, (err, user) => {
    //defining the variable auto splices & updates habits, see MDN docs
    let archive = user[0].habits.splice(3);
    user[0].archive = archive;
    user[0].isPremium = false;
    user[0].save();
    var socket = req.app.get("socketio");
    socket.emit("hello", user[0].habits);
    res.status(200).end();
  });
});

module.exports = router;
