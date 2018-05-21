const express = require("express");
const router = express.Router();
const { findPostByURL, submitPost } = require("../controllers/postController");
// All routes are relative to /post/

router.get("/:url", findPostByURL);
router.post("/submit", submitPost);

module.exports = router;
