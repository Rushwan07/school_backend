const express = require("express");

const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

router.route("/create-attendance").post(attendanceController.createAttendance);
router
    .route("/edit-attendance/:attendanceId")
    .put(attendanceController.editAttendance);

module.exports = router;
