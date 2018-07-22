const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: 'You must pass a text review',
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'You must pass a user',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: 'You must pass a post',
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
