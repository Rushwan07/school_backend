const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.route('/')
    .post(reportController.createReport)
    .get(reportController.getAllReports);

router.route('/:id')
    .get(reportController.getReportById)
    .patch(reportController.updateReport)
    .delete(reportController.deleteReport);

module.exports = router;
