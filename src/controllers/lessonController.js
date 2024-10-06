const mongoose = require("mongoose");
const Lesson = require("../models/lessonModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new lesson
exports.createLesson = catchAsync(async (req, res, next) => {
    const { title, description, subjectId, classId, date, duration, resources } = req.body;

    const lesson = await Lesson.create({ title, description, subjectId, classId, date, duration, resources });

    return res.status(201).json({
        status: "success",
        data: { lesson },
    });
});

// Get all lessons
exports.getAllLessons = catchAsync(async (req, res, next) => {
    const lessons = await Lesson.find().populate("subjectId classId");

    return res.status(200).json({
        status: "success",
        data: { lessons },
    });
});

// Get a lesson by ID
exports.getLessonById = catchAsync(async (req, res, next) => {
    const lessonId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
        return next(new AppError("Invalid lesson ID.", 400));
    }

    const lesson = await Lesson.findById(lessonId).populate("subjectId classId");

    if (!lesson) {
        return next(new AppError("Lesson not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { lesson },
    });
});

// Update a lesson
exports.updateLesson = catchAsync(async (req, res, next) => {
    const lessonId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
        return next(new AppError("Invalid lesson ID.", 400));
    }

    const lesson = await Lesson.findByIdAndUpdate(lessonId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!lesson) {
        return next(new AppError("Lesson not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { lesson },
    });
});

// Delete a lesson
exports.deleteLesson = catchAsync(async (req, res, next) => {
    const lessonId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
        return next(new AppError("Invalid lesson ID.", 400));
    }

    const lesson = await Lesson.findByIdAndDelete(lessonId);

    if (!lesson) {
        return next(new AppError("Lesson not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
