const TimeTable = require('../models/timeTableModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new timetable entry
exports.createTimeTable = catchAsync(async (req, res, next) => {
    const { classId, teacherId, date, startTime, endTime, room } = req.body;

    const newTimeTableEntry = await TimeTable.create({ classId, teacherId, date, startTime, endTime, room });

    res.status(201).json({
        status: 'success',
        data: {
            timeTable: newTimeTableEntry,
        },
    });
});

// Get all timetable entries
exports.getAllTimeTables = catchAsync(async (req, res, next) => {
    const timeTables = await TimeTable.find()
        .populate('classId')
        .populate('teacherId');

    res.status(200).json({
        status: 'success',
        data: {
            timeTables,
        },
    });
});

// Get a timetable entry by ID
exports.getTimeTableById = catchAsync(async (req, res, next) => {
    const timeTableId = req.params.id;

    const timeTable = await TimeTable.findById(timeTableId)
        .populate('classId')
        .populate('teacherId');
    if (!timeTable) {
        return next(new AppError('Timetable entry not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            timeTable,
        },
    });
});

// Update a timetable entry
exports.updateTimeTable = catchAsync(async (req, res, next) => {
    const timeTableId = req.params.id;

    const updatedTimeTable = await TimeTable.findByIdAndUpdate(timeTableId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedTimeTable) {
        return next(new AppError('Timetable entry not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            timeTable: updatedTimeTable,
        },
    });
});

// Delete a timetable entry
exports.deleteTimeTable = catchAsync(async (req, res, next) => {
    const timeTableId = req.params.id;

    const deletedTimeTable = await TimeTable.findByIdAndDelete(timeTableId);
    if (!deletedTimeTable) {
        return next(new AppError('Timetable entry not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
