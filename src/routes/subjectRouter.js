const subjectController = require("../controllers/subjectController");
const { verifyToken } = require("../utils/verifytoken");
const express = require("express");

const router = express.Router();

router
    .route("/")
    .post(subjectController.createSubject)
    .get(subjectController.getall);

router.route("/:subjectId").put(subjectController.editSubject);

router
    .route("/student-subject")
    .get(verifyToken, subjectController.getStudentSubjects);

module.exports = router;
