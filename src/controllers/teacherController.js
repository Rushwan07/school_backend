const mongoose = require("mongoose");
const Teacher = require("../models/teacherModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new teacher
exports.createTeacher = catchAsync(async (req, res, next) => {
    const { username, name, email, phone, address, img, bloodType, sex, subjects, classes, birthday } = req.body;

    const teacher = await Teacher.create({ username, name, email, phone, address, img, bloodType, sex, subjects, classes, birthday });

    return res.status(201).json({
        status: "success",
        data: { teacher },
    });
});

// Get all teachers
exports.getAllTeachers = catchAsync(async (req, res, next) => {
    const teachers = await Teacher.find().populate("subjects classes");

    return res.status(200).json({
        status: "success",
        data: { teachers },
    });
});

// Get a teacher by ID
exports.getTeacherById = catchAsync(async (req, res, next) => {
    const teacherId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return next(new AppError("Invalid teacher ID.", 400));
    }

    const teacher = await Teacher.findById(teacherId).populate("subjects classes");

    if (!teacher) {
        return next(new AppError("Teacher not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { teacher },
    });
});

// Update a teacher
exports.updateTeacher = catchAsync(async (req, res, next) => {
    const teacherId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return next(new AppError("Invalid teacher ID.", 400));
    }

    const teacher = await Teacher.findByIdAndUpdate(teacherId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!teacher) {
        return next(new AppError("Teacher not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { teacher },
    });
});

// Delete a teacher
exports.deleteTeacher = catchAsync(async (req, res, next) => {
    const teacherId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return next(new AppError("Invalid teacher ID.", 400));
    }

    const teacher = await Teacher.findByIdAndDelete(teacherId);

    if (!teacher) {
        return next(new AppError("Teacher not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
