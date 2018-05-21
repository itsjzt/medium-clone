exports.findPostByURL = (req, res) => {
  res.json({
    title: "Hi",
    author: "id123",
    article: " lorem ipsum",
    url: "hi"
  });
};

exports.submitPost = (req, res) => {
  res.json(req.body);
};
