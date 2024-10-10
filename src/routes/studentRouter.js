const studentController = require("../controllers/studentController");

const express = require("express");

const router = express.Router();

router.route("/").post(studentController.createStudent);
router
    .route("/student-class")
    .get(studentController.getAllStudentsGroupedByClass);
router.route("/all-students").get(studentController.getAllStudents);

router
    .route("/:studentId")
    .get(studentController.getStudent)
    .put(studentController.editStudent);

module.exports = router;
