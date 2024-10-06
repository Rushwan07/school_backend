const mongoose = require("mongoose");
const Attendance = require("../models/attendanceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postAttendance = catchAsync(async (req, res, next) => {
    const { studentId, date, present, subjectId } = req.body;

    if (!studentId || !date || present === undefined || !subjectId) {
        return next(new AppError("Please provide valid data.", 400));
    }

    const attendance = await Attendance.create({ studentId, date, present, subjectId });
    return res.status(201).json({
        status: "success",
        data: { attendance },
    });
});

exports.getAttendance = catchAsync(async (req, res, next) => {
    const attendances = await Attendance.find().populate("studentId subjectId");
    return res.status(200).json({
        status: "success",
        data: { attendances },
    });
});

exports.getAttendanceById = catchAsync(async (req, res, next) => {
    const attendanceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
        return next(new AppError("Invalid attendance ID.", 400));
    }

    const attendance = await Attendance.findById(attendanceId).populate("studentId subjectId");
    if (!attendance) {
        return next(new AppError("Attendance not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { attendance },
    });
});

exports.updateAttendance = catchAsync(async (req, res, next) => {
    const attendanceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
        return next(new AppError("Invalid attendance ID.", 400));
    }

    const attendance = await Attendance.findByIdAndUpdate(attendanceId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!attendance) {
        return next(new AppError("Attendance not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { attendance },
    });
});

exports.deleteAttendance = catchAsync(async (req, res, next) => {
    const attendanceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
        return next(new AppError("Invalid attendance ID.", 400));
    }

    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!attendance) {
        return next(new AppError("Attendance not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
