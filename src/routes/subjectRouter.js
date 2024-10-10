const subjectController = require("../controllers/subjectController");

const express = require("express");

const router = express.Router();

router.route("/").post(subjectController.createSubject);

router.route("/:subjectId").put(subjectController.editSubject);

module.exports = router;
