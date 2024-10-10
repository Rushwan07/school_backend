const eventsController = require("../controllers/eventsController");

const express = require("express");

const router = express.Router();

router.route("/create-event").post(eventsController.createEvent);

module.exports = router;
