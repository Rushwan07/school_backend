const transportController = require("../controllers/transportationController");
const express = require("express");

const router = express.Router();

router.route("/create-transport").post(transportController.createTransport);

module.exports = router;
