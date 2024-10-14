const classController = require("../controllers/classController");
const { verifyToken } = require("../utils/verifytoken");

const express = require("express");

const router = express.Router();

router
    .route("/")
    .post(classController.createClass)
    .get(classController.getClass);

router
    .route("/:classId")
    .put(classController.editClass)
    .get(classController.getClassWithStudent);

router.route("/staff-class").get(verifyToken, classController.getStaffClasses);

module.exports = router;
