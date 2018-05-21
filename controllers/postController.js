const Post = require("../models/postSchema");
const mongoose = require("mongoose");

exports.findPostByURL = async (req, res) => {
  const url = req.params.url;
  const post = await Post.findOne({ url });
  res.json(post);
};

exports.submitPost = (req, res) => {
  res.json(req.body);
};
