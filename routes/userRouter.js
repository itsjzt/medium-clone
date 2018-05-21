const express = require("express");
const router = express.Router();
const { findUserByUsername } = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandler");

// All routes are relative to /user/

router.get("/:username", catchErrors(findUserByUsername));
module.exports = router;
