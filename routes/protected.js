const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyToken");

//pulls in verification middleware to test for valid jwt.
router.get("/", verify, (req, res) => {
  res.json(req.user);
  //User.findbyOne({_id: req.user._id})
});
module.exports = router;
