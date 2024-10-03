const express = require("express");
const teacherController = require("../controllers/teacherController");
const router = express.Router();


router
    .route("/")
    .post(teacherController.createTeacher) 
    .get(teacherController.getAllTeachers); 


router
    .route("/:id")
    .get(teacherController.getTeacherById) 
    .patch(teacherController.updateTeacher)  
    .delete(teacherController.deleteTeacher); 

module.exports = router;
