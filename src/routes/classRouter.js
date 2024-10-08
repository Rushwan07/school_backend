const classController = require("../controllers/classController");

const express = require("express");

const router = express.Router();

router.route("/create-class").post(classController.createClass);

module.exports = router;
