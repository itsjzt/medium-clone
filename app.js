require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(
    () => console.log("connected to DB"),
    err => console.log("trying to reconnect")
  );

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
