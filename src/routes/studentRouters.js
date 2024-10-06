const express = require("express");
const studentController = require("../controllers/studentControllers");
const router = express.Router();


router
    .route("/")
    .post(studentController.createStudent)
    .get(studentController.getAllStudents);


router
    .route("/:id")
    .get(studentController.getStudentById)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent);

module.exports = router;
