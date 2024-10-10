const eventsController = require("../controllers/eventsController");

const express = require("express");

const router = express.Router();

router.route("/").post(eventsController.createEvent);

router
    .route("/:eventId")
    .put(eventsController.editEvent)
    .delete(eventsController.deleteEvent);

router.route("/teacher-event").get(eventsController.getEventForTeacher);
router.route("/admin-event").get(eventsController.getEventForAdmin);
router.route("/student-event").get(eventsController.getEventForStudent);

module.exports = router;
