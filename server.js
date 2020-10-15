const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

////Mongooooooose
mongoose.connect(
  process.env.MONGO,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to Mongoooooose")
);

///Middleware that parses POST requests from JSON into JS
app.use(express.json());

///Middlewaare for express routing
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("We are Liveeeeee"));
