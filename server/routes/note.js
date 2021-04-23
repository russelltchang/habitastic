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
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    }
    User.findOneAndUpdate(
      { username: req.session.passport.user },
      {
        $push: {
          notes: {
            id: req.body.id,
            date: req.body.date,
            note: req.body.note,
          },
        },
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
