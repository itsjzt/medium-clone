const express = require("express");
const router = express.Router();
const { findUserByUsername } = require("../controllers/userController");
// All routes are relative to /user/

router.get("/:username", findUserByUsername);
module.exports = router;
