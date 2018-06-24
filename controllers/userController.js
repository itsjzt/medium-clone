const User = require("../models/userSchema");
const mongoose = require("mongoose");

exports.findUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.json(user);
};

exports.editUsername = async (req, res) => {
  const { oldname, newname } = req.params;
  const user = await User.findOneAndUpdate(
    { username: oldname },
    { username: newname }
  );
  res.json({ done: true });
};

exports.followUser = async (req, res) => {
  // me and tofollow refer to usernames which would be unique
  const { me, tofollow } = req.params;
  const follower = await User.findOne({ username: tofollow });
  const user = await User.findOneAndUpdate(
    { username: me },
    { $push: { followers: follower._id } }
  );
  res.json({ done: true });
};

exports.unfollowUser = async (req, res) => {
  // me and tofollow refer to usernames which would be unique
  const { me, tofollow } = req.params;
  const follower = await User.findOne({ username: tofollow });
  const user = await User.findOneAndUpdate(
    { username: me },
    { $pull: { followers: follower._id } }
  );
  res.json({ done: true });
};
