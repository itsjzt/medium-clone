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

// models
const Post = require("./models/post");

const newpost = new Post({
  title: "Hi",
  author: "user",
  article: " lorem ipsum"
});

newpost.save().then(() => console.log("saved"), err => console.log("error"));
