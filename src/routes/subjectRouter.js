const express = require("express");
const subjectController = require("../controllers/subjectController");
const router = express.Router();

// Route for creating and fetching subjects
router
    .route("/")
    .post(subjectController.createSubject)
    .get(subjectController.getAllSubjects);


router
    .route("/:id")
    .get(subjectController.getSubjectById)
    .patch(subjectController.updateSubject)
    .delete(subjectController.deleteSubject);

module.exports = router;
