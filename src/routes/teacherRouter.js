const express = require("express");

const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.route("/").post(teacherController.createTeacher);

router.route("/:teacherId").put(teacherController.editTeacher);

module.exports = router;
