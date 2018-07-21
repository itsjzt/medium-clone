const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, trim: true, required: "You must pass a title" },
  url: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: "There should be a url"
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  article: {
    type: String,
    required: "You should have some article text",
    trim: true
  },
  date: { type: Date, default: Date.now },
  claps: { type: Number, default: 0 }
});

module.exports = mongoose.model("Post", PostSchema);
