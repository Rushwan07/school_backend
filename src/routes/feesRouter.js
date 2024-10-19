const feesController = require("../controllers/feesController");
const { verifyToken } = require("../utils/verifytoken");

const express = require("express");

const router = express.Router();
router.patch("/update-status", verifyToken, feesController.updateFeesPaymentStatus);


router.route("/create-fees").post(feesController.createFeeRecord);

router.route("/").get(feesController.getFeesDetails);

router
    .route("/student-fees")
    .get(verifyToken, feesController.getStudentFeesDetails);



module.exports = router;
