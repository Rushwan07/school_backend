const examController = require("../controllers/examController");

const express = require("express");

const router = express.Router();

router.route("/create-exam").post(examController.createExam);

module.exports = router;
