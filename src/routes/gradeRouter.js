const express = require("express");
const gradeController = require("../controllers/gradeController");
const router = express.Router();


router
    .route("/")
    .post(gradeController.createGrade)
    .get(gradeController.getAllGrades);


router
    .route("/:id")
    .get(gradeController.getGradeById)
    .patch(gradeController.updateGrade)
    .delete(gradeController.deleteGrade);

module.exports = router;
