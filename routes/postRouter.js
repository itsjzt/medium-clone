const express = require("express");
const router = express.Router();
const {
  findPostByURL,
  submitPost,
  feed
} = require("../controllers/postController");
const { catchErrors } = require("../handlers/errorHandler");

// All routes are relative to /post/

router.get("/p/:url", findPostByURL);
// takes data through query
router.get("/submit", catchErrors(submitPost));
router.get("/", feed);

module.exports = router;
