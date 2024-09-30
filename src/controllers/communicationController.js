const Communication = require('../models/communicationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new communication entry
exports.createCommunication = catchAsync(async (req, res) => {
    const { parentId, message, dateSent, status } = req.body;
    const newCommunication = new Communication({
        parentId,
        message,
        dateSent,
        status
    });
    await newCommunication.save();
    res.status(201).json({
        status: 'success',
        data: {
            communication: newCommunication,
        },
    });
});

// Get all communications
exports.getAllCommunications = catchAsync(async (req, res) => {
    const communications = await Communication.find().populate('parentId');
    res.status(200).json({
        status: 'success',
        results: communications.length,
        data: {
            communications,
        },
    });
});

// Get a single communication entry by ID
exports.getCommunicationById = catchAsync(async (req, res, next) => {
    const communication = await Communication.findById(req.params.id).populate('parentId');
    if (!communication) {
        return next(new AppError('Communication entry not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            communication,
        },
    });
});

// Update a communication entry
exports.updateCommunication = catchAsync(async (req, res, next) => {
    const { parentId, message, dateSent, status } = req.body;
    const updatedCommunication = await Communication.findByIdAndUpdate(
        req.params.id,
        { parentId, message, dateSent, status },
        { new: true, runValidators: true }
    ).populate('parentId');

    if (!updatedCommunication) {
        return next(new AppError('Communication entry not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            communication: updatedCommunication,
        },
    });
});

// Delete a communication entry
exports.deleteCommunication = catchAsync(async (req, res, next) => {
    const deletedCommunication = await Communication.findByIdAndDelete(req.params.id);
    if (!deletedCommunication) {
        return next(new AppError('Communication entry not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
