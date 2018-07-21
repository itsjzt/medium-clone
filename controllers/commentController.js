const Comment = require("../models/commentSchema");
const mongoose = require("mongoose");

exports.addComment = async (req, res) => {
  req.body.post = req.params.postid;
  req.body.author = req.user._id;
  const comment = await new Comment(req.body).save();
  res.redirect("back");
};

exports.findCommentsByPost = async postid => {
  const comments = await Comment.find({ post: postid }).populate("author");
  return comments;
};
