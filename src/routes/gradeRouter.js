const gradeController = require("../controllers/gradeController");

const express = require("express");

const router = express.Router();

router
    .route("/")
    .post(gradeController.createGrade)
    .get(gradeController.getGrade);

router
    .route("/:gradeId")
    .put(gradeController.updateGrade)
    .delete(gradeController.deleteGrade);

module.exports = router;
