const classController = require("../controllers/classController");
const { verifyToken } = require("../utils/verifytoken");

const express = require("express");

const router = express.Router();

router
    .route("/")
    .post(classController.createClass)
    .get(classController.getClass);
router.route("/class-attendance").get(classController.getClassForAttendance);
router.route("/staff-class").get(verifyToken, classController.getStaffClasses);
router
    .route("/:classId")
    .put(classController.editClass)
    .get(classController.getClassWithStudent);

module.exports = router;
