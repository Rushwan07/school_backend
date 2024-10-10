const express = require("express");
const { verifyToken } = require("../utils/verifytoken");

const assignmentController = require("../controllers/assignmentController");

const router = express.Router();

router.route("/").post(assignmentController.createAssignment);

router
    .route("/:assignmentId")
    .put(assignmentController.editAssignment)
    .delete(assignmentController.deleteAssignment);

router
    .route("/admin-assignment")
    .get(verifyToken, assignmentController.getAssignmentsForAdmin);

router
    .route("/teacher-assignment")
    .get(verifyToken, assignmentController.getAnouncementsForStaff);

router
    .route("/student-assignment")
    .get(verifyToken, assignmentController.getAnouncementsForStudents);

module.exports = router;
