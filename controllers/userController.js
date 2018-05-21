const User = require("../models/userSchema");
const mongoose = require("mongoose");

exports.findUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.json(user);
};
