const express = require('express');
const communicationController = require('../controllers/communicationController');
const router = express.Router();

router.route('/')
    .post(communicationController.createCommunication)
    .get(communicationController.getAllCommunications);

router.route('/:id')
    .get(communicationController.getCommunicationById)
    .patch(communicationController.updateCommunication)
    .delete(communicationController.deleteCommunication);

module.exports = router;
