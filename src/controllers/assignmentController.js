const mongoose = require("mongoose");
const Assignment = require("../models/assignmentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new assignment
exports.createAssignment = catchAsync(async (req, res, next) => {
    const { title, startDate, dueDate, description, subjectId } = req.body;

    const assignment = await Assignment.create({
        title,
        startDate,
        dueDate,
        description,
        subjectId,
    });

    return res.status(201).json({
        status: "success",
        data: { assignment },
    });
});

// Get all assignments
exports.getAllAssignments = catchAsync(async (req, res, next) => {
    const assignments = await Assignment.find().populate("subjectId");

    return res.status(200).json({
        status: "success",
        data: { assignments },
    });
});

// Get an assignment by ID
exports.getAssignmentById = catchAsync(async (req, res, next) => {
    const assignmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
        return next(new AppError("Invalid assignment ID.", 400));
    }

    const assignment = await Assignment.findById(assignmentId).populate("subjectId");

    if (!assignment) {
        return next(new AppError("Assignment not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { assignment },
    });
});

// Update an assignment
exports.updateAssignment = catchAsync(async (req, res, next) => {
    const assignmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
        return next(new AppError("Invalid assignment ID.", 400));
    }

    const assignment = await Assignment.findByIdAndUpdate(assignmentId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!assignment) {
        return next(new AppError("Assignment not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { assignment },
    });
});

// Delete an assignment
exports.deleteAssignment = catchAsync(async (req, res, next) => {
    const assignmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
        return next(new AppError("Invalid assignment ID.", 400));
    }

    const assignment = await Assignment.findByIdAndDelete(assignmentId);

    if (!assignment) {
        return next(new AppError("Assignment not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
