const express = require("express");
const router = express.Router();
const {
  findPostByURL,
  submitPost,
  feed
} = require("../controllers/postController");
// All routes are relative to /post/

router.get("/:url", findPostByURL);
router.post("/submit", submitPost);
router.get("/", feed);

module.exports = router;
