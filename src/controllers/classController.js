const mongoose = require("mongoose");
const Class = require("../models/classModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new class
exports.createClass = catchAsync(async (req, res, next) => {
    const {
        name,
        capacity,
        supervisorId,
        lessons,
        students,
        events,
        announcements,
        baseFees
    } = req.body;

    const newClass = await Class.create({
        name,
        capacity,
        supervisorId,
        lessons,
        students,
        events,
        announcements,
        baseFees
    });

    return res.status(201).json({
        status: "success",
        data: { class: newClass },
    });
});

// Get all classes with all fields populated
exports.getAllClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find()
        .populate("supervisorId") // If supervisorId is a reference, populate it
        .populate("lessons") // Populate lessons
        .populate("students") // Populate students
        .populate("events") // Populate events
        .populate("announcements"); // Populate announcements

    return res.status(200).json({
        status: "success",
        data: { classes },
    });
});

// Get a class by ID with all fields populated
exports.getClassById = catchAsync(async (req, res, next) => {
    const classId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
        return next(new AppError("Invalid class ID.", 400));
    }

    const classData = await Class.findById(classId)
        .populate("supervisorId")
        .populate("lessons")
        .populate("students")
        .populate("events")
        .populate("announcements");

    if (!classData) {
        return next(new AppError("Class not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { class: classData },
    });
});

// Update a class
exports.updateClass = catchAsync(async (req, res, next) => {
    const classId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
        return next(new AppError("Invalid class ID.", 400));
    }

    const updatedClass = await Class.findByIdAndUpdate(classId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedClass) {
        return next(new AppError("Class not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { class: updatedClass },
    });
});

// Delete a class
exports.deleteClass = catchAsync(async (req, res, next) => {
    const classId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
        return next(new AppError("Invalid class ID.", 400));
    }

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
        return next(new AppError("Class not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
