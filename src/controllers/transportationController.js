const Transportations = require('../models/transportationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new transportation entry
exports.createTransportation = catchAsync(async (req, res, next) => {
    const { busNumber, stops, students } = req.body;

    const newTransportation = await Transportations.create({ busNumber, stops, students });

    res.status(201).json({
        status: 'success',
        data: {
            transportation: newTransportation,
        },
    });
});

// Get all transportation entries
exports.getAllTransportations = catchAsync(async (req, res, next) => {
    const transportations = await Transportations.find().populate('students');

    res.status(200).json({
        status: 'success',
        data: {
            transportations,
        },
    });
});

// Get a transportation entry by ID
exports.getTransportationById = catchAsync(async (req, res, next) => {
    const transportationId = req.params.id;

    const transportation = await Transportations.findById(transportationId).populate('students');
    if (!transportation) {
        return next(new AppError('Transportation entry not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            transportation,
        },
    });
});

// Update a transportation entry
exports.updateTransportation = catchAsync(async (req, res, next) => {
    const transportationId = req.params.id;

    const updatedTransportation = await Transportations.findByIdAndUpdate(transportationId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedTransportation) {
        return next(new AppError('Transportation entry not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            transportation: updatedTransportation,
        },
    });
});

// Delete a transportation entry
exports.deleteTransportation = catchAsync(async (req, res, next) => {
    const transportationId = req.params.id;

    const deletedTransportation = await Transportations.findByIdAndDelete(transportationId);
    if (!deletedTransportation) {
        return next(new AppError('Transportation entry not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
