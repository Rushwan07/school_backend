const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const router = express.Router();

router
    .route("/")
    .post(attendanceController.postAttendance)
    .get(attendanceController.getAttendance);

router
    .route("/:id")
    .get(attendanceController.getAttendanceById)
    .patch(attendanceController.updateAttendance)
    .delete(attendanceController.deleteAttendance);

module.exports = router;
