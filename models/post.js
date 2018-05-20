const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  author: String,
  article: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: 0 }],
  date: { type: Date, default: Date.now },
  meta: {
    claps: { type: Number, default: 0 },
    clapped_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  }
});

module.exports = mongoose.model("Post", PostSchema);
