const mongoose = require("mongoose");
const Result = require("../models/resultModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new result
exports.createResult = catchAsync(async (req, res, next) => {
    const { score, examId, assignmentId, studentId } = req.body;

    const result = await Result.create({ score, examId, assignmentId, studentId });

    return res.status(201).json({
        status: "success",
        data: { result },
    });
});

// Get all results
exports.getAllResults = catchAsync(async (req, res, next) => {
    const results = await Result.find().populate("examId assignmentId studentId");

    return res.status(200).json({
        status: "success",
        data: { results },
    });
});

// Get a result by ID
exports.getResultById = catchAsync(async (req, res, next) => {
    const resultId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(resultId)) {
        return next(new AppError("Invalid result ID.", 400));
    }

    const result = await Result.findById(resultId).populate("examId assignmentId studentId");

    if (!result) {
        return next(new AppError("Result not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { result },
    });
});

// Update a result
exports.updateResult = catchAsync(async (req, res, next) => {
    const resultId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(resultId)) {
        return next(new AppError("Invalid result ID.", 400));
    }

    const result = await Result.findByIdAndUpdate(resultId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        return next(new AppError("Result not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { result },
    });
});

// Delete a result
exports.deleteResult = catchAsync(async (req, res, next) => {
    const resultId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(resultId)) {
        return next(new AppError("Invalid result ID.", 400));
    }

    const result = await Result.findByIdAndDelete(resultId);

    if (!result) {
        return next(new AppError("Result not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
