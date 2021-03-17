var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

//import User model
const User = require("../models/user");

var app = express();
//initialize express-session
app.use(session);

// PLM -> this sets up LocalStrategy with correct options (using email as username field, etc)
passport.use(User.createStrategy());
// authenticated user must remain serialized to the session, & deserialized after each request
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/signup", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    name: req.body.name,
  });

  //this PLM method checks if above email is already registered
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log("Error: " + err);
    }
    res.send({ msg: "Sign up success!" });
  });
});

//passport by default takes req.body.username and req.body.password to use in verify function
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send("No User Exists");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

module.exports = router;
