const express = require("express");

const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.route("/create-teacher").post(teacherController.createTeacher);

module.exports = router;
