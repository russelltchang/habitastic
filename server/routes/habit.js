var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/habit", (req, res) => {
  res.send("Habit added in route");
});

module.exports = router;
