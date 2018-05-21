require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

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
app.use("/users", userRouter);
app.use("/post", postRouter);

module.exports = app;
