const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const router = express.Router();

router
    .route("/")
    .post(attendanceController.postAttendance)
    .get(attendanceController.getAttendance);
router.route("/:id").get(attendanceController.getAttendanceById);

module.exports = router;
