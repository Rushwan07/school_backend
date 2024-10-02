const express = require("express");
const extracurricular = require("../controllers/extracurricularacctivitiesController");

const router = express.Router();

router.route("/")
    .post(extracurricular.createActivity)
    .get(extracurricular.getAllActivities);

router.route("/:id")
    .get(extracurricular.getActivityById)
    .patch(extracurricular.updateActivity)
    .delete(extracurricular.deleteActivity);

module.exports = router;
