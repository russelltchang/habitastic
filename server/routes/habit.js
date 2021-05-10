var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var { authorize } = require("../middleware/authorize");
const User = require("../models/User");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", authorize, (req, res) => {
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    } else {
      res.send(result);
    }
  });
});

router.post("/add", authorize, (req, res) => {
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    }
    if (result.isPremium || result.habits.length < 3) {
      User.findOneAndUpdate(
        //find with req.session or axios data?
        { username: req.session.passport.user },
        {
          $push: {
            habits: {
              id: req.body.id,
              habit: req.body.habit,
              dates: req.body.dates,
            },
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
    }
  });
});

router.put("/edit", authorize, (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user, "habits.id": req.body.id },
    { "habits.$.habit": req.body.habit },
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

router.put("/delete", authorize, (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user },
    { $pull: { habits: { id: req.body.id } } },
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
