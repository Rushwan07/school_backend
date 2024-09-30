const Transport = require('../models/transportationModel'); 
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new transport entry
exports.createTransport = catchAsync(async (req, res) => {
    const { childId, transportType, pickupLocation, dropoffLocation, emergencyContact } = req.body;
    const newTransport = new Transport({
        childId,
        transportType,
        pickupLocation,
        dropoffLocation,
        emergencyContact
    });
    await newTransport.save();
    res.status(201).json({
        status: 'success',
        data: {
            transport: newTransport,
        },
    });
});

// Get all transport entries
exports.getAllTransports = catchAsync(async (req, res) => {
    const transports = await Transport.find().populate('childId').populate('emergencyContact');
    res.status(200).json({
        status: 'success',
        results: transports.length,
        data: {
            transports,
        },
    });
});

// Get a single transport entry by ID
exports.getTransportById = catchAsync(async (req, res, next) => {
    const transport = await Transport.findById(req.params.id).populate('childId').populate('emergencyContact');
    if (!transport) {
        return next(new AppError('Transport entry not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            transport,
        },
    });
});

// Update a transport entry
exports.updateTransport = catchAsync(async (req, res, next) => {
    const { childId, transportType, pickupLocation, dropoffLocation, emergencyContact } = req.body;
    const updatedTransport = await Transport.findByIdAndUpdate(
        req.params.id,
        { childId, transportType, pickupLocation, dropoffLocation, emergencyContact },
        { new: true, runValidators: true }
    ).populate('childId').populate('emergencyContact');

    if (!updatedTransport) {
        return next(new AppError('Transport entry not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            transport: updatedTransport,
        },
    });
});

// Delete a transport entry
exports.deleteTransport = catchAsync(async (req, res, next) => {
    const deletedTransport = await Transport.findByIdAndDelete(req.params.id);
    if (!deletedTransport) {
        return next(new AppError('Transport entry not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
