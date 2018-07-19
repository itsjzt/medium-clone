const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// todo: fields required to be true
const PostSchema = new Schema({
  title: { type: String, trim: true, required: true },
  url: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  article: {
    type: String,
    required: true,
    trim: true
  },
  // used when post are already a comment
  parentPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  date: { type: Date, default: Date.now },
  meta: {
    claps: { type: Number, default: 0 },
    clapped_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  }
});

module.exports = mongoose.model("Post", PostSchema);
