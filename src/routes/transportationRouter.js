const express = require("express");
const transportController = require("../controllers/transportationController");
const router = express.Router();


router
    .route("/")
    .post(transportController.createTransport)
    .get(transportController.getAllTransports);


router
    .route("/:id")
    .get(transportController.getTransportById)
    .patch(transportController.updateTransport)
    .delete(transportController.deleteTransport);

module.exports = router;
