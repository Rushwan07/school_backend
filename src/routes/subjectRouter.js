const subjectController = require("../controllers/subjectController");

const express = require("express");

const router = express.Router();

router.route("/create-subject").post(subjectController.createSubject);

module.exports = router;
