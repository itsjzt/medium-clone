const express = require("express");
const router = express.Router();
const {
  findUserByUsername,
  followUser
} = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandler");

// All routes are relative to /user/

router.get("/follow/:me/:tofollow", catchErrors(followUser));
router.get("/id/:username", catchErrors(findUserByUsername));

module.exports = router;
