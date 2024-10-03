const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new event
exports.createEvent = catchAsync(async (req, res, next) => {
    const { title, description, startTime, endTime, classId } = req.body;

    const event = await Event.create({ title, description, startTime, endTime, classId });

    return res.status(201).json({
        status: "success",
        data: { event },
    });
});

// Get all events
exports.getAllEvents = catchAsync(async (req, res, next) => {
    const events = await Event.find().populate("classId");

    return res.status(200).json({
        status: "success",
        data: { events },
    });
});

// Get an event by ID
exports.getEventById = catchAsync(async (req, res, next) => {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return next(new AppError("Invalid event ID.", 400));
    }

    const event = await Event.findById(eventId).populate("classId");

    if (!event) {
        return next(new AppError("Event not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { event },
    });
});

// Update an event
exports.updateEvent = catchAsync(async (req, res, next) => {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return next(new AppError("Invalid event ID.", 400));
    }

    const event = await Event.findByIdAndUpdate(eventId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!event) {
        return next(new AppError("Event not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { event },
    });
});

// Delete an event
exports.deleteEvent = catchAsync(async (req, res, next) => {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return next(new AppError("Invalid event ID.", 400));
    }

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
        return next(new AppError("Event not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
