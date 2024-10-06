const express = require("express");
const examController = require("../controllers/examController");
const router = express.Router();


router
    .route("/")
    .post(examController.createExam)
    .get(examController.getAllExams);


router
    .route("/:id")
    .get(examController.getExamById)
    .patch(examController.updateExam)
    .delete(examController.deleteExam);

module.exports = router;
