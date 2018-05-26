const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => res.send(req.session));

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"
  })
);

module.exports = router;
