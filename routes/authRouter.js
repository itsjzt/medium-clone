const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => res.redirect("/post"));

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
