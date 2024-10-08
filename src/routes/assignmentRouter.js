const express = require("express");

const assignmentController = require("../controllers/assignmentController");

const router = express.Router();

router.route("/create-assignment").post(assignmentController.createAssignment);

module.exports = router;
