const mongoose = require("mongoose");
const Fees = require("../models/feeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Create a new fees record
exports.createFees = catchAsync(async (req, res, next) => {
    const { studentId, baseFees, transportationFees, totalFees, dueDate } = req.body;

    const fees = await Fees.create({ studentId, baseFees, transportationFees, totalFees, dueDate });

    return res.status(201).json({
        status: "success",
        data: { fees },
    });
});

// Get all fees records
exports.getAllFees = catchAsync(async (req, res, next) => {
    const fees = await Fees.find().populate("studentId");

    return res.status(200).json({
        status: "success",
        data: { fees },
    });
});

// Get a fees record by ID
exports.getFeesById = catchAsync(async (req, res, next) => {
    const feesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(feesId)) {
        return next(new AppError("Invalid fees ID.", 400));
    }

    const fees = await Fees.findById(feesId).populate("studentId");

    if (!fees) {
        return next(new AppError("Fees record not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { fees },
    });
});

// Update a fees record
exports.updateFees = catchAsync(async (req, res, next) => {
    const feesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(feesId)) {
        return next(new AppError("Invalid fees ID.", 400));
    }

    const fees = await Fees.findByIdAndUpdate(feesId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!fees) {
        return next(new AppError("Fees record not found.", 404));
    }

    return res.status(200).json({
        status: "success",
        data: { fees },
    });
});

// Delete a fees record
exports.deleteFees = catchAsync(async (req, res, next) => {
    const feesId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(feesId)) {
        return next(new AppError("Invalid fees ID.", 400));
    }

    const fees = await Fees.findByIdAndDelete(feesId);

    if (!fees) {
        return next(new AppError("Fees record not found.", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null,
    });
});
