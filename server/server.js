var express = require("express");
var path = require("path");
var cors = require("cors");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var passport = require("passport");
var MongoStore = require("connect-mongo");
//use dotenv variable here, change to atlas on production
var session = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: "mongodb://localhost:27017/project",
  }),
});

var app = express();
//needs to be above passport.session()
app.use(session);
//initialize passport, allows passport to maintain persistent sessions
//needs to be used before "routes/auth.js" is called in this file
app.use(passport.initialize());
app.use(passport.session());
//goes to dist for css/jss files that index.html requires
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//change to Atlas URL on production
mongoose
  .connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"));

app.use(require("./routes/auth.js"));
app.use(require("./routes/habit.js"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log("Listening at " + port);
});
