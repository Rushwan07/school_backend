const express = require("express");
const { verifyToken } = require("../utils/verifytoken");
const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

router.route("/create-attendance").post(attendanceController.createAttendance);
router
    .route("/edit-attendance/:attendanceId")
    .put(attendanceController.editAttendance);

router
    .route("/student-attendance")
    .get(verifyToken, attendanceController.getAttendanceForStudent);

router
    .route("/class-attendance/:classId")
    .get(attendanceController.getAttendanceByClassId);

module.exports = router;
