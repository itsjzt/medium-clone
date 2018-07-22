const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { required: true, type: String, trim: true },
  username: {
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
  email: { type: String, lowercase: true, trim: true },
});

module.exports = mongoose.model('User', UserSchema);
