const mongoose = require('mongoose');

const Schema = { mongoose };

const UserSchema = new Schema({
  name: { required: true, type: String, trim: true },
  username: {
    required: true,
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
  },
  avatar: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  google_id: String,
  google_token: String,
  email: { required: true, type: String, lowercase: true, trim: true },
});

module.exports = mongoose.model('User', UserSchema);
