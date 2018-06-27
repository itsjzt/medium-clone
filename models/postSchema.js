const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, trim: true },
  url: { type: String, lowercase: true, trim: true, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  date: { type: Date, default: Date.now },
  meta: {
    claps: { type: Number, default: 0 },
    clapped_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  }
});

module.exports = mongoose.model("Post", PostSchema);
