const feesController = require("../controllers/feesController");

const express = require("express");

const router = express.Router();

router.route("/create-fees").post(feesController.createFeeRecord);

module.exports = router;
