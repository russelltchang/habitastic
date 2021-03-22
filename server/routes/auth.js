var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//import User model
const User = require("../models/user");

// PLM -> this sets up LocalStrategy with correct options (using email as username field, etc)
passport.use(User.createStrategy());
// authenticated user must remain serialized to the session, & deserialized after each request
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//start express session here
router.post("/signup", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    name: req.body.name,
  });

  //this PLM method checks if above email is already registered
  User.register(newUser, req.body.password, function (err, user) {
    console.log(user);
    if (err) {
      console.log("Error: " + err);
    }
    res.send({ msg: "Sign up success!" });
  });
});

//authorizing incorrect pw and emails...but correctly doesn't start session for those
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    if (err) throw err;
    //this isn't sending when user is false.
    if (!user) {
      res.send("No User Exists");
    } else {
      //req.logIn calls passport.serializeUser()
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

//this works and is much less code
// router.post("/login", passport.authenticate("local"), function (req, res) {
//   console.log(req.user);
// });

router.get("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy((err) => {
      //need res.send to delete client cookie, can't res.redirect after AJAX
      res.clearCookie("connect.sid").send("Logged Out");
    });
  } else {
    res.send("No user to log out");
  }
});

module.exports = router;
