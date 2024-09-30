const Assessment = require('../models/assesmentModel'); 
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new assessment
exports.createAssessment = catchAsync(async (req, res) => {
    const { childId, assessmentDate, developmentAreas, comments } = req.body;
    const newAssessment = new Assessment({
        childId,
        assessmentDate,
        developmentAreas,
        comments
    });
    await newAssessment.save();
    res.status(201).json({
        status: 'success',
        data: {
            assessment: newAssessment,
        },
    });
});

// Get all assessments
exports.getAllAssessments = catchAsync(async (req, res) => {
    const assessments = await Assessment.find().populate('childId');
    res.status(200).json({
        status: 'success',
        results: assessments.length,
        data: {
            assessments,
        },
    });
});

// Get a single assessment by ID
exports.getAssessmentById = catchAsync(async (req, res, next) => {
    const assessment = await Assessment.findById(req.params.id).populate('childId');
    if (!assessment) {
        return next(new AppError('Assessment not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            assessment,
        },
    });
});

// Update an assessment
exports.updateAssessment = catchAsync(async (req, res, next) => {
    const { childId, assessmentDate, developmentAreas, comments } = req.body;
    const updatedAssessment = await Assessment.findByIdAndUpdate(
        req.params.id,
        { childId, assessmentDate, developmentAreas, comments },
        { new: true, runValidators: true }
    ).populate('childId');

    if (!updatedAssessment) {
        return next(new AppError('Assessment not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            assessment: updatedAssessment,
        },
    });
});

// Delete an assessment
exports.deleteAssessment = catchAsync(async (req, res, next) => {
    const deletedAssessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!deletedAssessment) {
        return next(new AppError('Assessment not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
