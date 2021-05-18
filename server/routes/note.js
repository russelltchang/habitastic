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
      res.send(result.notes);
    }
  });
});

router.post("/add", authorize, (req, res) => {
  let noteTodayExists = false;
  let today = new Date(Date.now()).toLocaleString().split(",")[0];
  User.find({ username: req.user.username }, (err, result) => {
    for (let i = 0; i < result[0].notes.length; i++) {
      if (result[0].notes[i].date === today) {
        noteTodayExists = true;
      }
    }
    if (result[0].isPremium || (!result[0].isPremium && !noteTodayExists)) {
      result[0].notes.push({
        id: req.body.id,
        date: req.body.date,
        note: req.body.note,
      });
      result[0].save();
      res.send(result[0].notes);
    }
  });
});

router.put("/edit", authorize, (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user, "notes.id": req.body.id },
    {
      "notes.$.note": req.body.note,
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.notes);
      }
    }
  );
});

router.put("/delete", authorize, (req, res) => {
  User.findOneAndUpdate(
    { username: req.session.passport.user },
    { $pull: { notes: { id: req.body.id } } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result.notes);
      }
    }
  );
});

module.exports = router;
