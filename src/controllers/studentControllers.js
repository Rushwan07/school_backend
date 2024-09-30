const Student = require('../models/studendModel'); 
const AppError = require('../utils/appError'); 
const catchAsync = require('../utils/catchAsync'); 

// Create a new student
exports.createStudent = catchAsync(async (req, res, next) => {
    const student = await Student.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            student,
        },
    });
});

// Get all students
exports.getAllStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find();
    res.status(200).json({
        status: 'success',
        results: students.length,
        data: {
            students,
        },
    });
});

// Get a student by ID
exports.getStudentById = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            student,
        },
    });
});

// Update a student by ID
exports.updateStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            student,
        },
    });
});

// Delete a student by ID
exports.deleteStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        return next(new AppError('No student found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
