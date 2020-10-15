const router = require("express").Router();
const User = require("../models/User");
const Joi = require("@hapi/joi");
const { regValidation, loginValidation } = require("../validation");

/// Made async, node gets client request and needs to connect to send data to the DB server and get a reply
/////Why was the freaking trailing slash needed?????
router.post("/register/", async (req, res) => {
  ///Validates the request from the client, takes in what to validate (the req body should be an object with the name, email, and password) and what Joi schema to use for validation (we called it schema), returns an object. The
  const { error } = regValidation(req.body);

  /// if there is a validation error, Joi returns an error object/ Return "400" bad request if so along with the error message and breaks out of the route
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  /// If there is no erreor, take the data from the post request that the client sent and put it into a new Mongoose User Schema. POST request JSON is already parsed by middleware in the server.js file.

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //// Tries to save the new user object to the DB, .save() is a mongoose method. If able to save, sends the saved user back to the client just so we can see for testing.
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post('/login', (req, res) => {

// })

module.exports = router;
