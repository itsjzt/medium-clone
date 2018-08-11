const Post = require('../models/postSchema');
const { findCommentsByPost } = require('./commentController');

exports.feed = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 7;
  const skip = page * limit - limit;

  // 1. Query the database for a list of all post
  const postPromise = Post.find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Post.count();

  const [posts, count] = await Promise.all([postPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!posts.length && skip) {
    res.redirect(`/post/page/${pages}`);
    return;
  }

  res.render('index', { title: 'Medium clone', posts, page, pages });
};

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
    url: `${title.toString().replace(/\s+/, '-')}${Date.now()}`,
  }).save();

  res.redirect(`/p/${post.url}`);
};

exports.writePost = (req, res) => {
  res.render('write.pug');
};

exports.likePost = async (req, res) => {
  await Post.findOneAndUpdate(
    { url: req.params.posturl },
    { $inc: { claps: 1 } }
  );
  res.redirect('back');
};
