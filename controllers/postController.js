const Post = require("../models/postSchema");
const mongoose = require("mongoose");

exports.findPostByURL = async (req, res) => {
  const url = req.params.url;
  const post = await Post.findOne({ url });
  res.json(post);
};

// FIXME: create better unique urls
exports.submitPost = async (req, res) => {
  const { title, author, article } = req.query;
  const post = await new Post({
    title,
    author,
    article,
    url: `title${Date.now()}`
  }).save();

  res.send(post);
};

exports.feed = async (req, res) => {
  const post = await Post.find();
  res.send(post);
};
