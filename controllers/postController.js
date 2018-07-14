const Post = require("../models/postSchema");
const mongoose = require("mongoose");

exports.findPostByURL = async (req, res) => {
  const url = req.params.url;
  const post = await Post.findOne({ url }).populate("author");
  res.render("post", { title: post.title, user: post.author, post });
};

// todo: create better unique urls
exports.submitPost = async (req, res) => {
  const { title, author, article } = req.body;
  console.log(req.body);
  const post = await new Post({
    title,
    author,
    article,
    url: `${title}${Date.now()}`
  }).save();

  res.redirect(`/post/p/${post.url}`);
};

exports.writePost = (req, res) => {
  res.render("write.pug");
};

exports.feed = async (req, res) => {
  const posts = await Post.find();
  res.render("index", { title: "Medium Clone", posts });
};
