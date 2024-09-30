const Attendance = require("../models/attendanceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postAttendance = catchAsync(async (req, res, next) => {
    const { childId, date, status } = req.body;

    if (!childId) {
        return next(new AppError("Please provide valid child Id", 400));
    }

    if (!date) {
        return next(new AppError("Please select a valid Date", 400));
    }

    if (!status) {
        return next(new AppError("Please select a valid Date", 400));
    }

    const data = await Attendance.create({ childId, date, status });
    return res.status(201).json({
        status: "success",
        data: { attendance: data },
    });
});

exports.getAttendance = catchAsync(async (req, res, next) => {
    const attendances = await Attendance.find();
    if (!attendances) {
        return next(new AppError("There is no attendence for now", 400));
    }
    return res.status(201).json({
        status: "success",
        data: { attendance: attendances },
    });
});

exports.getAttendanceById = catchAsync(async (req, res, next) => {
    const attendanceId = req.params.id;
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
        return next(new AppError("There is no attendence f", 404));
    }

    return res.status(201).json({
        status: "success",
        data: { attendance: attendance },
    });
});
