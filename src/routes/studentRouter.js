const studentController = require("../controllers/studentController");

const express = require("express");

const router = express.Router();

router.route("/").post(studentController.createStudent);

router
    .route("/:studentId")
    .get(studentController.getStudent)
    .put(studentController.editStudent);

module.exports = router;
