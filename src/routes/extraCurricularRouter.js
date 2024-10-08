const extraCurricularController = require("../controllers/extraCurricularController");

const express = require("express");

const router = express.Router();

router
    .route("/create-activity")
    .post(extraCurricularController.createExtraCurricularActivity);

module.exports = router;
