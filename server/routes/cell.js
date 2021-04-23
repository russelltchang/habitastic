var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var { authorize } = require("../middleware/authorize");
const User = require("../models/User");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.put("/mark", authorize, (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user, "habits.id": req.body.id },
    {
      $push: {
        "habits.$.dates": req.body.date,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("marked");
      }
    }
  );
});

router.put("/unmark", authorize, (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user, "habits.id": req.body.id },
    {
      $pull: {
        "habits.$.dates": req.body.date,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("unmarked");
      }
    }
  );
});

module.exports = router;
