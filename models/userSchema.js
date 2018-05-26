const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  // TODO: make it unique
  username: String,
  avatar: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  google_id: String,
  google_token: String,
  email: String
});

module.exports = mongoose.model("User", UserSchema);
