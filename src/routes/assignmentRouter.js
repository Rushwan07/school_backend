const express = require("express");
const assignmentController = require("../controllers/assignmentController");
const router = express.Router();

router
    .route("/")
    .post(assignmentController.createAssignment)
    .get(assignmentController.getAllAssignments);

router
    .route("/:id")
    .get(assignmentController.getAssignmentById)
    .patch(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

module.exports = router;
