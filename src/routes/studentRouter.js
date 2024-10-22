const studentController = require("../controllers/studentController");

const express = require("express");

const router = express.Router();

router.route("/").post(studentController.createStudent);
router
    .route("/student-class")
    .get(studentController.getAllStudentsGroupedByClass);
router.route("/all-students").get(studentController.getAllStudents);

router.route("/admin-gender-count").get(studentController.getGenderCount);
router.route("/admin-student-count").get(studentController.getStudentsCount);

router
    .route("/:studentId")
    .get(studentController.getStudent)
    .put(studentController.editStudent);

module.exports = router;
