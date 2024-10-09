const anouncementController = require("../controllers/anouncementController");

const express = require("express");
const { verifyToken } = require("../utils/verifytoken");

const router = express.Router();

router
    .route("/create-anouncement")
    .post(verifyToken, anouncementController.createAnnouncement);

module.exports = router;
