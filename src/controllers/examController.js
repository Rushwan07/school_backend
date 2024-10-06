const mongoose = require("mongoose");
const Exam = require("../models/examModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new exam
exports.createExam = catchAsync(async (req, res, next) => {
    const { title, description, startTime, endTime, subjectId } = req.body;

    const exam = await Exam.create({ title, description, startTime, endTime, subjectId });

    return res.status(201).json({
        status: "success",
        data: { exam },
    });
});

// Get all exams
exports.getAllExams = catchAsync(async (req, res, next) => {
    const exams = await Exam.find().populate("subjectId results");

    return res.status(200).json({
        status: "success",
        data: { exams },
    });
});

// Get an exam by ID
exports.getExamById = catchAsync(async (req, res, next) => {
    const examId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
        return next(new AppError("Invalid exam ID.", 400));
    }

    const exam = await Exam.findById(examId).populate("subjectId results");

    if (!exam) {
        return next(new AppError("Exam not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { exam },
    });
});

// Update an exam
exports.updateExam = catchAsync(async (req, res, next) => {
    const examId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
        return next(new AppError("Invalid exam ID.", 400));
    }

    const exam = await Exam.findByIdAndUpdate(examId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!exam) {
        return next(new AppError("Exam not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { exam },
    });
});

// Delete an exam
exports.deleteExam = catchAsync(async (req, res, next) => {
    const examId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
        return next(new AppError("Invalid exam ID.", 400));
    }

    const exam = await Exam.findByIdAndDelete(examId);

    if (!exam) {
        return next(new AppError("Exam not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
