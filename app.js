const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const cookie = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(cookie());
app.use(passport.initialize());

app.use("/api/v1/auth", authRoutes);

module.exports = app;
