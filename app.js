require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// // const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

mongoose
  .connect(process.env.MONGO_URL)
  .then(
    () => console.log("connected to DB"),
    err => console.log("trying to reconnect")
  );

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

const auth = require("./handlers/authHandler");
auth(passport);
app.use(passport.initialize());

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/post", postRouter);

module.exports = app;
