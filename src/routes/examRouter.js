const examController = require("../controllers/examController");

const express = require("express");

const router = express.Router();
const { verifyToken } = require("../utils/verifytoken");

router.route("/").post(examController.createExam);

router
    .route("/:examId")
    .put(examController.editExam)
    .delete(examController.deleteExam);

router.route("/admin-exams").get(examController.getAdminExams);
router.route("/teacher-exams").get(verifyToken, examController.getTeacherExams);
router.route("/student-exams").get(verifyToken, examController.getStudentExams);

module.exports = router;
