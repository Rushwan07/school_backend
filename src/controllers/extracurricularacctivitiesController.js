const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ExtraCurricularActivities = require("../models/extracurricularacctivitiesModel");

// Create a new activity
exports.createActivity = catchAsync(async (req, res, next) => {
    const { name, description, students, fees } = req.body;

    const newActivity = await ExtraCurricularActivities.create({ name, description, students, fees });

    res.status(201).json({
        status: "success",
        data: {
            activity: newActivity,
        },
    });
});

// Get all activities
exports.getAllActivities = catchAsync(async (req, res, next) => {
    const activities = await ExtraCurricularActivities.find().populate('students');

    res.status(200).json({
        status: "success",
        data: {
            activities,
        },
    });
});

// Get a single activity by ID
exports.getActivityById = catchAsync(async (req, res, next) => {
    const activity = await ExtraCurricularActivities.findById(req.params.id).populate('students');

    if (!activity) {
        return next(new AppError("No activity found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            activity,
        },
    });
});

// Update an activity
exports.updateActivity = catchAsync(async (req, res, next) => {
    const activity = await ExtraCurricularActivities.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!activity) {
        return next(new AppError("No activity found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            activity,
        },
    });
});

// Delete an activity
exports.deleteActivity = catchAsync(async (req, res, next) => {
    const activity = await ExtraCurricularActivities.findByIdAndDelete(req.params.id);

    if (!activity) {
        return next(new AppError("No activity found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
