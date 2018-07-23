const User = require('../models/userSchema');
const Post = require('../models/postSchema');

exports.findUserByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  const posts = await Post.findOne({ author: user._id });
  res.render('profile', { title: user.name, user, posts: Array(posts) });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('back');
};

exports.login = (req, res) => {
  res.render('login');
};

exports.editUser = (req, res) => {
  res.render('editprofile', { user: req.user });
};

exports.submitUser = async (req, res) => {
  const { username, email, name } = req.body;
  console.log(req.body);
  const user = await User.findOneAndUpdate(
    { id: req._id },
    { email, username, name }
  );
  res.redirect(`/`);
};

exports.followUser = async (req, res) => {
  // me and tofollow refer to usernames which would be unique
  const { me, tofollow } = req.params;
  const follower = await User.findOne({ username: tofollow });
  await User.findOneAndUpdate(
    { username: me },
    { $push: { followers: follower._id } }
  );
  res.redirect('back');
};

exports.unfollowUser = async (req, res) => {
  // me and tofollow refer to usernames which would be unique
  const { me, tofollow } = req.params;
  const follower = await User.findOne({ username: tofollow });
  await User.findOneAndUpdate(
    { username: me },
    { $pull: { followers: follower._id } }
  );
  res.redirect('back');
};
