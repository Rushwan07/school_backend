const express = require('express');
const assessmentController = require('../controllers/assesmentController'); 
const router = express.Router();

router.route('/')
    .post(assessmentController.createAssessment) 
    .get(assessmentController.getAllAssessments); 

router.route('/:id')
    .get(assessmentController.getAssessmentById) 
    .patch(assessmentController.updateAssessment) 
    .delete(assessmentController.deleteAssessment);

module.exports = router;
