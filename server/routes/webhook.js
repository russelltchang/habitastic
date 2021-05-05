var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.post("/webhook", (req, res) => {
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

module.exports = router;
