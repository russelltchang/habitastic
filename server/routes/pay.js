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

module.exports = router;
