const jwt = require("jsonwebtoken");

//Checks protected routes for jwt auth token, place on any protected route as middleware.
module.exports = function (req, res, next) {
  const token = req.header("dukes_cookie");
  const jwtSecret = process.env.JWT_SECRET;
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  //If there is a token, verify it.
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Token is not valid");
  }
};
