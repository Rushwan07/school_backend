const express = require('express');
const transportationController = require('../controllers/transportationController');
const router = express.Router();

router
    .route('/')
    .post(transportationController.createTransportation)
    .get(transportationController.getAllTransportations);

router
    .route('/:id')
    .get(transportationController.getTransportationById)
    .patch(transportationController.updateTransportation)
    .delete(transportationController.deleteTransportation);

module.exports = router;
