if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var path = require("path");
var cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var passport = require("passport");
var MongoStore = require("connect-mongo");
var session = require("express-session")({
  name: "sessionId",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGODB_URI,
  }),
});

var app = express();
//needs to be above passport.session()
app.use(session);
//initialize passport, allows passport to maintain persistent sessions
//needs to be used before "routes/auth.js" is called in this file
app.use(passport.initialize());
app.use(passport.session());
//goes to dist for css/js files that index.html requires
app.use(express.static(path.resolve(__dirname, "../dist")));

app.use("/logo.png", express.static(path.join(__dirname, "client/public")));

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"));

app.use(require("./routes/auth.js"));
app.use(require("./routes/habit.js"));
app.use(require("./routes/note.js"));
app.use(require("./routes/cell.js"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log("Listening at " + port);
});
