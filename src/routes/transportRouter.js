const transportController = require("../controllers/transportationController");
const express = require("express");

const router = express.Router();

router.route("/").get(transportController.getTransport);

router.route("/create-transport").post(transportController.createTransport);
router
    .route("/admin-transport-count")
    .get(transportController.getTransportCount);
router
    .route("/:transportId")
    .put(transportController.editTransport)
    .delete(transportController.deleteTransport);

module.exports = router;
