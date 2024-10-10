const extraCurricularController = require("../controllers/extraCurricularController");
const { verifyToken } = require("../utils/verifytoken");

const express = require("express");

const router = express.Router();

router.route("/").post(extraCurricularController.createExtraCurricularActivity);

router
    .route("/:activityId")
    .delete(extraCurricularController.deleteExtraCurricularActivity)
    .put(extraCurricularController.editExtraCurricularActivity);

router
    .route("/admin-activity")
    .get(extraCurricularController.getAdminExtraCurricularActivity);
router
    .route("/student-activity")
    .get(
        verifyToken,
        extraCurricularController.getStudentExtraCurricularActivity
    );
router
    .route("/teacher-activity")
    .get(
        verifyToken,
        extraCurricularController.getTeacherExtraCurricularActivity
    );

module.exports = router;
