const express = require("express");
const classController = require("../controllers/classController");
const router = express.Router();

router
    .route("/")
    .post(classController.createClass)
    .get(classController.getAllClasses);

router
    .route("/:id")
    .get(classController.getClassById)
    .patch(classController.updateClass)
    .delete(classController.deleteClass);

module.exports = router;
