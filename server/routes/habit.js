var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add "if (req.user)" THEN execute
router.get("/habits", (req, res) => {
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    } else {
      res.send(result.habits);
    }
  });
});

//add if req.user
router.post("/add", (req, res) => {
  User.findOneAndUpdate(
    //find with req.session or axios data?
    { username: req.session.passport.user },
    { $push: { habits: { id: req.body.id, habit: req.body.habit } } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.habits);
      }
    }
  );
});

router.put("/edit", (req, res) => {
  User.findOneAndUpdate(
    //find with req.session or axios data?
    { username: req.session.passport.user, "habits.id": req.body.id },
    { "habits.$.habit": req.body.habit },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.habits);
      }
    }
  );
});

router.put("/delete", (req, res) => {
  User.findOneAndUpdate(
    //find with req.session or axios data?
    { username: req.session.passport.user },
    { $pull: { habits: { id: req.body.id } } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.habits);
      }
    }
  );
});

module.exports = router;
