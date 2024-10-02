const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const router = express.Router();

router
    .route('/')
    .post(invoiceController.createInvoice)
    .get(invoiceController.getAllInvoices);

router
    .route('/:id')
    .get(invoiceController.getInvoiceById)
    .patch(invoiceController.updateInvoice)
    .delete(invoiceController.deleteInvoice);

module.exports = router;
