const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { regValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");

/// Made async, node gets client request and needs to connect to send data to the DB server and get a reply
/////Why was the freaking trailing slash needed?????
router.post("/register/", async (req, res) => {
  ///Validates the request from the client, takes in what to validate (the req body should be an object with the name, email, and password) and what Joi schema to use for validation (we called it schema), returns an object. The
  const { error } = regValidation(req.body);

  /// if there is a validation error, Joi returns an error object/ Return "400" bad request if so along with the error message and breaks out of the route
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  ////Check to see if the user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  ///If no errors, and user not already registered, hash password! Salt first
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  /// Call Mongoose Schema and create user, req.body for email and name, hashedpasword for the password

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //// Tries to save the new user object to the DB, .save() is a mongoose method. If able to save, sends the saved user back to the client just so we can see for testing.
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN

router.post("/login/", async (req, res) => {
  const { errors } = loginValidation(req.body);
  if (errors) {
    return res.status(400).send(error.details[0].message);
  }

  const userExists = await User.findOne({ email: req.body.email });

  if (!userExists) {
    return res.status(400).send("User not registered");
  }

  const compare = await bcrypt.compare(req.body.password, userExists.password);
  console.log(compare);
  if (!compare) {
    return res.status(400).send("Password does not match");
  }
  if (compare) {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: userExists._id }, jwtSecret);
    res.header("dukes_cookie", token);
    res.cookie("dukes_cookie", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { token } });
    r;
  }
});

module.exports = router;
