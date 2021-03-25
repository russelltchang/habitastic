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

function codingScoreReportPercent(scores) {
  console.log("running");
  var totalScores = scores.length;
  var poorCount,
    fairCount,
    goodCount,
    excellentCount,
    eliteCount = 0;
  var poorPercent, fairPercent, goodPercent, excellentPercent, elitePercent;

  for (i = 0; i < scores.length; i++) {
    if (scores[i] >= 300 && scores[i] <= 599) {
      poorCount++;
    }
    if (scores[i] >= 600 && scores[i] <= 699) {
      fairCount++;
    }
    if (scores[i] >= 700 && scores[i] <= 749) {
      goodCount++;
    }
    if (scores[i] >= 750 && scores[i] <= 799) {
      excellentCount++;
    }
    if (scores[i] >= 800) {
      eliteCount++;
    }
  }

  poorPercent = (poorCount / totalScores) * 100;
  fairPercent = (fairCount / totalScores) * 100;
  goodPercent = (goodCount / totalScores) * 100;
  excellentPercent = (excellentCount / totalScores) * 100;
  elitePercent = (eliteCount / totalScores) * 100;

  console.log(poorPercent);

  var answer = [];

  if (poorPercent > 0) {
    answer.push(`Poor: ${poorPercent}%`);
  }
  if (fairPercent > 0) {
    answer.push(`Fair: ${fairPercent}%`);
  }
  if (goodPercent > 0) {
    answer.push(`Good: ${goodPercent}%`);
  }
  if (excellentPercent > 0) {
    answer.push(`Excellent: ${excellentPercent}%`);
  }
  if (elitePercent > 0) {
    answer.push(`Elite: ${elitePercent}`);
  }
}

console.log(codingScoreReportPercent([330, 723, 730, 825]));

app.listen(port, () => {
  console.log("Listening at " + port);
});
