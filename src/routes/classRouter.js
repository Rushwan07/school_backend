const classController = require("../controllers/classController");

const express = require("express");

const router = express.Router();

router.route("/create-class").post(classController.createClass);
router.route("/").get(classController.getClass);
router.route("/staff-class").get(classController.getStaffClasses);

module.exports = router;
