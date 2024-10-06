const express = require("express");
const extraCurricularController = require("../controllers/extracurricularacctivitiesController");
const router = express.Router();


router
    .route("/")
    .post(extraCurricularController.createExtraCurricularActivity)
    .get(extraCurricularController.getAllExtraCurricularActivities);


router
    .route("/:id")
    .get(extraCurricularController.getExtraCurricularActivityById)
    .patch(extraCurricularController.updateExtraCurricularActivity)
    .delete(extraCurricularController.deleteExtraCurricularActivity);

module.exports = router