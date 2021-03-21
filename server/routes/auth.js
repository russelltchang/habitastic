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

//start express session here...can you "next" to login route?
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

// //passport by default takes req.body.username and req.body.password to use in verify function
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send("No User Exists");
    } else {
      //req.logIn calls passport.serializeUser()
      req.logIn(user, (err) => {
        if (err) throw err;
        //according to express-session docs, since Passport saves to req.session.passport user, the session is modified and saved
        console.log(req.user); //entire user object
        console.log(req.session.passport.user); //username
        // user object is added to the req object and accessible as user or req.user
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
    //removes serialized user from session in the DB.  Necessary if we're gonna delete whole thing?
    req.logout();
    //deletes session from DB
    req.session.destroy((err) => {
      //need res.send to delete client cookie, can't res.redirect after AJAX
      res.clearCookie("connect.sid").send("Logged Out");
    });
  } else {
    res.send("No user to log out");
  }
});

module.exports = router;
