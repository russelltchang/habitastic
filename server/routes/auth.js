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

router.get("/auth", (req, res) => {
  if (req.user) {
    res.send(req.user.name);
  } else {
    res.send(false);
  }
});

router.post("/signup", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    name: req.body.name,
  });

  //this PLM method checks if above email is already registered
  User.register(newUser, req.body.password, function (err) {
    if (err) {
      res.send("User Exists");
    }
    //add new user to session
    req.logIn(newUser, (err) => {
      if (err) throw err;
      res.send({ username: newUser.username, name: newUser.name });
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send("No User Exists");
    } else {
      //req.logIn calls passport.serializeUser()
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ username: req.user.username, name: req.user.name });
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy((err) => {
      res.clearCookie("connect.sid").send("Logged Out");
    });
  } else {
    res.send("No user to log out");
  }
});

module.exports = router;
