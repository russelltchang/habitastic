const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  username: { type: String, lowercase: true, trim: true },
  password: { type: String, trim: true },
  habits: { type: Array },
  archive: { type: Array },
  notes: { type: Array },
  isPremium: { type: Boolean, default: false },
  premiumEnd: { type: String, default: "" },
  subscriptionID: { type: String, trim: true, default: "" },
});

//this adds salt and hash field to schema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
