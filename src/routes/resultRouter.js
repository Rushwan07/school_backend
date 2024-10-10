const resultController = require("../controllers/resultController");

const express = require("express");

const router = express.Router();

router.route("/").post(resultController.createResult);
router.route("/:examId").get(resultController.getResultForExam);

module.exports = router;
