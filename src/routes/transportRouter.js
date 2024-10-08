const transportController = require("../controllers/transportationController");
const express = require("express");

const router = express.Router();

router.route("/create-transport").post(transportController.createTransport);
router.route("/:transportId").put(transportController.editTransport);

module.exports = router;
