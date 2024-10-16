const anouncementController = require("../controllers/anouncementController");

const express = require("express");
const { verifyToken } = require("../utils/verifytoken");

const router = express.Router();

router.route("/").post(verifyToken, anouncementController.createAnnouncement);
router
    .route("/:announcementId")
    .put(anouncementController.editAnnouncement)
    .delete(anouncementController.deleteAnnouncement);

router
    .route("/admin-anouncement")
    .get(verifyToken, anouncementController.getAnouncementsForAdmin);

router
    .route("/teacher-anouncement")
    .get(verifyToken, anouncementController.getAnouncementsForStaff);

router
    .route("/student-anouncement")
    .get(verifyToken, anouncementController.getAnouncementsForStudents);

module.exports = router;
