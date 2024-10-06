const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();


router
    .route("/")
    .post(eventController.createEvent)
    .get(eventController.getAllEvents);


router
    .route("/:id")
    .get(eventController.getEventById)
    .patch(eventController.updateEvent)
    .delete(eventController.deleteEvent);

module.exports = router;