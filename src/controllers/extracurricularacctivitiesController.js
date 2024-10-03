const mongoose = require("mongoose");
const ExtraCurricularActivity = require("../models/extracurricularacctivitiesModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new extracurricular activity
exports.createExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const { title, description, fees, classId } = req.body;

    const activity = await ExtraCurricularActivity.create({ title, description, fees, classId });

    return res.status(201).json({
        status: "success",
        data: { activity },
    });
});

// Get all extracurricular activities
exports.getAllExtraCurricularActivities = catchAsync(async (req, res, next) => {
    const activities = await ExtraCurricularActivity.find().populate("classId");

    return res.status(200).json({
        status: "success",
        data: { activities },
    });
});

// Get an extracurricular activity by ID
exports.getExtraCurricularActivityById = catchAsync(async (req, res, next) => {
    const activityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return next(new AppError("Invalid activity ID.", 400));
    }

    const activity = await ExtraCurricularActivity.findById(activityId).populate("classId");

    if (!activity) {
        return next(new AppError("Activity not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { activity },
    });
});

// Update an extracurricular activity
exports.updateExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const activityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return next(new AppError("Invalid activity ID.", 400));
    }

    const activity = await ExtraCurricularActivity.findByIdAndUpdate(activityId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!activity) {
        return next(new AppError("Activity not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { activity },
    });
});

// Delete an extracurricular activity
exports.deleteExtraCurricularActivity = catchAsync(async (req, res, next) => {
    const activityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(activityId)) {
        return next(new AppError("Invalid activity ID.", 400));
    }

    const activity = await ExtraCurricularActivity.findByIdAndDelete(activityId);

    if (!activity) {
        return next(new AppError("Activity not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
