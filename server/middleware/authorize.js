const authorize = (req, res, next) => {
  if (req.user) {
    console.log("middleware going");
    next();
  } else {
    res.send("Unauthorized");
  }
};

module.exports = { authorize };
