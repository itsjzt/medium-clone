const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandler");
const { addComment } = require("../controllers/commentController");

router.post("/:postid", catchErrors(addComment));

module.exports = router;
