const User = require("../models/userSchema");
const mongoose = require("mongoose");

exports.findUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.json(user);
};

exports.editUsername = async (req, res) => {
  const { oldname, newname } = req.params;
  // someone already exists with new name
  if (await User.findOne({ username: newname })) {
    res.send({ done: false, error: "username already exists" });
  }
  // if someone is updating name
  else if (await User.findOne({ username: oldname })) {
    const user = await User.findOneAndUpdate(
      { username: oldname },
      { username: newname }
    );
    res.json({ done: true });
  }
  res.json({ done: false, error: "username doesn't exists" });
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
