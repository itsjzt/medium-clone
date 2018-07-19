const express = require("express");
const router = express.Router();
const {
  findPostByURL,
  submitPost,
  feed,
  writePost
} = require("../controllers/postController");
const { catchErrors } = require("../handlers/errorHandler");

// All routes are relative to /post/

router.get("/p/:url", catchErrors(findPostByURL));
router.get("/submit", writePost);
router.post("/submit", catchErrors(submitPost));
router.get("/", feed);

module.exports = router;
