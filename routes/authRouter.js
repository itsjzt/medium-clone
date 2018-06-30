const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => res.json({ hello: "world" }));

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  })
);

router.get("/auth/google/callback", function(req, res) {
  passport.authenticate("google", function(err, user, info) {
    res.json(user);
  })(req, res);
});

module.exports = router;
