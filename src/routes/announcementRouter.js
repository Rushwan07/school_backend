const express = require("express");
const announcementController = require("../controllers/announcementController");
const router = express.Router();

router
    .route("/")
    .post(announcementController.createAnnouncement)
    .get(announcementController.getAllAnnouncements);

router
    .route("/:id")
    .get(announcementController.getAnnouncementById)
    .patch(announcementController.updateAnnouncement)
    .delete(announcementController.deleteAnnouncement);

module.exports = router;
