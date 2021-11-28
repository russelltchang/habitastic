var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var { authorize } = require("../middleware/authorize");

//import User model
const User = require("../models/User");

// PLM -> sets up LocalStrategy with correct options (using email as username field)
passport.use(User.createStrategy());
// authenticated user must remain serialized to the session, & deserialized after each request
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/pw-reset", (req, res) => {
  if (req.user) {
    User.findOne({ username: req.user.username }, (err, result) => {
      if (err) {
        console.log("error: " + err);
      } else {
        res.send({ isPremium: result.isPremium, username: req.user.username });
      }
    });
  } else {
    res.send("Unauthorized");
  }
});

router.post("/change-password", authorize, (req, res) => {
  User.findByUsername(req.user.username).then(
    (user) => {
      if (user) {
        user.setPassword(req.body.password, () => {
          user.save();
          res.status(200).json({ message: "Success" });
        });
      } else {
        res.status(500).json({ message: "User does not exist" });
      }
    },
    (err) => console.log(err)
  );
});

router.post("/export-data", authorize, (req, res) => {
  User.findByUsername(req.user.username).then(
    (user) => {
      if (user) {
        res
          .status(200)
          .json({ activeHabits: user.habits, archivedHabits: user.archive });
      } else {
        res.status(500).json({ message: "User does not exist" });
      }
    },
    (err) => console.log(err)
  );
});

router.delete("/delete-account", authorize, (req, res) => {
  User.deleteOne({ username: req.user.username }, function (err, obj) {
    if (err) {
      console.log("error: " + err);
    } else {
      req.session.destroy((err) => {
        res.clearCookie("connect.sid").send("Deleted");
      });
    }
  });
});

module.exports = router;
