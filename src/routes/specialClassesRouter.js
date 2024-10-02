const express = require('express');
const specialClassesController = require('../controllers/specialClassesController');
const router = express.Router();

router
    .route('/')
    .post(specialClassesController.createSpecialClass)
    .get(specialClassesController.getAllSpecialClasses);

router
    .route('/:id')
    .get(specialClassesController.getSpecialClassById)
    .patch(specialClassesController.updateSpecialClass)
    .delete(specialClassesController.deleteSpecialClass);

module.exports = router;
