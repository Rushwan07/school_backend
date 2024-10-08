const studentController = require("../controllers/studentController");

const express = require("express");

const router = express.Router();

router.route("/create-student").post(studentController.createStudent);

module.exports = router;
