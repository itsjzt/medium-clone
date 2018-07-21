const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../models/postSchema");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { title: "Medium Clone", posts });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;
