const Class = require("../models/classModel"); // Adjust path as necessary
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new class
exports.createClass = catchAsync(async (req, res, next) => {
    const { name, description, subjects, students } = req.body;

    const newClass = await Class.create({ name, description, subjects, students });

    res.status(201).json({
        status: "success",
        data: {
            class: newClass,
        },
    });
});

// Get all classes
exports.getAllClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find().populate('students').populate('subjects.staff');

    res.status(200).json({
        status: "success",
        data: {
            classes,
        },
    });
});

// Get a class by ID
exports.getClassById = catchAsync(async (req, res, next) => {
    const classId = req.params.id;

    const classData = await Class.findById(classId).populate('students').populate('subjects.staff');
    if (!classData) {
        return next(new AppError("Class not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            class: classData,
        },
    });
});

// Update a class
exports.updateClass = catchAsync(async (req, res, next) => {
    const classId = req.params.id;

    const updatedClass = await Class.findByIdAndUpdate(classId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedClass) {
        return next(new AppError("Class not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            class: updatedClass,
        },
    });
});

// Delete a class
exports.deleteClass = catchAsync(async (req, res, next) => {
    const classId = req.params.id;

    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
        return next(new AppError("Class not found", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
