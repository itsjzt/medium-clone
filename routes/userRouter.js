const express = require("express");
const router = express.Router();
const {
  findUserByUsername,
  followUser,
  unfollowUser,
  editUsername
} = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandler");

// All routes are relative to /users/

router.get("/follow/:me/:tofollow", catchErrors(followUser));
router.get("/unfollow/:me/:tofollow", catchErrors(unfollowUser));
router.get("/editusername/:oldname/:newname", catchErrors(editUsername));
router.get("/i/:username", catchErrors(findUserByUsername));
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
