const mongoose = require("mongoose");
const Student = require("../models/studendModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new student
exports.createStudent = catchAsync(async (req, res, next) => {
    const { 
        regno, 
        name, 
        address, 
        sex, 
        parentId, 
        classId, 
        gradeId, 
        birthday, 
        img, 
        bloodType, 
        transportations 
    } = req.body;

    const student = await Student.create({ 
        regno, 
        name, 
        address, 
        sex, 
        parentId, 
        classId, 
        gradeId, 
        birthday, 
        img, 
        bloodType, 
        transportations 
    });

    return res.status(201).json({
        status: "success",
        data: { student },
    });
});

// Get all students
exports.getAllStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find().populate("parentId classId gradeId attendances results");

    return res.status(200).json({
        status: "success",
        data: { students },
    });
});

// Get a student by ID
exports.getStudentById = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return next(new AppError("Invalid student ID.", 400));
    }

    const student = await Student.findById(studentId).populate("parentId classId gradeId attendances results");

    if (!student) {
        return next(new AppError("Student not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { student },
    });
});

// Update a student
exports.updateStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return next(new AppError("Invalid student ID.", 400));
    }

    const student = await Student.findByIdAndUpdate(studentId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!student) {
        return next(new AppError("Student not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { student },
    });
});

// Delete a student
exports.deleteStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return next(new AppError("Invalid student ID.", 400));
    }

    const student = await Student.findByIdAndDelete(studentId);
    
    if (!student) {
        return next(new AppError("Student not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
