const mongoose = require("mongoose");
const Transport = require("../models/transportationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new transport record
exports.createTransport = catchAsync(async (req, res, next) => {
    const { busNumber, stops, driverName, students } = req.body;

    const transport = await Transport.create({ busNumber, stops, driverName, students });

    return res.status(201).json({
        status: "success",
        data: { transport },
    });
});

// Get all transport records
exports.getAllTransports = catchAsync(async (req, res, next) => {
    const transports = await Transport.find().populate("students");

    return res.status(200).json({
        status: "success",
        data: { transports },
    });
});

// Get a transport record by ID
exports.getTransportById = catchAsync(async (req, res, next) => {
    const transportId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(transportId)) {
        return next(new AppError("Invalid transport ID.", 400));
    }

    const transport = await Transport.findById(transportId).populate("students");

    if (!transport) {
        return next(new AppError("Transport not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { transport },
    });
});

// Update a transport record
exports.updateTransport = catchAsync(async (req, res, next) => {
    const transportId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(transportId)) {
        return next(new AppError("Invalid transport ID.", 400));
    }

    const transport = await Transport.findByIdAndUpdate(transportId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!transport) {
        return next(new AppError("Transport not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { transport },
    });
});

// Delete a transport record
exports.deleteTransport = catchAsync(async (req, res, next) => {
    const transportId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(transportId)) {
        return next(new AppError("Invalid transport ID.", 400));
    }

    const transport = await Transport.findByIdAndDelete(transportId);

    if (!transport) {
        return next(new AppError("Transport not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
