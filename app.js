require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.locals.appName = "Medium Clone";
app.locals.baseUrl = "http://127.1.0.1:3000";

const auth = require("./handlers/authHandler");
auth(passport);
app.use(passport.initialize());

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/post", postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
