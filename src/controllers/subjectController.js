const mongoose = require("mongoose");
const Subject = require("../models/subjectModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new subject
exports.createSubject = catchAsync(async (req, res, next) => {
    const { name, day, startTime, endTime, classId, teacherId, exams, lessons, assignments } = req.body;

    const subject = await Subject.create({ name, day, startTime, endTime, classId, teacherId, exams, lessons, assignments });

    return res.status(201).json({
        status: "success",
        data: { subject },
    });
});

// Get all subjects
exports.getAllSubjects = catchAsync(async (req, res, next) => {
    const subjects = await Subject.find().populate("classId teacherId exams assignments");
    
    return res.status(200).json({
        status: "success",
        data: { subjects },
    });
});

// Get a subject by ID
exports.getSubjectById = catchAsync(async (req, res, next) => {
    const subjectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return next(new AppError("Invalid subject ID.", 400));
    }

    const subject = await Subject.findById(subjectId).populate("classId teacherId exams assignments");
    
    if (!subject) {
        return next(new AppError("Subject not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { subject },
    });
});

// Update a subject
exports.updateSubject = catchAsync(async (req, res, next) => {
    const subjectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return next(new AppError("Invalid subject ID.", 400));
    }

    const subject = await Subject.findByIdAndUpdate(subjectId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!subject) {
        return next(new AppError("Subject not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { subject },
    });
});

// Delete a subject
exports.deleteSubject = catchAsync(async (req, res, next) => {
    const subjectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return next(new AppError("Invalid subject ID.", 400));
    }

    const subject = await Subject.findByIdAndDelete(subjectId);
    
    if (!subject) {
        return next(new AppError("Subject not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
