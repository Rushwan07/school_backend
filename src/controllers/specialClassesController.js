const SpecialClasses = require('../models/specialClassModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new special class
exports.createSpecialClass = catchAsync(async (req, res, next) => {
    const { classId, description, subjects, students } = req.body;

    const newSpecialClass = await SpecialClasses.create({ classId, description, subjects, students });

    res.status(201).json({
        status: 'success',
        data: {
            specialClass: newSpecialClass,
        },
    });
});

// Get all special classes
exports.getAllSpecialClasses = catchAsync(async (req, res, next) => {
    const specialClasses = await SpecialClasses.find().populate('students').populate('subjects.staff');

    res.status(200).json({
        status: 'success',
        data: {
            specialClasses,
        },
    });
});

// Get a special class by ID
exports.getSpecialClassById = catchAsync(async (req, res, next) => {
    const specialClassId = req.params.id;

    const specialClass = await SpecialClasses.findById(specialClassId).populate('students').populate('subjects.staff');
    if (!specialClass) {
        return next(new AppError('Special class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            specialClass,
        },
    });
});

// Update a special class
exports.updateSpecialClass = catchAsync(async (req, res, next) => {
    const specialClassId = req.params.id;

    const updatedSpecialClass = await SpecialClasses.findByIdAndUpdate(specialClassId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedSpecialClass) {
        return next(new AppError('Special class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            specialClass: updatedSpecialClass,
        },
    });
});

// Delete a special class
exports.deleteSpecialClass = catchAsync(async (req, res, next) => {
    const specialClassId = req.params.id;

    const deletedSpecialClass = await SpecialClasses.findByIdAndDelete(specialClassId);
    if (!deletedSpecialClass) {
        return next(new AppError('Special class not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
