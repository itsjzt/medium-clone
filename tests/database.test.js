require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(
    () => console.log("connected to DB"),
    err => console.log("trying to reconnect")
  );

// user model
const User = require("../models/user");

const newuser = new User({
  name: "testing user",
  username: "user"
});

newuser
  .save()
  .then(() => console.log("saved user"), err => console.log("error user"));

// models
const Post = require("../models/post");

const newpost = new Post({
  title: "Hi",
  author: newuser,
  article: " lorem ipsum"
});

newpost
  .save()
  .then(() => console.log("saved post"), err => console.log("error post"));
