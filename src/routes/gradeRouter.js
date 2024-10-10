const gradeController = require("../controllers/gradeController");

const express = require("express");

const router = express.Router();

router.route("/create-grade").post(gradeController.createGrade);

module.exports = router;
