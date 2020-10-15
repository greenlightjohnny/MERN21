const express = require("express");

require("dotenv").config();

console.log(process.env.MONGO);

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("We are Liveeeeee"));
