const express = require("express");

const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.route("/").post(teacherController.createTeacher);
router.route("/all-teacher").get(teacherController.getAllTeachers);
router
    .route("/:teacherId")
    .put(teacherController.editTeacher)
    .get(teacherController.getTeacherByID);

module.exports = router;
