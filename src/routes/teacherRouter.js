const express = require("express");

const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.route("/").post(teacherController.createTeacher);

router.route("/:teacherId").put(teacherController.editTeacher).get(teacherController.getTeacherByID)
router.route("/all-teacher").get(teacherController.getAllTeachers);

module.exports = router;
