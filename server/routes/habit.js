var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add if req.user
router.get("/habits", (req, res) => {
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    } else {
      res.send(result);
    }
  });
});

router.get("/count", (req, res) => {
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    } else {
      res.send({ count: result.habits.length });
    }
  });
});

//add if req.user
router.post("/add", (req, res) => {
  User.findOne({ username: req.user.username }, (err, result) => {
    if (err) {
      console.log("error: " + err);
    }
    if (result.habits.length < 5) {
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
            res.send(result.habits);
          }
        }
      );
    }
  });
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

router.put("/mark", (req, res) => {
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
        res.send(result.habits);
      }
    }
  );
});

router.put("/unmark", (req, res) => {
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
        //don't have to do this. just send a success msg to reduce req header size
        res.send(result.habits);
      }
    }
  );
});

module.exports = router;
