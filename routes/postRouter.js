const express = require("express");
const router = express.Router();
const {
  findPostByURL,
  submitPost,
  clapPost,
  writePost
} = require("../controllers/postController");
const { catchErrors } = require("../handlers/errorHandler");

// All routes are relative to /post/

router.get("/p/:url", catchErrors(findPostByURL));
router.get("/submit", writePost);
router.get("/clap/:postId", catchErrors(clapPost));
router.post("/submit", catchErrors(submitPost));
module.exports = router;
