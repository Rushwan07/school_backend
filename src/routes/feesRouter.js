const express = require('express');
const feeController = require('../controllers/feesController'); 
const router = express.Router();

router.route('/')
    .post(feeController.createFee) 
    .get(feeController.getAllFees); 

router.route('/:id')
    .get(feeController.getFeeById) 
    .patch(feeController.updateFee) 
    .delete(feeController.deleteFee);

module.exports = router;
