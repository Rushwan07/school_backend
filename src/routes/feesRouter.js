const express = require("express");
const feesController = require("../controllers/feesController");
const { verifyToken } = require("../utils/verifytoken");

const router = express.Router();

router.post("/create-fees", feesController.createFeeRecord);

router.get("/", feesController.getFeesDetails);

router.patch("/update-status/:feeId", verifyToken, feesController.updateFeesPaymentStatus);

router.get("/class/:classId", feesController.getFeesByClass);
router.get("/std", verifyToken, feesController.getFeesByStudentId);
router.get("/:id", feesController.getById);

module.exports = router;
