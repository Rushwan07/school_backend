const anouncementController = require("../controllers/anouncementController");

const express = require("express");

const router = express.Router();

router
    .route("/create-anouncement")
    .post(anouncementController.createAnnouncement);

module.exports = router;
