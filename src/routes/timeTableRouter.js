const express = require('express');
const timeTableController = require('../controllers/timeTableController');
const router = express.Router();

router
    .route('/')
    .post(timeTableController.createTimeTable)
    .get(timeTableController.getAllTimeTables);

router
    .route('/:id')
    .get(timeTableController.getTimeTableById)
    .patch(timeTableController.updateTimeTable)
    .delete(timeTableController.deleteTimeTable);

module.exports = router;
