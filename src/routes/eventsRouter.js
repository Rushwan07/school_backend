const eventsController = require("../controllers/eventsController");
const { verifyToken } = require("../utils/verifytoken");
const express = require("express");

const router = express.Router();

router.route("/").post(eventsController.createEvent);

router
    .route("/:eventId")
    .put(eventsController.editEvent)
    .delete(eventsController.deleteEvent);

router
    .route("/teacher-event")
    .get(verifyToken, eventsController.getEventForTeacher);
router.route("/admin-event").get(eventsController.getEventForAdmin);
router
    .route("/student-event")
    .get(verifyToken, eventsController.getEventForStudent);

module.exports = router;
