const Post = require('../models/postSchema');
const { findCommentsByPost } = require('./commentController');

exports.findPostByURL = async (req, res) => {
  const { url } = req.params;
  const post = await Post.findOne({ url }).populate('author');
  post.comments = await findCommentsByPost(post._id);
  res.render('post', { title: post.title, user: post.author, post });
};

// todo: create better unique urls
exports.submitPost = async (req, res) => {
  const { title, article } = req.body;
  const author = req.user._id;
  const post = await new Post({
    title,
    author,
    article,
    url: `${title}${Date.now()}`,
  }).save();

  res.redirect(`/post/p/${post.url}`);
};

exports.writePost = (req, res) => {
  res.render('write.pug');
};

exports.clapPost = async (req, res) => {
  await Post.findOneAndUpdate({ _id: req.params.postId }, { $inc: { claps: 1 } });
  res.redirect('back');
};
