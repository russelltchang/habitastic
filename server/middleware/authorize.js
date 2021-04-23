const authorize = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.send("Unauthorized");
  }
};

module.exports = { authorize };
