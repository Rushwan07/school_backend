const Fee = require('../models/feeModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new fee
exports.createFee = catchAsync(async (req, res) => {
    const { childId, feeType, amount, paid, dueDate } = req.body;
    const newFee = new Fee({
        childId,
        feeType,
        amount,
        paid,
        dueDate
    });
    await newFee.save();
    res.status(201).json({
        status: 'success',
        data: {
            fee: newFee,
        },
    });
});

// Get all fees
exports.getAllFees = catchAsync(async (req, res) => {
    const fees = await Fee.find().populate('childId');
    res.status(200).json({
        status: 'success',
        results: fees.length,
        data: {
            fees,
        },
    });
});

// Get a single fee by ID
exports.getFeeById = catchAsync(async (req, res, next) => {
    const fee = await Fee.findById(req.params.id).populate('childId');
    if (!fee) {
        return next(new AppError('Fee not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            fee,
        },
    });
});

// Update a fee
exports.updateFee = catchAsync(async (req, res, next) => {
    const { childId, feeType, amount, paid, dueDate } = req.body;
    const updatedFee = await Fee.findByIdAndUpdate(
        req.params.id,
        { childId, feeType, amount, paid, dueDate },
        { new: true, runValidators: true }
    ).populate('childId');

    if (!updatedFee) {
        return next(new AppError('Fee not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            fee: updatedFee,
        },
    });
});

// Delete a fee
exports.deleteFee = catchAsync(async (req, res, next) => {
    const deletedFee = await Fee.findByIdAndDelete(req.params.id);
    if (!deletedFee) {
        return next(new AppError('Fee not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
