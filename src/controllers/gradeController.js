const mongoose = require("mongoose");
const Grade = require("../models/gradeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new grade
exports.createGrade = catchAsync(async (req, res, next) => {
    const { level, students, classes } = req.body;

    const grade = await Grade.create({ level, students, classes });

    return res.status(201).json({
        status: "success",
        data: { grade },
    });
});

// Get all grades
exports.getAllGrades = catchAsync(async (req, res, next) => {
    const grades = await Grade.find().populate("students classes");
    
    return res.status(200).json({
        status: "success",
        data: { grades },
    });
});

// Get a grade by ID
exports.getGradeById = catchAsync(async (req, res, next) => {
    const gradeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) {
        return next(new AppError("Invalid grade ID.", 400));
    }

    const grade = await Grade.findById(gradeId).populate("students classes");
    
    if (!grade) {
        return next(new AppError("Grade not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { grade },
    });
});

// Update a grade
exports.updateGrade = catchAsync(async (req, res, next) => {
    const gradeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) {
        return next(new AppError("Invalid grade ID.", 400));
    }

    const grade = await Grade.findByIdAndUpdate(gradeId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!grade) {
        return next(new AppError("Grade not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { grade },
    });
});

// Delete a grade
exports.deleteGrade = catchAsync(async (req, res, next) => {
    const gradeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gradeId)) {
        return next(new AppError("Invalid grade ID.", 400));
    }

    const grade = await Grade.findByIdAndDelete(gradeId);
    
    if (!grade) {
        return next(new AppError("Grade not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
